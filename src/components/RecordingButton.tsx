import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

export const RecordingButton = ({ onDoneRecording }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [audioURI, setAudioURI] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingSounds, setPlayingSounds] = useState(false);

  const [showPlayback, setShowPlayback] = useState<boolean>(false);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }).start();

      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowPlayback(true);
    setAudioURI(uri);
    onDoneRecording(uri);
    console.log("Recording stopped and stored at", uri);
  }

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const playSound = async () => {
    if (playingSounds) {
      setPlayingSounds(false);
      sound.stopAsync();
      return;
    }

    console.log("uir", audioURI);
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: audioURI || "",
    });
    setSound(newSound);
    await newSound.playAsync();
    setPlayingSounds(true);
  };

  const cancelRecording = () => {
    setAudioURI(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {showPlayback ? (
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            onPress={playSound}
            className="bg-green-700"
            style={{
              borderRadius: 50,
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {playingSounds ? (
              <Ionicons name="stop" size={32} color="white" />
            ) : (
              <Ionicons name="play" size={32} color="white" />
            )}
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            onPressIn={startRecording}
            onPressOut={stopRecording}
            className="bg-red-700"
            style={{
              borderRadius: 50,
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="mic" size={32} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};
