import { gql } from "@apollo/client";
import { Text, TouchableOpacity } from "react-native";
gql`
  query Verify($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      id
      text
    }
  }
`;

gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export function LoginWithLensButton() {
  function handleLensLogin() {
    console.log("handing lens longin");
  }

  return (
    <TouchableOpacity
      className="bg-[#C3E4CD] rounded-3xlxl"
      onPress={handleLensLogin}
    >
      <Text style={{ fontFamily: "GrintoWide" }} className="text-[#7D8B7C]">
        Login with Lens
      </Text>
    </TouchableOpacity>
  );
}
