import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import Layer from "../../component/Layer";
import Button from "../../component/Button/Button";
import {SCREEN_WIDTH} from "../../styles/mainStyles";


const TechnicalSupport = ({navigation}) => {
    return (
        <Layer>
            <View style={styles.container}>
                <View style={styles.content}>
                    <AuthHeader text={'Technical Support'} onPress={() => navigation.goBack()}/>
                    <Text style={styles.title}>Create new ticket to contact our support team</Text>
                </View>

                <View style={styles.ticket_container}>
                    <Text style={styles.ticket_text}>Zendesk</Text>
                </View>

                <View style={styles.bottom_container}>
                    <Button full={true} text={'Create Ticket'}/>
                </View>
            </View>
        </Layer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingBottom: 32
    },
    content: {
        flexDirection: 'column',
        paddingHorizontal: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginTop: 26
    },
    bottom_container: {
        paddingHorizontal: 18,
    },
    ticket_container: {
        width: SCREEN_WIDTH - 36,
        height: SCREEN_WIDTH - 36,
        marginLeft: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.18)'
    },
    ticket_text: {
        color: '#FFFFFF',
        fontSize: 41,
        fontWeight: '700'
    }
});

export default TechnicalSupport
