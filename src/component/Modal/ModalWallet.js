import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { SCREEN_WIDTH } from "../../styles/mainStyles";


const ModalWallet = ({open, setOpen, active, setActive}) => {

  const pressWallet = (item) => {
    setActive(item)
    setOpen(false)
  }

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity activeOpacity={1} underlayColor='transparent' style={styles.container} onPress={() => setOpen(false)}>
          <TouchableOpacity activeOpacity={1} underlayColor='transparent' onPress={(e) => e.preventDefault()} style={styles.content}>
            <Text style={styles.title}>Coin Balance</Text>
            <Text style={styles.text}>Select coin to check your wallet balance</Text>

            <TouchableOpacity onPress={() => pressWallet('VXXL')}><View style={styles.network_box}>
              <Text style={active === 'VXXL' ? styles.network_name_active : styles.network_name}>VXXL</Text>
            </View></TouchableOpacity>

            <TouchableOpacity onPress={() => pressWallet('BTC')}><View style={styles.network_box}>
              <Text style={active === 'BTC' ? styles.network_name_active : styles.network_name}>BTC</Text>
            </View></TouchableOpacity>

            <TouchableOpacity onPress={() => pressWallet('BNB')}><View style={styles.network_box}>
              <Text style={active === 'BNB' ? styles.network_name_active : styles.network_name}>BNB</Text>
            </View></TouchableOpacity>

            <TouchableOpacity onPress={() => pressWallet('USDT')}><View style={styles.network_box}>
              <Text style={active === 'USDT' ? styles.network_name_active : styles.network_name}>USDT</Text>
            </View></TouchableOpacity>
          </TouchableOpacity>

        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: SCREEN_WIDTH - 106,
    borderRadius: 6,
    backgroundColor: '#F2F2F2',
    paddingTop: 18
  },
  title: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center'
  },
  text: {
    color: '#000000',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 40
  },
  network_box: {
    width: SCREEN_WIDTH - 106,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderTopWidth: 1,
    borderTopColor: 'rgba(60, 60, 67, 0.36)'
  },
  network_name: {
    color: '#999999',
    fontSize: 17,
  },
  network_name_active: {
    color: '#007AFF',
    fontSize: 17,
  },
});

export default ModalWallet;
