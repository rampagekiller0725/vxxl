import React from "react";
import {StyleSheet, Platform} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Wallet from "../pages/Main/Wallet";
import WalletIcon from '../public/main/wallet.svg'
import WalletIconActive from '../public/main/wallet_active.svg'
import SettingsIcon from '../public/main/settings.svg'
import SettingsIconActive from '../public/main/settings_active.svg'
import Settings from "../pages/Settings/Settings";
import TransactionHistory from "../pages/Main/TransactionHistory";
import TransactionDetails from "../pages/Main/TransactionDetails";
import ReceivePayment from "../pages/Main/ReceivePayment";
import SendPayment from "../pages/Main/SendPayment";
import RecoveryKey from "../pages/Settings/RecoveryKey";
import AuthorizationMethodSettings from "../pages/Settings/AuthorizationMethodSettings";
import WalletConnect from "../pages/Settings/WalletConnect";
import TermsOfUse from "../pages/Settings/TermsOfUse";
import TechnicalSupport from "../pages/Settings/TechnicalSupport";
import WalletConnectConfirm from "../pages/Settings/WalletConnectConfirm";
import ScanQR from "../pages/Settings/ScanQR";
import ConfirmPattern from "../pages/Settings/ConfirmPattern";
import WalletConnectConnected from "../pages/Settings/WalletConnectConnected";
import MethodFingerPrint from "../pages/Settings/MethodFingerPrint"
import MethodPattern from "../pages/Settings/MethodPattern"
import MethodPin from "../pages/Settings/MethodPin";
import ConfirmPin from "../pages/Settings/ConfirmPin";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WalletStack = () => {
  return (
    <Stack.Navigator initialRouteName="Wallet" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="RecoveryKey" component={RecoveryKey} />
      <Stack.Screen name="AuthorizationMethodSettings" component={AuthorizationMethodSettings} />
      <Stack.Screen name="WalletConnect" component={WalletConnect} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
      <Stack.Screen name="TechnicalSupport" component={TechnicalSupport} />
      <Stack.Screen name="WalletConnectConfirm" component={WalletConnectConfirm} />
      <Stack.Screen name="WalletConnectConnected" component={WalletConnectConnected} />
      <Stack.Screen name="MethodFingerPrint" component={MethodFingerPrint} />
      <Stack.Screen name="MethodPattern" component={MethodPattern} />
      <Stack.Screen name="ConfirmPattern" component={ConfirmPattern} />
      <Stack.Screen name="MethodPin" component={MethodPin} />
      <Stack.Screen name="ConfirmPin" component={ConfirmPin} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Wallet" screenOptions={{
			tabBarStyle: {
				backgroundColor: '#fff',
				height: Platform.OS === 'ios' ? 80 : 60,
				shadowColor: 'rgba(0,0,0,0.56)',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.77,
				shadowRadius: 4.65,
				elevation: 12,
				alignItems: 'center',
				justifyContent: 'center',
				margin: 0,
				padding: 0,
				paddingBottom: Platform.OS === 'ios' ? 30 : 10,
			},
			headerShown: false,
			tabBarHideOnKeyboard: true,
		}}>

      <Tab.Screen name="Wallet" component={WalletStack} options={{
				tabBarShowLabel: true,
				tabBarIcon: ({color, focused}) => focused ? <WalletIconActive style={styles.img} /> : <WalletIcon style={styles.img} />
      }} />

      <Tab.Screen name="Settings" component={SettingsStack} options={{
				tabBarShowLabel: true,
				tabBarIcon: ({color, focused}) => focused ? <SettingsIconActive style={styles.img} /> : <SettingsIcon style={styles.img} />
			}} />
    </Tab.Navigator>
  );
};

export const SecureNavigator = () => (
  <Stack.Navigator initialRouteName={'BottomTabNavigator'} screenOptions={{headerShown: false}}>
    <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{gestureEnabled: false}} />
    <Stack.Screen name="ReceivePayment" component={ReceivePayment} />
    <Stack.Screen name="SendPayment" component={SendPayment} />
    <Stack.Screen name="ScanQR" component={ScanQR} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
