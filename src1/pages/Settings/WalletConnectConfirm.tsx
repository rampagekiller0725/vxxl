import Layer from "../../component/Layer";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react"
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import {SCREEN_WIDTH} from "../../styles/mainStyles";
import ArrowMore from "../../public/main/settings_arrow.svg";
import {useWalletConnect} from "../../component/WalletConnectProvider";
import ModalLoading from "../../component/Modal/ModalLoading";
import Url from "url-parse";
import qs from "qs"
import {MeContext} from "../../../App";

const WalletConnectConfirm = ({navigation, route}: any) => {
    const walletConnect: any = useWalletConnect();
    const {address}: any = useContext(MeContext);

    const url = route.params.uri
    const urlObj = new Url(url);
    const wcCleanUrl = url.replace('wc://wc?uri=', '');
    let params: any;

    if (urlObj.query.length) {
        try {
            params = qs.parse(urlObj.query.substring(1));
        } catch (e) {

        }
    }

    const loadSession = useCallback(async () => {
        console.log("wallet-connect-confirm on load", {urlObj, params, wcCleanUrl})
        await walletConnect.newSession(url, params.uri, params.redirectUrl)
    }, [])

    const onConnect = useCallback(async () => {
        try {
            const connector = walletConnect.getSession(url);
            connector?.approveSession({
                chainId: parseInt("56", 10),
                accounts: [address.bnb],
            });
        } finally {
            navigation.replace("WalletConnect");
        }
    }, [walletConnect])

    useEffect(() => {
        if (walletConnect.connected) return
        loadSession()
    }, [walletConnect.connected])

    const domain = useMemo(() => {
        const connector = walletConnect.getSession(url);
        console.log("Domain", connector?.peerMeta?.url);

        if (!connector?.peerMeta?.url) return "Undefined"
        return connector?.peerMeta.url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
    }, [walletConnect])

    const websiteName = useMemo(() => {
        const connector = walletConnect.getSession(url);
        console.log("WebsiteName", connector?.peerMeta?.name);

        return connector?.peerMeta?.name || "Undefined";
    }, [walletConnect])

    return (
        <Layer>
            <ModalLoading open={walletConnect.loading}/>
            <AuthHeader text={'Confirm'} onPress={() => navigation.goBack()}/>
            {!walletConnect.loading && (
                <View style={styles.container}>
                    <View style={styles.header_content}>

                        <Text style={styles.title}>{websiteName} wants to connect to your wallet</Text>
                    </View>

                    <View style={styles.confirm_modal}>

                        <Text style={styles.url}>{domain}</Text>

                        <View style={styles.box}>
                            <Text style={styles.box_name}>Main Wallet</Text>

                            <ArrowMore/>
                        </View>

                        <View style={styles.content_box}>
                            <Text style={styles.content_text}>• View your wallet balance and activity</Text>
                            <Text style={styles.content_text}>• Request approval for transaction</Text>
                        </View>

                        <TouchableOpacity onPress={onConnect}>
                            <View style={styles.btn}>
                                <Text style={styles.btn_text}>Connect</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Layer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    header_content: {
        paddingHorizontal: 17,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        marginTop: 27
    },
    confirm_modal: {
        flexDirection: 'column',
        padding: 18,
        paddingTop: 24,
        paddingBottom: 32,
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    btn: {
        height: 50,
        width: SCREEN_WIDTH - 36,
        borderRadius: 6,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },
    btn_text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700'
    },
    box: {
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(60, 60, 67, 0.36)',
        alignItems: 'center',
        marginTop: 24
    },
    box_name: {
        color: '#000000',
        fontSize: 17,
    },
    content_box: {
        marginTop: 24
    },
    content_text: {
        color: '#000000',
        fontSize: 17,
    },
    url: {
        color: '#3C3C4399',
        fontSize: 13,
        textAlign: 'center'
    }
})

export default WalletConnectConfirm;
