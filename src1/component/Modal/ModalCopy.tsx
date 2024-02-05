import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { SCREEN_WIDTH } from "../../styles/mainStyles";
import Lottie from 'lottie-react-native';
import CopyIcone from "../../public/main/copy_icone.svg";


const ModalCopy = ({open}: any) => {

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
      >
        <View style={styles.container}>
          {/*<ActivityIndicator size="large" />*/}
          <View style={styles.qr_code_box}>
            <CopyIcone />

            <Text style={styles.qr_code_text}>Copied</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qr_code_box: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    width: 140,
    height: 140,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qr_code_text: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 11
  },
});

export default ModalCopy;
