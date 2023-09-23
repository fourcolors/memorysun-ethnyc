import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Animated as AnimatedMap,
  AnimatedRegion,
  Region,
} from "react-native-maps";

export default function App() {
  const regionRef = useRef(
    new AnimatedRegion({
      latitude: 40.7434,
      longitude: -74.0083,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  );

  const [pressLocation, setPressLocation] = useState({ x: 0, y: 0 });

  const onRegionChange = (newRegion: Region) => {
    regionRef.current.setValue(newRegion);
  };

  // todo use the correct types
  const onLongPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // Step 3: Display animated buttons here
    // Step 4: Implement slide to select logic here
    console.log(
      `Long-pressed at latitude: ${latitude}, longitude: ${longitude}`
    );
  };

  const handleTouchStart = (e) => {
    console.log(e.nativeEvent.pageX);
    setPressLocation({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
  };

  return (
    <View style={styles.container} onTouchStart={handleTouchStart}>
      <AnimatedMap
        region={regionRef.current as any}
        onRegionChange={(newRegion) => onRegionChange(newRegion)}
        onLongPress={onLongPress}
        style={{ width: "100%", height: "100%" }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          position: "absolute",
          top: pressLocation.y,
          left: pressLocation.x,
        }}
      >
        <View style={{ backgroundColor: "green" }}>
          <Text>This is a buttotn</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
});
