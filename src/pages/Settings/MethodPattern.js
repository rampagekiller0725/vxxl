import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Layer from '../../component/Layer';
import PasswordGesture from '../../component/CustomePattern/index';
import AuthHeader from '../../component/AuthHeader/AuthHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/mainStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useRef } from 'react';

export default function MethodPattern() {
  const route = useRoute();
  const navigation = useNavigation();
  const gesture = useRef(null)

  const [type] = useState('normal');
  const [password, setPassword] = useState('');

  const isSetup = useMemo(() => {
    return route.params?.setup || false;
  }, [route.params?.setup]);

  const typePassword = useCallback(async pass => {
    if (!pass) return;

    setPassword(pass);
  }, [isSetup]);

  const checkPassword = useCallback(async (code, cb) => {
    if (code.length < 4) return 
    cb && cb();
  }, [isSetup]);

  const confirmPassword = useCallback(async () => {
    navigation.navigate('ConfirmPattern', {
      setupPass: password
    })
  }, [password]);

  // Header props
  const headerProps = {
    text: 'Pattern Lock',
    onPress: isSetup ? () => navigation.goBack() : undefined,
    style: { width: '100%' }
  };

  return (
    <Layer>
      <View style={styles.container}>
        <View style={styles.content_second_pattern}>
          <PasswordGesture
            status={type}
            ref={gesture}
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
            <AuthHeader {...headerProps} />
            <Text style={styles.title_center}>Set points pattern</Text>
          </View>
        </View>

        {isSetup && (
          <View style={styles.bottom_container}>
            {password.length < 4 
              ? <View />
              : (
                <TouchableOpacity onPress={() => checkPassword(password, confirmPassword)}>
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
