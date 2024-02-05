import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import Layer from '../../component/Layer';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import Button from '../../component/Button/Button';
import TouchID from 'react-native-touch-id';
import {MeContext} from '../../../App';
import { useNavigation } from '@react-navigation/native';

export default function AuthorizationMethod() {
  const {getBalance}: any = useContext(MeContext);
  const [methods, setMethods] = useState({finger: false, face: false});
  const navigation = useNavigation();

  const optionalConfigObjectIsSupported = {
    unifiedErrors: false,
    passcodeFallback: false,
  };

  const checkMethodSupport = useCallback(async () => {
    try {
      const biometryType = await TouchID.isSupported(optionalConfigObjectIsSupported);

      if (biometryType === 'FaceID') {} 
      else {
        setMethods(prev => ({...prev, finger: true}));
      }
    } catch (e) {
      console.log('error', e);
    }
  }, [setMethods]);

  useEffect(() => {
    checkMethodSupport();
    getBalance();
  }, []);

  const navigate = useCallback((name: any) => {
    navigation.reset({
      index: 0,
      routes: [{name, params: { setup: true }}] as never,
    });
  }, [navigation])  

  return (
    <Layer>
      <AuthHeader text={'Authorization Method'} />
      <View style={styles.container}>
        <View style={styles.content}>

          <Text style={styles.title}>Select authorization method to protect your wallet</Text>
          <Text style={styles.text}>You can change method in future in wallet settings.</Text>
        </View>

        <View style={styles.bottom_container}>
          <Button 
            text={'Pin Lock'} 
            full={true} 
            // onPress={() => navigate('LoginPin', { setup: true })}
            onPress={() => navigate('LoginPin')}
          />
          <Button
            text={'Pattern Lock'}
            style={{marginTop: 12}}
            full={true}
            // onPress={() => navigate('LoginPattern', { setup: true })}
            onPress={() => navigate('LoginPattern')}
          />
          {methods?.finger && (
            <Button
              text={'Fingerprint'}
              style={{marginTop: 12}}
              full={true}
              // onPress={() => navigate('LoginFingerPrint', { setup: true })}
              onPress={() => navigate('LoginFingerPrint')}
            />
          )}
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
    paddingBottom: Platform.OS === 'ios' ? 42 : 32,
  },
  content: {
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
});
