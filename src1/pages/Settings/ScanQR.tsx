import React from "react";
import {StyleSheet, View} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SCREEN_WIDTH} from "../../styles/mainStyles";
import Layer from "../../component/Layer";
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import QrGrpup from '../../public/main/qr_grpup.svg'
import {sized} from "../../helper/Svg";


const QrGrpupIcon = sized(QrGrpup, SCREEN_WIDTH - 34)

export default function ScanQR({navigation, route}: any) {
    return (
        <Layer>
            <View style={styles.content}>
                <AuthHeader text={'Scan QR code'} onPress={() => navigation.goBack()} style={{ width: '100%'}}/>
                <View style={styles.qr_container}>
                    <View style={styles.qr_view}>
                        <QRCodeScanner
                            onRead={(e) => route.params.onRead(e)}
                            cameraStyle={{
                                height: SCREEN_WIDTH - 40,
                                width: '100%'
                            }}

                            showMarker={true}
                            customMarker={<QrGrpupIcon/>}
                        />
                    </View>
                </View>

                <View></View>

            </View>
        </Layer>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
       
    },
    qr_container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: 'relative',
        paddingHorizontal: 18,
    },
    qr_view: {
        borderRadius: 8,
        height: SCREEN_WIDTH - 40,
        width: '100%',
        overflow: "hidden"
    }
});
