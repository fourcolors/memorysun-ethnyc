import { AnimatePresence } from "moti";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Animated as AnimatedMap,
  AnimatedRegion,
  Region,
} from "react-native-maps";
import { default as CirclePlusButton } from "../components/AddButton";

export default function Map() {
  const regionRef = useRef(
    new AnimatedRegion({
      latitude: 40.7434,
      longitude: -74.0083,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  );

  const [pressLocation, setPressLocation] = useState({ x: 0, y: 0 });
  const [showAddButton, setShowAddButton] = useState<boolean>(false);

  const onRegionChange = (newRegion: Region) => {
    regionRef.current.setValue(newRegion);
  };

  // todo use the correct types
  const onLongPress = (e: any) => {
    setShowAddButton(true);
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

  // const handleOnTouchend = (e) => {
  //   setShowAddButton(false);
  // };

  return (
    <View
      style={styles.container}
      onTouchStart={handleTouchStart}
      // onTouchEnd={handleOnTouchend}
    >
      <AnimatedMap
        showsUserLocation
        region={regionRef.current as any}
        onRegionChange={(newRegion) => onRegionChange(newRegion)}
        onLongPress={onLongPress}
        style={{ width: "100%", height: "100%" }}
      />

      <AnimatePresence>
        {showAddButton && (
          <View
            style={{
              position: "absolute",
              top: pressLocation.y - 25,
              left: pressLocation.x - 25,
            }}
          >
            <CirclePlusButton handlePress={() => console.log("pressed")} />
          </View>
        )}
      </AnimatePresence>
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
