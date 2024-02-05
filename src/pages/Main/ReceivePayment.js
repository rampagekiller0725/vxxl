import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Platform, Share} from "react-native";
import Layer from "../../component/Layer";
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import { SCREEN_WIDTH } from "../../styles/mainStyles";
import QRIcon from '../../public/main/qr.svg'
import { MeContext } from "../../../App";
import Clipboard from "@react-native-clipboard/clipboard";
import QRCode from 'react-native-qrcode-svg';
import { getCurrentAddress } from "../../helper/helper";
import ModalCopy from "../../component/Modal/ModalCopy";


const ReceivePayment = ({navigation}) => {

  const {address, activeWallet} = useContext(MeContext)
  const [carrentAddress, setCarrentAddress] = useState('');
  const [copyModal, setCopyModal] = useState(false);

  const onShare = async () => {
    await Share.share({
      message:
        getCurrentAddress(activeWallet, address),
    });
  }

  const copy = () => {
    Clipboard.setString(getCurrentAddress(activeWallet, address))
    setCopyModal(true)
    setTimeout(() => {
      setCopyModal(false)
    }, 800)
  }

  useEffect(() => {
    setCarrentAddress(activeWallet === 'BTC' ? address?.btc
        : activeWallet === 'USDT' ? address?.usdt
            : activeWallet === 'BNB' ? address?.bnb
                : activeWallet === 'VXXL' && address?.vxxl)
  }, [address, activeWallet])

  return (
    <Layer>
      <ModalCopy open={copyModal}/>
      <AuthHeader text={'Receive payment'} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View>

          <Text style={styles.title}>Copy and Share code with VX Wallet users</Text>

          <View style={styles.main_box}>

            <QRCode
                value={getCurrentAddress(activeWallet, address)}
                size={147}
            />

            <Text style={styles.name_coin}>{activeWallet}</Text>

            <Text style={styles.wallet}>{carrentAddress}</Text>

          </View>

        </View>

        <View style={styles.bottom_button}>
          <TouchableOpacity onPress={() => copy()}>
            <View style={styles.btn}>
              <Text style={styles.btn_text}>Copy</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onShare()}>
            <View style={styles.btn}>
              <Text style={styles.btn_text}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 17
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 27
  },
  main_box: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH - 34,
    paddingVertical: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  name_coin: {
    color: '#007AFF',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 17,
    marginBottom: 3
  },
  bottom_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btn: {
    height: 50,
    width: (SCREEN_WIDTH - 44) / 2,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_text: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '700'
  },
  wallet: {
    fontSize: 12,
    color: '#000'
  }
});

export default ReceivePayment;
