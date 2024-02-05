import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import Layer from '../../component/Layer';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import Button from '../../component/Button/Button';
import TouchID from 'react-native-touch-id';
import { useCallback } from 'react';

export default function AuthorizationMethodSettings({navigation}: any) {
  const [methods, setMethods] = useState({finger: false, face: false});

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
  }, []);

  return (
    <Layer>
      <AuthHeader text={'Authorization Method'} onPress={() => navigation.goBack()}/>
      <View style={styles.container}>
        <View style={styles.content}>

          <Text style={styles.title}>
            Select authorization method to protect your wallet
          </Text>
        </View>

        <View style={styles.bottom_container}>
          <Button 
            text={'Pin Lock'} 
            full={true} 
            onPress={() => navigation.navigate('MethodPin', { setup: true })} 
          />
          <Button 
            text={'Pattern Lock'} 
            style={{marginTop: 12}} 
            full={true} 
            onPress={() => navigation.navigate('MethodPattern', { setup: true })}
          />
          {methods?.finger && (
            <Button
              text={'Fingerprint'}
              style={{marginTop: 12}}
              full={true}
              onPress={() => navigation.navigate('MethodFingerPrint', { setup: true })}
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
