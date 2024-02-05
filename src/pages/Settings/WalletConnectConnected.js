import Layer from "../../component/Layer";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useMemo, useState} from "react"
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import {SCREEN_WIDTH} from "../../styles/mainStyles";
import {useWalletConnect} from "../../component/WalletConnectProvider";
import {MeContext} from "../../../App";

const WalletConnectConnected = ({navigation, route}) => {

    const {killSession} = useWalletConnect();
    const {address} = useContext(MeContext);
    const [connect, setConnect] = useState({});

    const disconnect = async () => {
        try {
            await killSession(connect.clientId)
            navigation.goBack()
        }catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        setConnect(route.params.connect)
    }, [])

    return (
        <Layer>
            <AuthHeader text={'Wallet Connect'} onPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View>

                    <Text style={styles.title}>Connect your wallet with WalletConnect to make transactions</Text>
                </View>


                <View style={styles.wallet_box}>
                    <View style={styles.wallet_box_header}>
                        <Text style={styles.wallet_box_title}>Main Wallet</Text>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.box_left}>
                            <Text style={styles.box_name}>{connect.name}</Text>
                            <Text style={styles.box_domain}>{connect.domain}</Text>
                        </View>
                    </View>
{/*
                    <View style={styles.box}>
                        <View style={styles.box_left}>
                            <Text style={styles.box_name}>{connect.name}</Text>
                            <Text style={styles.box_domain}>{connect.domain}</Text>
                        </View>
                    </View>*/}

                    <View style={styles.box}>
                        <View style={styles.box_left}>
                            <Text style={styles.box_name}>Address</Text>
                            <Text style={styles.box_domain}>{address?.bnb}</Text>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.box_left}>
                            <Text style={styles.box_name}>Network</Text>
                            <Text style={styles.box_domain}>Smart Chain</Text>
                        </View>
                    </View>
                </View>



                <View style={styles.bottom_button}>
                    <TouchableOpacity onPress={() => disconnect()}>
                        <View style={styles.btn}>
                            <Text style={styles.btn_text}>Disconnect</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Layer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios' ? 50 : 30,
        paddingHorizontal: 17
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        marginTop: 27
    },
    bottom_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        height: 50,
        width: SCREEN_WIDTH - 36,
        borderRadius: 6,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_text: {
        color: '#FF3B30',
        fontSize: 17,
        fontWeight: '700'
    },
    wallet_box: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16
    },
    wallet_box_title: {
        fontSize: 13,
        color: "#3C3C4399",
    },
    wallet_box_header: {
        paddingHorizontal: 2,
        paddingBottom: 16
    },
    box: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(60, 60, 67, 0.36)',
        alignItems: 'center',
        marginBottom: 16
    },
    box_left: {
        flexDirection: 'column',
        paddingVertical: 12
    },
    box_name: {
        color: '#000000',
        fontSize: 17,
    },
    box_domain: {
        color: '#3C3C4399',
        fontSize: 15,
    }
})

export default WalletConnectConnected;
