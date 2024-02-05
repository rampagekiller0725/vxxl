import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Platform} from "react-native";
import ArrowBack from '../../public/Auth/arrow_back.svg'
import { SCREEN_WIDTH } from "../../styles/mainStyles";


const AuthHeader = ({text, onPress, style}) => {
  return (
    <View style={[styles.container, style]}>
      {onPress 
        ? <TouchableOpacity onPress={onPress} style={styles.btn}>
            <ArrowBack />
          </TouchableOpacity> 
        : <View style={styles.btn}/>
      }

      <Text style={styles.text}>{text}</Text>

      <View style={styles.btn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 18 : 0,
    height: Platform.OS === 'ios' ? 48 : 48,
  },
  text: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center'
  },
  btn: {
    flexDirection: 'row',
    height: '100%',
    minWidth: 50,
    paddingHorizontal: 18,
    alignItems: 'center'
  }
});

export default AuthHeader;
