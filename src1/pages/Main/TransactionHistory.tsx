import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View, Platform} from "react-native";
import Layer from "../../component/Layer";
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../styles/mainStyles";
import {MeContext} from "../../../App";
import {getBalanceUsdt, getCurrentBalance} from "../../helper/helper";
import ModalLoading from "../../component/Modal/ModalLoading";
import {getTransactionList} from "../../api/transactions";
import {TransactionList} from "../../component/TransactionList";


const TransactionHistory = ({navigation, route}: any) => {
    const {address, data, tokenPrice}: any = useContext(MeContext)
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        setLoading(true)

        getTransactionList({type: route.params.token, addresses: address})
            .then((payload: any) => setTransactions(payload))
            .catch((e: any) => console.log("error", e.response))
            .finally(() => setLoading(false))
    }, [address, setLoading, route])

    return (
        <Layer>
            <ModalLoading open={loading}/>
            <AuthHeader text={route?.params?.token} onPress={() => navigation.goBack()} />
            <View style={styles.container}>

                <View style={styles.title_container}>
                    <View style={styles.title_container_up}>
                        <Text style={styles.balance}>{route?.params?.token} Balance</Text>
                        <Text style={styles.rate}>Rate</Text>
                    </View>

                    <View style={styles.title_container_down}>
                        <Text style={styles.balance_count}>{Number(getCurrentBalance(route?.params?.token, data))?.toFixed(9)} {route?.params?.token}</Text>
                        <Text style={styles.rate_count}>{getBalanceUsdt(data, tokenPrice, route?.params?.token)} USD</Text>
                    </View>
                </View>

                <TransactionList transactions={transactions}/>
            </View>
        </Layer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title_container: {
        width: SCREEN_WIDTH - 34,
        height: 81,
        marginLeft: 17,
        marginTop: 22,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        marginBottom: 25
    },
    title_container_up: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 9
    },
    balance: {
        color: '#999999',
        fontSize: 13,
        fontWeight: '700'
    },
    rate: {
        color: '#999999',
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'right'
    },
    title_container_down: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    balance_count: {
        color: '#007AFF',
        fontSize: 20,
        fontWeight: '700'
    },
    rate_count: {
        color: '#34C759',
        fontSize: 14,
        fontWeight: '700'
    },
    bottom_info_container: {
        width: SCREEN_WIDTH,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: SCREEN_HEIGHT - 160,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 118 : 140
    },
    bottom_info_title: {
        textAlign: 'center',
        color: '#8A8A8E',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 12
    },
    bottom_info_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH - 32,
        marginBottom: 8
    },
    bottom_info_right_receive: {
        color: '#34C759',
        fontSize: 13,
        fontWeight: '700'
    },
    bottom_info_right_send: {
        color: '#FF3B30',
        fontSize: 13,
        fontWeight: '700'
    },
    bottom_info_left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    coin_box: {
        width: 37,
        height: 37,
        borderColor: '#007AFF',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    coin_name: {
        color: '#007AFF',
        fontSize: 10,
        fontWeight: '700'
    },
    coin_full_name: {
        color: '#212121',
        fontSize: 13,

    }
});

export default TransactionHistory;
