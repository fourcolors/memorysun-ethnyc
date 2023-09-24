import { MotiView } from "moti";
import React from "react";
import { Dimensions, Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Rect } from "react-native-svg";
import P60 from "../../assets/ethnyc.jpeg";

const screenWidth = Dimensions.get("window").width;

const CloseBar = () => (
  <Svg width="48" height="6" viewBox="0 0 48 6" fill="none">
    <Rect width="48" height="6" rx="3" fill="#3F3F46" />
  </Svg>
);

const MemoryModal = ({ visible, onClose, memory }) => {
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = screenHeight * (2 / 3); // 2/3 of screen height

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
      <>
        <TouchableOpacity onPress={onClose}>
          <View style={{ alignItems: "center", margin: 10 }}>
            <CloseBar />
          </View>
        </TouchableOpacity>
        <View className="p-5" style={{ flex: 1 }}>
          <View className="m-5 bg-white rounded-2xl overflow-hidden">
            {memory && memory.contentType === "image" && (
              <Image source={P60} style={{ width: "100%", height: 300 }} />
            )}
          </View>
          <View className="m-5">
            <View className="bg-gray-100 rounded-lg p-3 w-full self-start">
              <Text className="text-gray-700">
                This event was amazing! EthNYC rocks! Can't wait until the next
                one
              </Text>
            </View>

            <TextInput
              className="text-white placeholder-white mt-3"
              style={{
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 8,
                paddingLeft: 10,
                height: 40,
              }}
              placeholder="Add a comment..."
            />
          </View>
        </View>
      </>
    </MotiView>
  );
};

export default MemoryModal;
