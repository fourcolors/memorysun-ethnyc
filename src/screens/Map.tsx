import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Animated as AnimatedMap,
  AnimatedRegion,
  Marker,
  Region,
} from "react-native-maps";
import ActionModal from "../components/ActionModal";

export default function Map() {
  const regionRef = useRef(
    new AnimatedRegion({
      latitude: 40.7434,
      longitude: -74.0083,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  );

  const mapRef = useRef(null);

  const [pressLocation, setPressLocation] = useState({ x: 0, y: 0 });
  const [showAddButton, setShowAddButton] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onRegionChange = (newRegion: Region) => {
    regionRef.current.setValue(newRegion);
  };

  const onLongPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoordinate({ latitude, longitude });

    // Update the region to zoom in
    // Define the zoom level and offset for latitude
    const latitudeDelta = 0.005;
    const longitudeDelta = 0.005;
    const offset = latitudeDelta / 2;

    const newRegion = {
      latitude: latitude - offset, // Offset the latitude so the marker appears in the top 1/3 of the screen
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 2000); // 2000 ms animation duration
    }

    setShowModal(true); // Show the ActionModal
  };

  const handleTouchStart = (e) => {
    setPressLocation({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
  };

  return (
    <View style={styles.container} onTouchStart={handleTouchStart}>
      <AnimatedMap
        ref={mapRef}
        showsUserLocation
        region={regionRef.current as any}
        onRegionChange={onRegionChange}
        onLongPress={onLongPress}
        style={{ width: "100%", height: "100%" }}
      >
        {markerCoordinate && <Marker coordinate={markerCoordinate} />}
      </AnimatedMap>

      <ActionModal
        visible={showModal}
        onClose={() => {
          setMarkerCoordinate(null);
          setShowModal(false);
        }}
      />
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

/* <AnimatePresence>
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
      </AnimatePresence> */
