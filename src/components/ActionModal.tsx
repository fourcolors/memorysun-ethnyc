import { gql } from "@apollo/client";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Rect } from "react-native-svg";
import { walletClient } from "../wallet";
import { RecordingButton } from "./RecordingButton";
import PhotoUploadButton from "./UploadPhotoButton";
import { usePingQuery } from "./gql/ActionModal.generated";

const screenWidth = Dimensions.get("window").width;

const CloseBar = () => (
  <Svg width="48" height="6" viewBox="0 0 48 6" fill="none">
    <Rect width="48" height="6" rx="3" fill="#3F3F46" />
  </Svg>
);

gql`
  query Ping {
    ping
  }
`;

const ActionModal = ({ visible, onClose }) => {
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = screenHeight * (2 / 3); // 2/3 of screen height
  const { loading, data, error } = usePingQuery();
  const [address, setAddress] = useState("");
  const [recording, setRecording] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    async function getAddresses() {
      const client = walletClient();
      const addr = await client.getAddresses();
      setAddress(addr[0]);
    }

    getAddresses();
  }, []);

  function handleDoneRecording(recordingURI: string) {
    console.log("recording uri", recordingURI);
    setRecording(recordingURI);

    // post ot lest etc here
  }

  function handlePhotoSelected(photoURI: string) {
    console.log("recording uri", photoURI);
    setPhoto(photoURI);
  }

  const buttons = [
    {
      id: "1",
      component: <RecordingButton onDoneRecording={handleDoneRecording} />,
    },
    {
      id: "2",
      component: <PhotoUploadButton onPhotoSelected={handlePhotoSelected} />,
    },
    // ... other buttons
  ];

  return (
    <MotiView
      from={{ translateY: modalHeight }}
      animate={{ translateY: visible ? 0 : modalHeight }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 1,
        stiffness: 400,
      }}
      style={{
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: modalHeight,
        backgroundColor: "#2E2929",
        borderRadius: 24,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -8,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 24,
      }}
    >
      <TouchableOpacity onPress={onClose}>
        <View style={{ alignItems: "center", margin: 10 }}>
          <CloseBar />
        </View>
      </TouchableOpacity>
      <View className="flex-1">
        <View className="flex-1">
          <FlatList
            style={{ flex: 1 }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={buttons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{ width: screenWidth }}
                className="flex-1 justify-center items-center "
              >
                {item.component}
              </View>
            )}
          />
        </View>
        {(recording || photo) && (
          <MotiView
            from={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <TouchableOpacity
              className=" bg-yellow-500 hover:bg-yellow-600 py-10 focus:bg-yellow-700 active:bg-yellow-100 p-3 rounded-full"
              activeOpacity={0.8}
            >
              <View className="flex items-center justify-center mb-5">
                <Text className="text-black text-xl font-semibold">
                  Post to Memory Sun
                </Text>
              </View>
            </TouchableOpacity>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
};

export default ActionModal;
