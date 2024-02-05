import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import Layer from '../../component/Layer';
import {SCREEN_WIDTH} from '../../styles/mainStyles';
import ArrowMore from '../../public/main/settings_arrow.svg';
import {MeContext} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import { useAuthorize } from '../../context/AuthContext';

const Settings = () => {
  const {clear} = useContext(MeContext);
  const { authorize, setAuthMethod } = useAuthorize()
  const navigation = useNavigation();

  const logOut = useCallback(async () => {
    await clear();
    authorize(false);
    setAuthMethod("not-auth")
  }, [clear]);

  return (
    <Layer>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.content}>
          <Text style={styles.name}>My Account</Text>

          <TouchableOpacity onPress={() => navigation.navigate('RecoveryKey')}>
            <View style={styles.box}>
              <Text style={styles.box_name}>Recovery key</Text>

              <ArrowMore />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AuthorizationMethodSettings')}>
            <View style={styles.box}>
              <Text style={styles.box_name}>Authorization method</Text>

              <ArrowMore />
            </View>
          </TouchableOpacity>

          <Text style={[styles.name, {marginTop: 15}]}>My Account</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('WalletConnect')}>
            <View style={styles.box}>
              <Text style={styles.box_name}>Wallet Connect</Text>

              <ArrowMore />
            </View>
          </TouchableOpacity>

          <Text style={[styles.name, {marginTop: 15}]}>Support</Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://t.me/vxxlsupport/');
            }}>
            <View style={styles.box}>
              <Text style={styles.box_name}>Technical support</Text>

              <ArrowMore />
            </View>
          </TouchableOpacity>

          <Text style={[styles.name, {marginTop: 15}]}>Legal</Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://vxxl.org/terms-of-use');
            }}>
            <View style={styles.box}>
              <Text style={styles.box_name}>Terms of use</Text>

              <ArrowMore />
            </View>
          </TouchableOpacity>

          <Text style={[styles.name, {marginTop: 15}]}>Logout</Text>

          <TouchableOpacity onPress={logOut}>
            <View style={styles.box}>
              <Text style={styles.box_name}>Logout</Text>

              <ArrowMore />
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
    paddingHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  content: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 6,
    marginTop: 36,
  },
  name: {
    color: 'rgba(60, 60, 67, 0.6)',
    fontSize: 13,
    marginBottom: 6,
  },
  box: {
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(60, 60, 67, 0.36)',
    alignItems: 'center',
  },
  box_name: {
    color: '#000000',
    fontSize: 17,
  },
});

export default Settings;
