import { gql } from "@apollo/client";
import { MotiView, Text } from "moti";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Rect } from "react-native-svg";
import { walletClient } from "../wallet";
import { usePingQuery } from "./gql/ActionModal.generated";

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

  useEffect(() => {
    async function getAddresses() {
      const client = walletClient();
      const addr = await client.getAddresses();
      setAddress(addr[0]);
    }

    getAddresses();
  }, []);

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
        <View>
          <Text>{data.ping}</Text>
          <Text>address: {address}</Text>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

export default ActionModal;
