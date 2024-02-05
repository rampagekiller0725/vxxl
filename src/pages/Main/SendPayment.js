import React, {useCallback, useContext, useMemo, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/mainStyles';
import {TextInput} from 'react-native-gesture-handler';
import Button from '../../component/Button/Button';
import QRSend from '../../public/main/qr_code_send.svg';
import {MeContext} from '../../../App';
import {usdtAbi} from '../../helper/abi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ethers} from 'ethers';
import {getCurrentBalance, getTotalBalanceUsdt} from '../../helper/helper';
import ModalLoading from '../../component/Modal/ModalLoading';
import axios from 'axios';
import ModalPayment from '../../component/ModalPayment';
import createTransaction from '../../helper/createTransaction';
import bitcore from 'bitcore-lib';
import Layer from '../../component/Layer';
import KeyboardAvoidView from '../../component/KeyboardAvoidView';

const SendPayment = ({navigation}) => {
  const {activeWallet, data, address, getBalance, tokenPrice} =
    useContext(MeContext);
  const [coin, setCoin] = useState(0);
  const [addressTo, setAddressTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentModal, setSentModal] = useState(false);
  const [tx, setTransaction] = useState();

  const fromAddress = useMemo(() => {
    return address[activeWallet.toLowerCase()];
  }, [address, activeWallet]);

  const openSendModal = useCallback(async () => {
    setLoading(true);
    console.log({
      currency: activeWallet,
      amount: coin,
      from: fromAddress,
      to: addressTo,
    });

    try {
      if (activeWallet === 'VXXL' || activeWallet === 'BTC') {
        const transaction = await createTransaction({
          currency: activeWallet,
          amount: coin,
          from: fromAddress,
          to: addressTo,
        });
        setTransaction(transaction);
      }

      setSentModal(true);
    } catch (e) {
      if (e?.response?.data?.error === 'Non-base58 character') {
        alert('Invalid address');
      } else if (e?.response?.data?.error) {
        alert(e.response.data.error);
      }
      console.log('createTransaction Error', {
        response: e?.response,
      });
    } finally {
      setLoading(false);
    }
  }, [activeWallet, coin, fromAddress, addressTo]);

  const onCancel = useCallback(() => {
    setSentModal(false);
    setTransaction(undefined);
  }, []);

  const sendTransaction = useCallback(async () => {
    try {
      setLoading(true);
      setSentModal(false);

      const mnemonic = await AsyncStorage.getItem('mnemonic');
      const privateKey = await AsyncStorage.getItem('privateKeyBTC');
      const pk1 = bitcore.PrivateKey.fromWIF(privateKey);

      if (activeWallet === 'BNB') {
        if (0.002 + Number(coin) > Number(data?.bnb)) {
          setLoading(false);
          return alert(
            "You don't have enough fees to pay, replenish BNB or reduce the transfer amount",
          );
        }

        const provider = new ethers.providers.StaticJsonRpcProvider(
          'https://bsc-dataseed.binance.org/',
        );
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
        const walletSigner = wallet.connect(provider);
        const gasPrice = await provider.getGasPrice();

        const transaction = await walletSigner.sendTransaction({
          from: wallet.address,
          to: addressTo,
          value: ethers.utils.parseEther(coin),
          nonce: provider.getTransactionCount(wallet.address, 'latest'),
          gasLimit: ethers.utils.hexlify(100000),
          gasPrice,
        });

        if (!transaction?.hash) return;
        navigation.navigate('Wallet');
      }

      if (activeWallet === 'USDT') {
        if (0.002 + Number(coin) > Number(data?.usdt)) {
          setLoading(false);
          return alert('Replenish USDT');
        }

        const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
        const walletSigner = wallet.connect(provider);
        const contract = new ethers.Contract(
          '0x55d398326f99059fF775485246999027B3197955',
          usdtAbi,
          walletSigner,
        );

        await contract.transfer(addressTo, ethers.utils.parseEther(coin));
        navigation.navigate('Wallet');
      }

      if (activeWallet === 'VXXL') {
        console.log({ pk1 })
        tx.sign(pk1);

        const serialize = tx.serialize();
        console.log(tx, serialize);
        const res = await axios.get(`https://explorer.vxxl.org/api/sendrawtransaction?hex=${serialize}`);

        if (['bad-txns-inputs-missingorspent', 'txn-mempool-conflict'].includes(res.data.message)) {
          throw 'Your last transaction is still pending, please try again later.';
        } else if (!!res.data.message) {
          console.log('failed', res.data)
          throw res.data.message
        }

        if (!res.data.code) {
          console.log('success', res.data);
          navigation.navigate('Wallet');
        }
      }

      if (activeWallet === 'BTC') {
        tx.sign(pk1);
        const serialize = tx.serialize();

        const res = await axios.post('https://blockchain.info/pushtx?cors=true', `tx=${serialize}`);
        if (res.data === 'Transaction Submitted') navigation.navigate('Wallet');
      }

      setLoading(false);
      getBalance();
    } catch (e) {
      setLoading(false);

      if (e.message?.startsWith('network does not support')) {
        alert('Invalid address');
      } else {
        alert(e?.message || e);
      }

      console.log("e", e)
      console.log(1, e.message);
      console.log(2, e.response);
      console.log(3, e.response?.data);
    }
  }, [activeWallet, tx, addressTo, address, coin, data]);

  const setCoinCount = e => {
    setCoin(e);
  };

  const readQr = e => {
    if (e.data?.split(':')?.length > 1) {
      setAddressTo(e.data?.split(':')[1]);
    } else if (e.data?.split(':')?.length === 1) {
      setAddressTo(e.data);
    }

    navigation.navigate('SendPayment');
  };

  const network = useMemo(() => {
    if (['USDT', 'BNB'].includes(activeWallet)) return 'BSC';
    else return activeWallet;
  }, [activeWallet]);

  return (
    <Layer>
       <KeyboardAvoidView>
        <AuthHeader text={'Send payment'} onPress={() => navigation.goBack()} style={{marginBottom: 20}} />
        <View style={styles.container}>

          <View>
            <View style={styles.price_box}>
              <Text style={styles.total_balance}>Total Balance</Text>
              <Text style={styles.balance}>
                {getTotalBalanceUsdt(data, tokenPrice)} USD
              </Text>
            </View>

            <View style={styles.price_box}>
              <Text style={styles.total_balance}>{activeWallet} Balance</Text>
              <Text style={styles.balance}>
                {getCurrentBalance(activeWallet, data)} {activeWallet}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.input_box}>
              <View style={{flex: 1}}>
                <TextInput
                  placeholder={'Send to'}
                  placeholderTextColor={'#FFFFFF'}
                  style={styles.input}
                  value={addressTo}
                  onChangeText={setAddressTo}
                />
              </View>

              <View style={styles.input_qr}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ScanQR', {onRead: readQr})
                  }>
                  <QRSend />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.input_network}>
              <Text style={styles.network}>Network: {network}</Text>
            </View>

            <View style={styles.input_box}>
              <TextInput
                placeholder={'Coin Amount'}
                placeholderTextColor={'#FFFFFF'}
                style={[styles.input, {flex: 1}]}
                keyboardType="decimal-pad"
                value={`${coin}`}
                onChangeText={e => setCoinCount(e)}
              />
            </View>

            <Button
              text={'Send'}
              full={true}
              style={{marginTop: 21}}
              onPress={() => openSendModal()}
            />
          </View>
       
        </View>
       </KeyboardAvoidView>

      <ModalLoading open={loading} />
      <ModalPayment
        open={sentModal}
        address={addressTo}
        amount={coin}
        fee={!tx ? 0.002 : tx.getFee() / 100000000}
        setOpen={setSentModal}
        onSent={sendTransaction}
        onCancel={onCancel}
      />
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 17,
  },
  bg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  price_box: {
    height: 80,
    width: SCREEN_WIDTH - 34,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 10,
  },
  total_balance: {
    color: '#999999',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },
  balance: {
    color: '#007AFF',
    fontSize: 22,
    fontWeight: '700',
  },
  input_box: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 6,
    width: SCREEN_WIDTH - 34,
    height: 42,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 42,
    paddingLeft: 12,
    color: '#fff',
    fontSize: 13,
  },
  input_network: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    height: 42,
    width: SCREEN_WIDTH - 34,
    borderRadius: 6,
    paddingLeft: 12,
    marginBottom: 12,
    justifyContent: 'center',
  },
  network: {
    color: '#fff',
    fontSize: 13,
  },
  input_qr: {
    width: 34,
    marginRight: 4,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SendPayment;
