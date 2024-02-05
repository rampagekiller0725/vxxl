import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function PinKey({number, onPress, letters, disabled}) {
  return (
    <TouchableOpacity onPress={() => onPress(number)} disabled={disabled}>
      <View style={styles.container}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.letters}>{letters}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  number: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
  },
  letters: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    marginTop: -7,
  },
});
