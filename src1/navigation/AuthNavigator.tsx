import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { useMemo } from 'react';
import AuthorizationMethod from '../pages/Auth/AuthorizationMethod';
import ConfirmPatternAuth from '../pages/Auth/ConfirmPatternAuth';
import ConfirmPinAuth from '../pages/Auth/ConfirmPinAuth';
import LoginFingerPrint from '../pages/Auth/LoginFingerPrint';
import LoginPattern from '../pages/Auth/LoginPattern';
import LoginPin from '../pages/Auth/LoginPin';

const AuthStack = createStackNavigator();

export const AuthNavigator = ({ method }: any) => {

	const initialRoute = useMemo(() => {
		switch(method) {
			case "not-auth": return "AuthorizationMethod"
			case "pin": return "LoginPin"
			case "fingerprint": return "LoginFingerPrint"
			case "pattern": return "LoginPattern"
			default: return "AuthorizationMethod"
		}
	}, [method])

	return (
		<AuthStack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="AuthorizationMethod" component={AuthorizationMethod} />
			<AuthStack.Screen name="LoginPin" component={LoginPin} />
			<AuthStack.Screen name="ConfirmPinAuth" component={ConfirmPinAuth} />
			<AuthStack.Screen name="LoginFingerPrint" component={LoginFingerPrint} />
			<AuthStack.Screen name="LoginPattern" component={LoginPattern} />
			<AuthStack.Screen name="ConfirmPatternAuth" component={ConfirmPatternAuth} />
		</AuthStack.Navigator>
	)
};
