import {StyleSheet, View} from 'react-native';
import React from 'react';
import PinKey from './PinKey';

export default function PinKeyboard({value, onChange}) {

  const typePin = (pinValue) => {
    const newValue = `${value || ''}${pinValue}`
    if (newValue.length > 4) return;

    onChange(newValue)
  }

  return (
    <View style={styles.keyboard_container}>
      <View style={styles.keyboard_line}>
        <PinKey number={1} onPress={() => typePin(1)} disabled={value.length >= 4}/>
        <PinKey number={2} letters={'ABC'} onPress={() => typePin(2)} disabled={value.length >= 4}/>
        <PinKey number={3} letters={'DEF'} onPress={() => typePin(3)} disabled={value.length >= 4}/>
      </View>

      <View style={styles.keyboard_line}>
        <PinKey number={4} letters={'GHI'} onPress={() => typePin(4)} disabled={value.length >= 4}/>
        <PinKey number={5} letters={'JLK'} onPress={() => typePin(5)} disabled={value.length >= 4}/>
        <PinKey number={6} letters={'MNO'} onPress={() => typePin(6)} disabled={value.length >= 4}/>
      </View>

      <View style={styles.keyboard_line}>
        <PinKey number={7} letters={'PQRS'} onPress={() => typePin(7)} disabled={value.length >= 4}/>
        <PinKey number={8} letters={'TUV'} onPress={() => typePin(8)} disabled={value.length >= 4}/>
        <PinKey number={9} letters={'WXYZ'} onPress={() => typePin(9)} disabled={value.length >= 4}/>
      </View>

      <View style={styles.keyboard_line}>
        <View />
        <PinKey number={0} onPress={() => typePin(0)} disabled={value.length >= 4}/>
        <View />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard_container: {
    width: 280,
    marginTop: 36,
    flexDirection: 'column',
  },
  keyboard_line: {
    width: 280,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});
