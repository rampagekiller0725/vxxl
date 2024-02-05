import {createStackNavigator} from '@react-navigation/stack';
import CreateNewWallet from '../pages/Auth/CreateNewWallet';
import EnterWallet from '../pages/Auth/EnterWallet';
import RestoreWallet from '../pages/Auth/RestoreWallet';
import React from 'react';

const InitialStack = createStackNavigator();

export const InitialNavigator = () => (
  <InitialStack.Navigator initialRouteName={'EnterWallet'} screenOptions={{ headerShown: false }}>
    <InitialStack.Screen name="EnterWallet" component={EnterWallet} />
    <InitialStack.Screen name="CreateNewWallet" component={CreateNewWallet} />
    <InitialStack.Screen name="RestoreWallet" component={RestoreWallet} />
  </InitialStack.Navigator>
);
