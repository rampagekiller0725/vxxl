import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Layer from '../../component/Layer';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import PinKeyboard from '../../component/PinKeyboard';
import {MeContext} from '../../../App';
import { useAuthorize } from '../../context/AuthContext';

export default function LoginPin() {
  const route = useRoute();
  const navigation = useNavigation();
  const {getBalance} = useContext(MeContext);
  const { authorize } = useAuthorize();

  const [pin, setPin] = useState('');

  const isSetup = useMemo(() => {
    return route.params?.setup || false;
  }, [route.params?.setup]);

  const typePin = useCallback(async (newPin) => {
    setPin(newPin);

    if (!isSetup && newPin.length >= 4) {
      checkPin(newPin, () => {
        authorize(true)
      });
    }
  }, [isSetup]);

  const checkPin = useCallback(async (newPin, cb) => {
    const savedPin = await AsyncStorage.getItem('AuthorizationCode');
    if (savedPin === newPin) {
      cb && cb();
    } else {
      setTimeout(() => {
        setPin('')
        alert('PIN do not match')
      }, 300);
    }
  }, []);

  const confirmPin = useCallback((pass) => {
    navigation.navigate('ConfirmPinAuth', {
      setupPass: pass
    })
  }, []);

  useEffect(() => {
    getBalance()
  }, [])

  const navigate = useCallback((name) => {
    navigation.reset({
      index: 0,
      routes: [{name, params: { setup: true }}],
    });
  }, [navigation])  

  // Header props
  const headerProps = {
    text: 'Pin Lock',
    onPress: isSetup ? () => navigate("AuthorizationMethod") : undefined,
  };

  return (
    <Layer>
      <AuthHeader {...headerProps} />
      <View style={styles.container}>

				<View style={styles.content_second}>
					
					<Text style={styles.title_center}>Enter 4 Digit PIN</Text>
				
					<View style={styles.pin_circle_container}>
						<View style={pin.length > 0 ? styles.pin_circle_active : styles.pin_circle} />
						<View style={pin.length > 1 ? styles.pin_circle_active : styles.pin_circle} />
						<View style={pin.length > 2 ? styles.pin_circle_active : styles.pin_circle} />
						<View style={pin.length > 3 ? styles.pin_circle_active : styles.pin_circle} />
					</View>

					<PinKeyboard value={pin} onChange={typePin} />
				</View>

        {isSetup && (
          <View style={styles.bottom_container}>
            {pin.length < 4
              ? <View />
              : (
              <TouchableOpacity onPress={() => confirmPin(pin)}>
                <Text style={styles.bottom_text}>Save</Text>
              </TouchableOpacity>
              )
            }

            <TouchableOpacity onPress={() => setPin('')}>
              <Text style={styles.bottom_text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: 90,
  },
  content: {
    flexDirection: 'column',
    paddingHorizontal: 18,
  },
  content_second: {
    flexDirection: 'column',
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  content_second_pattern: {
    flexDirection: 'column',
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
    marginLeft: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom_text: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  keyboard_container: {
    width: 280,
    marginTop: 36,
    flexDirection: 'column'
  },
	keyboard_line: {
    width: 280,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
	pin_circle_container: {
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14
  },
  pin_circle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff'
  },
  pin_circle_active: {
    width: 12,
    height: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff'
  },
});
