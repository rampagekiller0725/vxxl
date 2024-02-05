import React from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../styles/mainStyles";


const Layer = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image source={require('../public/main_bg.jpg')} style={styles.bg}/>
      </View>

      {children}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  bg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default Layer;
