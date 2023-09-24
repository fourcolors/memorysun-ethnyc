import { Text, TouchableOpacity } from "react-native";

export function LoginWithLensButton() {
  function handleLensLogin() {
    console.log("handing lens longin");
  }

  return (
    <TouchableOpacity className="" onPress={handleLensLogin}>
      <Text>Login with Lens</Text>
    </TouchableOpacity>
  );
}
