import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import { SCREEN_WIDTH } from "../../styles/mainStyles";
import Lottie from 'lottie-react-native';
import LoaderIcon from "../../public/vxw_intro.json"


const ModalLoading = ({open}) => {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
      >
              <View style={styles.container}>
          {/*<ActivityIndicator size="large" />*/}
          <Lottie
             style={{ height: 180 }}
             source={LoaderIcon} autoPlay loop />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: SCREEN_WIDTH - 106,
    borderRadius: 6,
    backgroundColor: '#F2F2F2',
    paddingTop: 8
  },
  title: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center'
  },
  text: {
    color: '#000000',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 40
  },
  network_box: {
    width: SCREEN_WIDTH - 106,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderTopWidth: 1,
    borderTopColor: 'rgba(60, 60, 67, 0.36)'
  },
  network_name: {
    color: '#999999',
    fontSize: 17,
  },
  network_name_active: {
    color: '#007AFF',
    fontSize: 17,
  },
});

export default ModalLoading;
