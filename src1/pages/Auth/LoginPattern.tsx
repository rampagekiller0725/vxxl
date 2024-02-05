import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Layer from '../../component/Layer';
import PasswordGesture from '../../component/CustomePattern/index';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useRef } from 'react';
import {MeContext} from '../../../App';
import { useAuthorize } from '../../context/AuthContext';

export default function LoginPattern() {
  const route: any = useRoute();
  const navigation = useNavigation();
  const gesture = useRef<any>(null)
  const {getBalance}: any = useContext(MeContext);

  const [type, setType] = useState('normal');
  const [password, setPassword] = useState('');
  const { authorize } = useAuthorize();

  const isSetup = useMemo(() => {
    return route.params?.setup || false;
  }, [route.params?.setup]);

  const typePassword = useCallback(async (pass: any) => {
    if (!pass) return;

    setPassword(pass);

    if (!isSetup && pass.length >= 4) {
      checkPassword(pass, () => {
        authorize(true)
      });
    }
  }, [isSetup]);

  const checkPassword = useCallback(async (code: any, cb: any) => {
    const savedCode = await AsyncStorage.getItem('AuthorizationCode');
    if (savedCode === code) {
      cb && cb();
    } else {
      setType('wrong');
      setTimeout(() => {
        gesture.current?.resetActive()
        setType('normal')
      }, 300);
    }
  }, [isSetup]);

  const confirmPassword = useCallback(async (pass: any) => {
    // navigation.navigate('ConfirmPatternAuth', {
    //   setupPass: pass
    // })
    navigate('ConfirmPatternAuth')
  }, [password]);

  useEffect(() => {
    getBalance()
  }, [])

  const navigate = useCallback((name: any) => {
    navigation.reset({
      index: 0,
      routes: [{name, params: { setup: true }}] as never,
    });
  }, [navigation])  

  // Header props
  const headerProps = {
    text: 'Pattern Lock',
    onPress: isSetup ? () => navigate("AuthorizationMethod") : undefined,
  };

  return (
    <Layer>
      <View style={styles.container}>
        <View style={styles.content_second_pattern}>
          <PasswordGesture
            status={type}
            ref={gesture}
            onEnd={(password: any) => typePassword(password)}
            style={{
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
            }}
            normalColor={'rgba(255, 255, 255, 0.18)'}
            rightColor={'#ffffff'}
            innerCircle={true}
          />

          <View style={styles.content_second}>
            <AuthHeader {...headerProps} style={{ width: '100%' }}/>
            <Text style={styles.title_center}>Set points pattern</Text>
          </View>
        </View>

        {isSetup && (
          <View style={styles.bottom_container}>
            {password.length < 4 
              ? <View />
              : (
                <TouchableOpacity onPress={() => confirmPassword(password)}>
                  <Text style={styles.bottom_text}>Save</Text>
                </TouchableOpacity>
              )
            }

            <TouchableOpacity onPress={() => {
              setPassword('')
              gesture.current?.resetActive();
            }}>
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
