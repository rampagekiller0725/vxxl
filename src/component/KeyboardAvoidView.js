import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from "react"
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function KeyboardAvoidView(props) {

  if (Platform.OS === 'ios') {
    return <KeyboardAvoidingView {...props} behavior={"padding"} style={{ flex: 1 }} />
  }

  return <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} {...props}/>
}
