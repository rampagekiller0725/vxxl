import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import Layer from "../../component/Layer";


const TermsOfUse = ({navigation}) => {
    return (
        <Layer>
            <View style={styles.container}>
                <View style={styles.content}>
                    <AuthHeader text={'Terms of Use'} onPress={() => navigation.goBack()}/>
                    <ScrollView>
                        <View style={{marginTop: 25}}/>
                        <Text style={styles.text}>The following Terms of Use outline ChangeNOW’s key information handling practices at changenow.io. This document covers general rules of using virtual currency exchange service, lists main risks and prohibited jurisdictions, describes KYC/AML and refund procedures, and illustrates other important legal aspects. Before using any of ChangeNOW’s services you are required to read, understand, and agree with these Terms.</Text>
                        <Text style={styles.text}>Document’s contents</Text>
                        <Text style={styles.text}>1. General Provisions</Text>
                        <Text style={styles.text}>2. Using of Services</Text>
                        <Text style={styles.text}>3. AML/KYC Procedure</Text>
                        <Text style={styles.text}>4. Personal Data</Text>
                        <Text style={styles.text}>5. Prices, Exchange Rates and Confirmations</Text>
                        <Text style={styles.text}>6. Returns and Refund Policy</Text>
                        <Text style={styles.text}>7. Indemnification</Text>
                        <Text style={styles.text}>8. Disclaimers</Text>
                        <Text style={styles.text}>9. Limitation of Liability</Text>
                        <Text style={styles.text}>10. Prohibited Jurisdictions</Text>
                        <Text style={styles.text}>11. Permissible Use</Text>
                    </ScrollView>
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
        paddingBottom: 90
    },
    content: {
        flexDirection: 'column',
        paddingHorizontal: 18,
    },
    text: {
        fontSize: 17,
        color: '#fff',
        marginTop: 10,
        lineHeight: 17,
    },
});

export default TermsOfUse
