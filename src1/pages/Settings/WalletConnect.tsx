import Layer from "../../component/Layer";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useMemo} from "react"
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import {SCREEN_WIDTH} from "../../styles/mainStyles";
import {useWalletConnect} from "../../component/WalletConnectProvider";
import ArrowMore from "../../public/main/settings_arrow.svg";

const WalletConnect = ({navigation}: any) => {
    const {connectors}: any = useWalletConnect();

    const onRead = ({data}: any) => {
        console.log('scan read', data)
        navigation.navigate('WalletConnectConfirm', {uri: data})
    }

    const connections = useMemo(() => {
        return connectors.map((item: any) => {
            const name = item?._peerMeta?.name || "Undefined";
            let domain = "Undefined"

            if (item?._peerMeta?.url) {
                domain = item?._peerMeta.url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
            }

            return {name, domain, clientId: item.clientId}
        })
    }, [connectors])

    return (
        <Layer>
            <AuthHeader text={'Wallet Connect'} onPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View>

                    <Text style={styles.title}>Connect your wallet with WalletConnect to make transactions</Text>
                </View>


                {connections.length > 0 && <View style={styles.wallet_box}>
                    <View style={styles.wallet_box_header}>
                        <Text style={styles.wallet_box_title}>Main Wallet</Text>
                    </View>
                    {connections.map((item: any) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WalletConnectConnected', {connect: item})}><View
                            style={styles.box}>
                            <View style={styles.box_left}>
                                <Text style={styles.box_name}>{item.name}</Text>
                                <Text style={styles.box_domain}>{item.domain}</Text>
                            </View>

                            <ArrowMore/>
                        </View></TouchableOpacity>))}
                </View>}


                <View style={styles.bottom_button}>
                    <TouchableOpacity onPress={() => navigation.navigate("ScanQR", {onRead})}>
                        <View style={styles.btn}>
                            <Text style={styles.btn_text}>New Connection</Text>
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
        color: '#007AFF',
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

export default WalletConnect;
