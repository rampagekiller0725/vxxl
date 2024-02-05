import React, {useContext} from "react";
import { useAuthorize } from "../context/AuthContext";
import { InitialNavigator } from "./InitialNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { SecureNavigator } from "./SecureNavigator";
import { MeContext } from "../../App";
import { View } from "react-native";

export default function Navigation() {
	const { authMethod, isAuthorized } = useAuthorize();
	const { address } = useContext(MeContext)

	if (!authMethod) {
		return <View />
	}

	return isAuthorized 
		? <SecureNavigator /> 
		: !address.vxxl 
			? <InitialNavigator />
			: <AuthNavigator method={authMethod}/>
}
