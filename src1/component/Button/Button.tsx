import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from "../../styles/mainStyles";


const Button = ({text, full, style, onPress, disable}: any) => {

  if(disable){
    return <View style={[styles.container, styles.full_disable, style]}>
      <Text style={[styles.text, styles.text_full_disable]}>{text}</Text>
    </View>
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, full ? styles.full : styles.outline, style]}>
        <Text style={[styles.text, full ? styles.text_full : styles.text_outline]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH - 36,
    height: 50,
    borderRadius: 8
  },
  text: {
    fontSize: 17,
    fontWeight: '700'
  },
  full: {
    backgroundColor: '#fff'
  },
  full_disable: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)'
  },
  text_full: {
    color: '#007AFF'
  },
  text_full_disable: {
    color: 'rgba(255,255,255,0.3)'
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff'
  },
  text_outline: {
    color: '#fff'
  }
});

export default Button;
