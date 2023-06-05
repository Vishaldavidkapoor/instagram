import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })()
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  if(hasPermission === null){
    return <Text>Hi</Text>;
  }
  if(hasPermission === false){
    return <Text>No access</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.fixedRatio} type={type} ratio={'1:1'} />
      </View>
        <Button
          title="Flip camera"
          style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
          onPress={toggleCameraType}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  fixedRatio :{
    flex:1,
    aspectRatio:1
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
