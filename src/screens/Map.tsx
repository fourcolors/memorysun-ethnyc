import MemoryModal from "@/components/MemoryModal";
import { useMarkerStorage } from "@/store/appStore";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Animated as AnimatedMap,
  AnimatedRegion,
  Marker,
  Region,
} from "react-native-maps";
import ActionModal from "../components/ActionModal";

// interface ICoordinate {
//   latitude: number;
//   longitude: number;
// }

// interface IMarkerData {
//   coordinate: ICoordinate;
//   contentType: "image" | "audio";
//   contentUrl: string;
// }

// const markerData: IMarkerData[] = [
//   {
//     coordinate: { latitude: 40.765090592441226, longitude: -74.00127220343919 },
//     contentType: "image",
//     contentUrl: "https://example.com/image.jpg",
//   },
//   {
//     coordinate: { latitude: 40.73724035334979, longitude: -74.01048585126827 },
//     contentType: "audio",
//     contentUrl: "https://example.com/audio.m4a",
//   },
//   {
//     coordinate: { latitude: 40.71271668840441, longitude: -74.01226299151534 },
//     contentType: "image",
//     contentUrl: "https://example.com/another-image.jpg",
//   },
// ];

export default function Map() {
  const markers = useMarkerStorage((state) => state.markers);
  const addMarker = useMarkerStorage((state) => state.addMarker);
  const [pressLocation, setPressLocation] = useState({ x: 0, y: 0 });
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [currentMemory, setCurrentMemory] = useState();

  const regionRef = useRef(
    new AnimatedRegion({
      latitude: 40.7434,
      longitude: -74.0083,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  );

  const mapRef = useRef(null);

  useEffect(() => {
    const coordinates = markers.map((data) => data.coordinate);
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }, [markers]);

  const onRegionChange = (newRegion: Region) => {
    regionRef.current.setValue(newRegion);
  };

  const onLongPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log("lat:", latitude, "long:", longitude);
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

  function handleOpenMemory(marker) {
    setCurrentMemory(marker);
  }

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

        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            onPress={() => {
              setCurrentMemory(marker);
              setShowMemoryModal(true);
            }}
          />
        ))}
      </AnimatedMap>

      <ActionModal
        onSave={({
          contentType,
          contentUrl,
        }: {
          contentType: "image" | "audio";
          contentUrl: string;
        }) => {
          addMarker({
            contentType,
            contentUrl,
            coordinate: markerCoordinate,
          });
        }}
        visible={showModal}
        onClose={() => {
          setMarkerCoordinate(null);
          setShowModal(false);
        }}
      />

      <MemoryModal
        memory={currentMemory}
        visible={showMemoryModal}
        onClose={() => {
          setShowMemoryModal(false);
          setCurrentMemory(null);
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
