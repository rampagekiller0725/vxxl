import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import Finger from '../../public/Auth/fingerprint.svg';
import Layer from '../../component/Layer';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useContext } from 'react';
import {MeContext} from '../../../App';
import { useAuthorize } from '../../context/AuthContext';

const optionalConfigObject = {
  title: 'Authentication Required',
  imageColor: '#e00606',
  imageErrorColor: '#ff0000',
  sensorDescription: 'Touch sensor',
  sensorErrorDescription: 'Failed',
  cancelText: 'Cancel',
  fallbackLabel: 'Show Passcode',
  unifiedErrors: false,
  passcodeFallback: false,
};

export default function LoginFingerPrint() {
  const route = useRoute();
  const navigation = useNavigation();
  const {getBalance} = useContext(MeContext);
  const { authorize } = useAuthorize()

  const isSetup = useMemo(() => {
    return route?.params?.setup || false;
  }, [route?.params?.setup]);

  const authenticate = useCallback(async () => {
    try {
      const result = await TouchID.authenticate('', optionalConfigObject);
      if (!result) return;

      if (isSetup) {
        await AsyncStorage.setItem('AuthorizationMethod', 'fingerprint');
      }

      authorize(true)
    } catch (e) {}
  }, [isSetup]);

  useEffect(() => {
    authenticate();
    getBalance()
  }, []);

  // Header props
  const headerProps = {
    text: 'Fingerprint',
    onPress: isSetup ? () => navigation.goBack() : undefined,
  };

  return (
    <Layer>
      <AuthHeader {...headerProps} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Place your finger</Text>
          <Text style={styles.text}>
            Lift and rest your finger on the home screen, wait for vibration.
          </Text>
        </View>

        <View style={styles.fingerprint_container}>
          <TouchableOpacity onPress={authenticate}>
            <View style={styles.fingerprint_box}>
              <Finger />
              <Text style={styles.fingerprint_text}>Fingerprint</Text>
            </View>
          </TouchableOpacity>
        </View>

        {isSetup ? (
          <View style={styles.bottom_container}>
            <TouchableOpacity onPress={authenticate}>
              <Text style={styles.bottom_text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.bottom_text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </View>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 90,
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
  title_center: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 26,
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    color: '#fff',
    marginTop: 17,
    marginBottom: 23,
  },
  bottom_container: {
    width: SCREEN_WIDTH - 120,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom_text: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  fingerprint_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerprint_box: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 6,
  },
  fingerprint_text: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '700',
    marginTop: 5,
  },
});
