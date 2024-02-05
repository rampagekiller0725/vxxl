import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Platform} from 'react-native';
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import Clipboard from "@react-native-clipboard/clipboard";
import ContentCopy from "../../public/Auth/content_copy.svg";
import Layer from "../../component/Layer";
import {SCREEN_WIDTH} from "../../styles/mainStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalCopy from "../../component/Modal/ModalCopy";


const RecoveryKey = ({navigation}: any) => {

    const [key, setKey] = useState<any>("");
    const [copyModal, setCopyModal] = useState(false);

    const setMnemonic = async () => {
        const key = await AsyncStorage.getItem('mnemonic')
        setKey(key)
    }

    const copy = () => {
        Clipboard.setString(key)
        setCopyModal(true)
        setTimeout(() => {
            setCopyModal(false)
        }, 800)
    }

    useEffect(() => {
        setMnemonic()
    }, [])

    return (
        <Layer>
            <ModalCopy open={copyModal}/>

            <AuthHeader text={'Recovery Key'} onPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Backup your wallet</Text>
                    <Text style={styles.text}>This is your recovery key, copy and save these words in a safe place. Do not share this key with anyone, once you lose it your wallet cannot be restored.</Text>

                    <FlatList
                        data={key?.split(' ')}
                        keyExtractor={item => item}
                        numColumns={3}
                        horizontal={false}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        renderItem={({ item }) => {
                            return <View style={styles.key_box}>
                                <Text style={styles.key_text}>{item}</Text>
                            </View>;
                        }}
                    />

                    <View style={styles.copy_download_container}>
                        <TouchableOpacity onPress={() => copy()}><View style={styles.copy_container}>
                            <ContentCopy />
                        </View></TouchableOpacity>

                       {/* <View style={styles.download_container}>
                            <Text style={styles.download_text}>Download raw keys</Text>
                        </View>*/}
                    </View>

                </View>

                <View style={styles.bottom_container}>
                   {/* <Button text={'Download raw keys'} full={true} onPress={() => nextStep()}/>*/}
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
        paddingBottom: Platform.OS === 'ios' ? 42 :32
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
    text: {
        fontSize: 17,
        color: '#fff',
        marginTop: 17,
        marginBottom: 23
    },
    key_box: {
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        height: 32,
        width: (SCREEN_WIDTH - 52) / 3,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    key_text: {
        fontSize: 14,
        color: '#fff'
    },
    copy_download_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 24
    },
    copy_container: {
        width: 32,
        height: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    download_container: {
        height: 31,
        width: 145,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1
    },
    download_text: {
        fontSize: 14,
        color: '#fff'
    },
    check_box_container: {
        flexDirection: 'row',
        marginBottom: 8
    },
    check_box_text: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
        marginLeft: 5
    },
    bottom_container: {
        width: SCREEN_WIDTH - 36,
        marginTop: 30,
        marginLeft: 18
    }
});

export default RecoveryKey
