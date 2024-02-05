import React from "react";
import {useNavigation} from "@react-navigation/native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../styles/mainStyles";
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const TransactionList = ({ transactions }: any) => {
    const { navigate } = useNavigation()

    return (
        <View style={styles.bottom_info_container}>
            <Text style={styles.bottom_info_title}>Transactions</Text>

            <View>
                <FlatList data={transactions} keyExtractor={(_, index) => index} onEndReachedThreshold="0.5" renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigate(["TransactionDetails", { transaction: item }] as never)}>
                        <View style={styles.bottom_info_box}>
                            <View style={styles.bottom_info_left}>
                                <View style={styles.coin_box}>
                                    <Text style={styles.coin_name}>{item.type}</Text>
                                </View>
                                <Text style={styles.coin_full_name}>{item.getDateString()}</Text>
                            </View>
                            {!!item.receive && !item.send && (
                                <Text style={styles.bottom_info_right_receive}>+{Number(item.receive).toFixed(5)}</Text>
                            )}

                            {!!item.send && !item.receive && (
                                <Text style={styles.bottom_info_right_send}>-{Number(item.send).toFixed(5)}</Text>
                            )}

                            {!!item.send && !!item.receive && (
                                <Text style={styles.bottom_info_right_send}>-{Number(item.send - item.receive).toFixed(5)}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
