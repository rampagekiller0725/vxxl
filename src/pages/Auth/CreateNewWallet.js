import React, { useContext, useEffect, useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Platform, Linking} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Layer from "../../component/Layer";
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import { SCREEN_WIDTH } from "../../styles/mainStyles";
import ContentCopy from "../../public/Auth/content_copy.svg"
import CheckBox from '@react-native-community/checkbox';
import Button from "../../component/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ethers } from 'ethers';
import { entropyToMnemonic } from "@ethersproject/hdnode";
import { MeContext } from "../../../App";
import ModalLoading from "../../component/Modal/ModalLoading";
import ModalCopy from "../../component/Modal/ModalCopy";
import { useNavigation } from "@react-navigation/native";


const CreateNewWallet = () => {
  const {getAddressBitcoinAndVXXL, clear} = useContext(MeContext)
  const navigation = useNavigation()

  const [key, setKey] = useState("");
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copyModal, setCopyModal] = useState(false);

  crypto = {
    getRandomValues: function (buffer) {
      for (let round = 0; round < 20; round++) {
        for (let i = 0; i < buffer.length; i++) {
          if (round) {
            buffer[i] ^= Math.trunc(256 * Math.random());
          }
          else {
            buffer[i] = Math.trunc(256 * Math.random());
          }
        }
      }
      return buffer;
    },
    _weakCrypto: true
  };

  async function randomBytes(length) {
    if (length <= 0 || length > 1024 || parseInt(String(length)) != length) {
      throw new Error('invalid length');
    }
    let result = new Uint8Array(length);
    crypto.getRandomValues(result);
    const res = entropyToMnemonic(result)
    setKey(res)
  }

  const nextStep = async() => {
    setLoading(true)

    setTimeout(async() => {
      try {
        const wallet = ethers.Wallet.fromMnemonic(key, `m/44'/60'/0'/0/0`);
        
        if (wallet.address) {
          await AsyncStorage.setItem('mnemonic', key)
          await AsyncStorage.setItem('addressBNB', wallet.address)
          await getAddressBitcoinAndVXXL(key)
        }
      } finally {
        setLoading(false)
      }
    }, 200)
  }

  const copy = () => {
    Clipboard.setString(key)
    setCopyModal(true)
    setTimeout(() => {
      setCopyModal(false)
    }, 800)
  }

  useEffect(() => {
    clear()
    randomBytes(16)
  }, [])

  return (
    <Layer>
      <ModalCopy open={copyModal}/>
      <ModalLoading open={loading}/>

      <AuthHeader text={'Create new wallet'} onPress={() => navigation.goBack()}/>
      <View style={styles.container}>
       <View style={styles.content}>
         
          <Text style={styles.title}>Backup your wallet</Text>
          <Text style={styles.text}>This is your recovery key, copy and save these words in a safe place. Do not share this key with anyone, once you lose it your wallet cannot be restored.</Text>

          <FlatList
            data={key?.split(' ')}
            keyExtractor={item => item}
            numColumns={3}
            horizontal={false}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({ item }) => {
              return <View style={styles.key_box}>
                <Text style={styles.key_text}>{item}</Text>
              </View>;
            }}
          />

          <View style={styles.copy_download_container}>
            <TouchableOpacity onPress={() => copy()}><View style={styles.copy_container}>
              <ContentCopy />
            </View></TouchableOpacity>

            {/*<View style={styles.download_container}>
              <Text style={styles.download_text}>Download raw keys</Text>
            </View>*/}
          </View>

         <View style={styles.check_box_container}>
           <CheckBox
             disabled={false}
             value={toggleCheckBox1}
             onValueChange={(newValue) => {
               setToggleCheckBox1(newValue);
             }}
             tintColors={{ true: "#F6F6F6", false: "#F6F6F6" }}
           />


           <Text style={styles.check_box_text}>I have safely stored my recovery key</Text>

         </View>

         <View style={styles.check_box_container}>
           <CheckBox
             disabled={false}
             value={toggleCheckBox2}
             onValueChange={(newValue) => {
               setToggleCheckBox2(newValue);
             }}
             tintColors={{ true: "#F6F6F6", false: "#F6F6F6" }}
           />


           <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.check_box_text}>By creating a new wallet you accept the</Text>

            <View style={{ flexDirection: 'row', marginLeft: 5 }}>
              <TouchableOpacity activeOpacity={0.75} style={{  }} onPress={ ()=>{ Linking.openURL('https://vxxl.org/terms-of-use')}}>
                <Text style={styles.underline_link}>Terms and Conditions</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 6, color: '#fff' }}>&</Text>
              <TouchableOpacity activeOpacity={0.75} style={{  }} onPress={ ()=>{ Linking.openURL('https://vxxl.org/privacy-policy')}}>
                <Text style={styles.underline_link}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>

         </View>
       </View>

       <View style={styles.bottom_container}>
         <Button text={'Create Wallet'} disable={(!toggleCheckBox1 || !toggleCheckBox2)} full={true} onPress={() => nextStep()}/>
       </View>

      </View>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: Platform.OS === 'ios' ? 42 :32
  },
  content: {
    flexDirection: 'column',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 26
  },
  text: {
    fontSize: 17,
    color: '#fff',
    marginTop: 17,
    marginBottom: 23
  },
  key_box: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    height: 32,
    width: (SCREEN_WIDTH - 52) / 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  key_text: {
    fontSize: 14,
    color: '#fff'
  },
  copy_download_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24
  },
  copy_container: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  download_container: {
    height: 31,
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1
  },
  download_text: {
    fontSize: 14,
    color: '#fff'
  },
  check_box_container: {
    flexDirection: 'row',
    marginBottom: 8
  },
  check_box_text: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    marginLeft: 5,
    width: SCREEN_WIDTH - 80,
  },
  underline_link: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  bottom_container: {
    width: SCREEN_WIDTH - 36,
    marginTop: 30,
    marginLeft: 18
  }
});

export default CreateNewWallet;
