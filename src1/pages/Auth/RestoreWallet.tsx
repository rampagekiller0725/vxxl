import React, {useCallback, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  Platform,
} from 'react-native';
import Layer from '../../component/Layer';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import Button from '../../component/Button/Button';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ethers} from 'ethers';
import {MeContext} from '../../../App';
import ModalLoading from '../../component/Modal/ModalLoading';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import KeyboardAvoidView from '../../component/KeyboardAvoidView';

const RestoreWallet = () => {
  const {getAddressBitcoinAndVXXL, setAddress, clear}: any = useContext(MeContext);
  const navigation = useNavigation()

  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  const onRestore = useCallback(() => {
    if (!key) return;
    setLoading(true)

    setTimeout(async () => {
      try {
        const wallet = ethers.Wallet.fromMnemonic(key, `m/44'/60'/0'/0/0`);
  
        if (wallet.address) {
          await AsyncStorage.setItem('mnemonic', key);
          await AsyncStorage.setItem('addressBNB', wallet.address);
          setAddress((prev: any) => ({ ...prev, usdt: wallet.address, bnb: wallet.address }));
  
          await getAddressBitcoinAndVXXL(key);
        }
  
      } catch(e) {
        // alert("Invalid recovery key")
      } finally {
        setLoading(false)
      }
    }, 100)
  }, [setLoading, key])

  useEffect(() => {
    clear()
  }, [])
  
  return (
    <Layer>
      <AuthHeader text={'Restore wallet'} onPress={() => navigation.goBack()} />
      
      <KeyboardAvoidView>
        <View style={styles.container}>

          <View style={styles.content}>
            

            <Text style={styles.title}>VX Wallet</Text>
            <Text style={styles.text}>
              Enter your personal recovery key or scan key to restore your wallet{' '}
            </Text>
            <View style={{ alignItems: 'center', marginTop: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Enter your recovery key"
                placeholderTextColor={'#fff'}
                value={key}
                onChangeText={setKey}
              />
            </View>
          </View>

          <View style={styles.bottom_container}>
            <Button text={'Next'} full={true} onPress={onRestore} disable={!key} />
          </View>

        </View>
      </KeyboardAvoidView>

      <ModalLoading open={loading} />
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: Platform.OS === 'ios' ? 42 : 32,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 26,
  },
  text: {
    fontSize: 17,
    color: '#fff',
    marginTop: 17,
    marginBottom: 23,
  },
  bottom_container: {
    width: SCREEN_WIDTH - 36,
    marginTop: 30,
    marginLeft: 18,
  },
  input: {
    width: SCREEN_WIDTH - 36,
    height: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 8,
    marginTop: 24,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: '#fff',
    zIndex: 1000,
  },
});

export default RestoreWallet;
