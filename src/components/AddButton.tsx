import { View } from "moti";
import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

const styles = {
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  plusText: {
    color: "white",
    fontSize: 32,
  },
};

export const AddButton = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
      <View
        from={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        exitTransition={{
          type: "timing",
          duration: 2500,
        }}
      >
        <Text style={styles.plusText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
