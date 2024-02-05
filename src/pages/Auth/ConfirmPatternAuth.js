import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import Layer from '../../component/Layer';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordGesture from '../../component/CustomePattern/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useAuthorize } from '../../context/AuthContext';

export default function ConfirmPatternAuth() {
  const route = useRoute();
  const navigation = useNavigation();
  const gesture = useRef(null);
  const { authorize } = useAuthorize();
  const [patternType, setPatternType] = useState('normal');
  const [patternPass, setPatternPass] = useState('');

  const typePassword = useCallback(async pass => {
    if (!pass) return;

    setPatternPass(pass);
  }, []);

  const checkPassword = useCallback(
    async (code, cb) => {
      const setupPassword = route?.params?.setupPass;
      if (setupPassword === code) {
        cb && cb(setupPassword);
      } else {
        setPatternType('wrong');
        setTimeout(() => {
          gesture.current?.resetActive();
          setPatternType('normal');
        }, 400);
      }
    },
    [route?.params?.setupPass],
  );

  const savePassword = useCallback(async setupPassword => {
    await AsyncStorage.setItem('AuthorizationMethod', 'pattern');
    await AsyncStorage.setItem('AuthorizationCode', setupPassword);

    authorize(true)
  }, []);

  return (
    <Layer>
      <View style={styles.container}>
        <View style={styles.content_second_pattern}>
          <PasswordGesture
            status={patternType}
            ref={gesture}
            value={'000'}
            onEnd={password => typePassword(password)}
            style={{
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
            }}
            normalColor={'rgba(255, 255, 255, 0.18)'}
            rightColor={'#ffffff'}
            innerCircle={true}
          />

          <View style={styles.content_second}>
            <AuthHeader text={'Pin Lock'} onPress={() => navigation.goBack()} style={{ width: '100%' }}/>

            <Text style={styles.title_center}>Confirm points pattern</Text>
          </View>
        </View>

        <View style={styles.bottom_container}>
          <TouchableOpacity onPress={() => checkPassword(patternPass, savePassword)}>
            <Text style={styles.bottom_text}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.bottom_text}>Cancel</Text>
          </TouchableOpacity>
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
    paddingBottom: 90,
  },
  content: {
    flexDirection: 'column',
    paddingHorizontal: 18,
  },
  content_second: {
    flexDirection: 'column',
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
});
