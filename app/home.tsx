import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function Home() {
  const [count, setCount] = React.useState(0);

  return (
    <SafeAreaView>
      <Text style={{ color: "black" }}>Count: {count}</Text>
    </SafeAreaView>
  );
}
