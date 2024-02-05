import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, Platform} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/mainStyles";
import LogoBig from '../../public/Auth/logo_big.svg'
import Button from "../../component/Button/Button";
import Layer from "../../component/Layer";


const EnterWallet = ({navigation}) => {
  return (
    <Layer>
      <View style={styles.container}>

        <View style={styles.logo_container}>
          <LogoBig />
          <Text style={styles.logo_text}>VX Wallet</Text>
        </View>

        <View style={styles.bottom_container}>
          <Button text={'Create Wallet'} full={true} onPress={() => navigation.navigate('CreateNewWallet')}/>
          <Button text={'Restore Wallet'} style={{marginTop: 12}} onPress={() => navigation.navigate('RestoreWallet')}/>
        </View>
      </View>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo_container: {
    alignItems: "center",
    justifyContent: "center"
  },
  logo_text: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginTop: 11
  },
  bottom_container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 52 : 32,
    left: 18,
    right: 18,
    width: SCREEN_WIDTH - 36
  }
});

export default EnterWallet;
