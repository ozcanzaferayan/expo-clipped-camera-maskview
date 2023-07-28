import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { Camera, CameraType } from "expo-camera";

const App = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <MaskedView
      style={{ flex: 1, flexDirection: "row", height: "100%" }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: "#000000aa",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: "red",
              borderRadius: 16,
            }}
          ></View>
        </View>
      }
    >
      <Camera style={styles.camera} type={type}></Camera>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;
