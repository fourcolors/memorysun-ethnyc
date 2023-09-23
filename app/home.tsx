import React from "react";
import { Text } from "react-native";

import { Stack } from "expo-router";

export default function Home() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Stack.Screen />
      <Text>Count: {count}</Text>
    </>
  );
}
