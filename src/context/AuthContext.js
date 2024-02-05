import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import React, {createContext, useCallback, useContext, useState} from 'react';
import { MeContext } from '../../App';

export const AuthContext = createContext({
  authMethod: undefined,
  getInitialState: () => {},
	isAuthorized: false,
	authorize: (bool) => {}
});

export const AuthProvider = props => {
  const [authMethod, setAuthMethod] = useState(undefined);
	const [isAuthorized, authorize] = useState(false);
	const { getAddress } = useContext(MeContext)
	
	const getInitialState = useCallback(async () => {
		const method = await AsyncStorage.getItem('AuthorizationMethod');
		if (method) setAuthMethod(method)
		else setAuthMethod("not-auth")
		return method || "not-auth"
	}, [setAuthMethod])

	useEffect(() => {
		getAddress().then(() => {
			getInitialState();
		})
	}, [])

  return <AuthContext.Provider {...props} value={{authMethod, getInitialState, isAuthorized, authorize, setAuthMethod}} />;
};

export const useAuthorize = () => {
  return useContext(AuthContext);
};
