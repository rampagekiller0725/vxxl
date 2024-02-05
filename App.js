import "./shim";


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, createContext } from "react";
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
// import 'react-native-gesture-handler';
import { ethers } from "ethers";
import { usdtAbi } from "./src/helper/abi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./src/hooks/instance";
import axios from "axios";
import {WalletConnectProvider} from "./src/component/WalletConnectProvider";
import { useCallback } from "react";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
// import * as Sentry from "@sentry/react-native";


// Sentry.init({
//   dsn: "https://d7404dda9a1a4fb6add12af1dbf1a8f0@o4504124785360896.ingest.sentry.io/4504137458909184",
//   tracesSampleRate: 1.0,
//   environment: "SET ENV HERE",
// });

// Sentry.nativeCrash();

export const MeContext = createContext()

const App = () => {

  const [activeWallet, setActiveWallet] = useState('VXXL');
  const [data, setData] = useState({btc: '0.0', vxxl: '0.0', usdt: '0.0', bnb: '0.0'});
  const [address, setAddress] = useState({btc: '', vxxl: '', usdt: '', bnb: ''});
  const [tokenPrice, setTokenPrice] = useState({btc: 0, vxxl: 0, bnb: 0});
  const [connectWallet, setConnectWallet] = useState([]);

  async function getBalance() {
    try {
      const providerBnb = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      providerBnb.getBalance(address?.bnb).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance)
        setData(prev => ({...prev, bnb: balanceInEth}))
      })

      let tokenInst = new ethers.Contract('0x55d398326f99059fF775485246999027B3197955', usdtAbi, providerBnb)
      const cfibalance = await tokenInst.balanceOf(address?.usdt)
      setData(prev => ({...prev, usdt: ethers.utils.formatEther(cfibalance)}))

      const res = await instance.post('/getBalanceBtc', {BTCaddres: address?.btc})
      if(res?.data?.count) setData(prev => ({...prev, btc: res?.data?.count}))

      const response = await axios.get(`https://explorer.vxxl.org/ext/getbalance/${address?.vxxl}`)
      if(!response.data?.error) setData(prev => ({...prev, vxxl: response?.data}))
    }catch(e){
      console.log(1)
      console.log(e)
    }
  }

  const getAddress = async() => {
    try {
      const address = await AsyncStorage.getItem('addressBNB')
      const addressBTC = await AsyncStorage.getItem('addressBTC')
      const addressVXXL = await AsyncStorage.getItem('addressVXXL')
      setAddress(prev => ({...prev, usdt: address, bnb: address, btc: addressBTC, vxxl: addressVXXL}))
    }catch(e){

    }
  }

  const getAllPrice = async() =>{
        try {
            const { data } = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=wbnb,bitcoin&vs_currencies=usd`,
            );
            const res = await axios.get('https://explorer.vxxl.org/ext/summary')

            setTokenPrice(prev => ({...prev, btc: data?.bitcoin?.usd, bnb: data?.wbnb?.usd, vxxl: res?.data?.data[0]?.lastPrice}))
        }catch (e) {
            console.log(e.response)
        }
  }


  const getAddressBitcoinAndVXXL = async (key) => {

      var Mnemonic = require('bitcore-mnemonic');
      const bitcore = require('bitcore-lib');

      const mainnet = bitcore.Networks.add({
        name: 'mainnet',
        alias: 'main',
        pubkeyhash: 70,
        privatekey: 5,
        scripthash: 48,
        bech32prefix: 'tb',
        xpubkey: 0x043587cf,
        xprivkey: 0x04358394,
        networkMagic: 0xa77ca9d0,
      });

      var code2 = new Mnemonic(key)
      var xpriv = code2.toHDPrivateKey();
      var address = xpriv.privateKey.toAddress();

      await AsyncStorage.setItem('addressBTC', address.toString())
      await AsyncStorage.setItem('addressVXXL', xpriv.privateKey.toAddress(mainnet).toString())
      const res = await instance.post('/createUser', {BTCaddres: address.toString()})

      if(res?.data?.id) await AsyncStorage.setItem('userID', res?.data?.id)
      setAddress(prev => ({...prev, btc: address.toString(), vxxl: xpriv.privateKey.toAddress(mainnet).toString()}))
      await AsyncStorage.setItem('privateKeyBTC', xpriv.privateKey.toWIF())

  }

  useEffect(() => {
    getAddress()
    getAllPrice()
  }, [])

  useEffect(() => {
    if(address?.usdt) getBalance()
  }, [address])

  const clear = useCallback(async () => {
    await AsyncStorage.removeItem('addressBTC')
    await AsyncStorage.removeItem('addressVXXL')
    await AsyncStorage.removeItem('privateKeyBTC')
    await AsyncStorage.removeItem('addressBNB')
    await AsyncStorage.removeItem('AuthorizationMethod')
    await AsyncStorage.removeItem('AuthorizationCode')
    await AsyncStorage.removeItem('userID')
    setActiveWallet('VXXL')
    setData({btc: '0.0', vxxl: '0.0', usdt: '0.0', bnb: '0.0'})
    setAddress({btc: '', vxxl: '', usdt: '', bnb: ''})
  }, [])

  return (
    <MeContext.Provider value={{clear, setConnectWallet, activeWallet, setActiveWallet, data, setData, address, setAddress, getAddress, getBalance, getAddressBitcoinAndVXXL, tokenPrice}}>
        <WalletConnectProvider>
            <NavigationContainer>
              <AuthProvider>
                <Navigation />
              </AuthProvider>
            </NavigationContainer>
        </WalletConnectProvider>
    </MeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default Sentry.wrap(App);

export default App;
