import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const PhotoUploadButton = ({ onPhotoSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (image) {
      onPhotoSelected(image);
    }
  }, [image]);

  return (
    <View style={{ padding: 16, borderRadius: 12 }} className="bg-slate-600">
      <TouchableOpacity
        className="bg-gray-400"
        style={{
          height: 200,
          width: 200,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={pickImage}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <Ionicons name="camera-outline" size={32} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PhotoUploadButton;
