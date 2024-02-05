import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Layer from '../../component/Layer';
import LogoSmall from '../../public/main/logo_small.svg';
import ArrowMore from '../../public/main/arrow_more.svg';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/mainStyles';
import ReceiveIcon from '../../public/main/receive.svg';
import SendIcon from '../../public/main/send.svg';
import ModalWallet from '../../component/Modal/ModalWallet';
import {MeContext} from '../../../App';
import {getCurrentBalance, getTotalBalanceUsdt} from '../../helper/helper';
import Lottie from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';

const Wallet = ({navigation}) => {
  const {
    activeWallet,
    setActiveWallet,
    data,
    setData,
    address,
    setAddress,
    getBalance,
    getAddress,
    tokenPrice,
  } = useContext(MeContext);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getRefreshing = async () => {
    setRefreshing(true);
    await getBalance();
    setRefreshing(false);
  };

  const onMount = useCallback(() => {
    let interval = null;

    if (!interval) {
      interval = setInterval(() => {
        if (address.usdt) getBalance();
      }, 80000);
    }

    return () => {
        clearInterval(interval)
        interval = null
    }
}, [])

  useFocusEffect(onMount)

  useEffect(() => {
    getAddress();
  }, [])

  useEffect(() => {
    if (address) getBalance();
  }, [address]);

  return (
    <Layer>
      <ModalWallet
        open={open}
        setOpen={setOpen}
        active={activeWallet}
        setActive={setActiveWallet}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getRefreshing} />
        }>
        <View style={styles.container}>
          <View>
            <View style={styles.header_container}>
              <LogoSmall />

              <TouchableOpacity onPress={() => setOpen(true)}>
                <View style={styles.select_network_box}>
                  <Text style={styles.network_text}>{activeWallet}</Text>

                  <ArrowMore />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.balance_box}>
              <Text style={styles.balance_text}>Total Balance</Text>
              <Text style={styles.balance_count}>
                {getTotalBalanceUsdt(data, tokenPrice)} USD
              </Text>
            </View>

            <View style={styles.balance_box}>
              <Text style={styles.balance_text}>{activeWallet} Balance</Text>
              <Text style={styles.balance_count}>
                {getCurrentBalance(activeWallet, data)} {activeWallet}
              </Text>
            </View>

            <View style={styles.send_receive_container}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ReceivePayment')}>
                <View style={styles.send_receive_box}>
                  <View style={styles.receive_box}>
                    <ReceiveIcon />
                  </View>

                  <Text style={styles.receive_text}>Receive</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('SendPayment')}>
                <View style={styles.send_receive_box}>
                  <View style={styles.send_box}>
                    <SendIcon />
                  </View>

                  <Text style={styles.send_text}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom_info_container}>
        <Text style={styles.bottom_info_title}>Currencies Balance</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionHistory', {token: 'VXXL'})
          }>
          <View style={styles.bottom_info_box}>
            <View style={styles.bottom_info_left}>
              <View style={styles.coin_box}>
                <Text style={styles.coin_name}>VXXL</Text>
              </View>

              <Text style={styles.coin_full_name}>VXXL (VXXL)</Text>
            </View>

            <Text style={styles.bottom_info_right}>
              {Number(data.vxxl)?.toFixed(8)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionHistory', {token: 'BTC'})
          }>
          <View style={styles.bottom_info_box}>
            <View style={styles.bottom_info_left}>
              <View style={styles.coin_box}>
                <Text style={styles.coin_name}>BTC</Text>
              </View>

              <Text style={styles.coin_full_name}>BTC (BTC)</Text>
            </View>

            <Text style={styles.bottom_info_right}>
              {Number(data.btc)?.toFixed(8)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionHistory', {token: 'BNB'})
          }>
          <View style={styles.bottom_info_box}>
            <View style={styles.bottom_info_left}>
              <View style={styles.coin_box}>
                <Text style={styles.coin_name}>BNB</Text>
              </View>

              <Text style={styles.coin_full_name}>BNB (Binance)</Text>
            </View>

            <Text style={styles.bottom_info_right}>
              {Number(data?.bnb)?.toFixed(8)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionHistory', {token: 'USDT'})
          }>
          <View style={styles.bottom_info_box}>
            <View style={styles.bottom_info_left}>
              <View style={styles.coin_box}>
                <Text style={styles.coin_name}>USDT</Text>
              </View>

              <Text style={styles.coin_full_name}>USDT (Tether)</Text>
            </View>

            <Text style={styles.bottom_info_right}>
              {Number(data?.usdt)?.toFixed(8)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: Platform.OS === 'ios' ? 5 : 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  select_network_box: {
    width: 171,
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderRadius: 6,
  },
  network_text: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  balance_box: {
    width: SCREEN_WIDTH - 32,
    marginLeft: 16,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 81,
    marginBottom: 10,
  },
  balance_text: {
    color: '#999999',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },
  balance_count: {
    color: '#007AFF',
    fontSize: 22,
    fontWeight: '700',
  },
  send_receive_container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  send_receive_box: {
    height: 50,
    width: (SCREEN_WIDTH - 42) / 2,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
  },
  receive_box: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(52, 199, 89, 0.18)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  receive_text: {
    color: '#34C759',
    fontSize: 17,
    fontWeight: '600',
  },
  send_box: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 59, 48, 0.18)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  send_text: {
    color: '#FF3B30',
    fontSize: 17,
    fontWeight: '600',
  },
  bottom_info_container: {
    width: SCREEN_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 230,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  bottom_info_title: {
    textAlign: 'center',
    color: '#8A8A8E',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  bottom_info_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH - 32,
    marginBottom: 8,
  },
  bottom_info_right: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bottom_info_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin_box: {
    width: 37,
    height: 37,
    borderColor: '#007AFF',
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  coin_name: {
    color: '#007AFF',
    fontSize: 10,
    fontWeight: '700',
  },
  coin_full_name: {
    color: '#212121',
    fontSize: 13,
  },
});

export default Wallet;
