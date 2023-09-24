import { useAuthStorage } from "@/store/authStore";
import { AuthChallengeResult, SignedAuthChallenge } from "@/types";
import { gql } from "@apollo/client";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LensLogo from "../../assets/lens-logo.png";
import {
  useAuthenticateMutation,
  useChallengeLazyQuery,
  useProfilesLazyQuery,
} from "./gql/LoginWithLensButton.generated";
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

gql`
  query Profiles($request: ProfilesRequest!) {
    profiles(request: $request) {
      items {
        id
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;

export function LoginWithLensButton() {
  const address = useAuthStorage((state) => state.address);
  const client = useAuthStorage((state) => state.client);
  const setToken = useAuthStorage((state) => state.setToken);
  const setRefreshToken = useAuthStorage((state) => state.setRefreshToken);

  const [getProfiles, { data: profilesData, loading: profilesLoading }] =
    useProfilesLazyQuery();
  const [getChallenge, { data: challengeData, loading: challengeLoading }] =
    useChallengeLazyQuery();

  const [
    authenticate,
    { data: authenticateData, loading: authenticateLoading },
  ] = useAuthenticateMutation();

  async function handleLensLogin() {
    await getProfiles({
      variables: {
        request: {
          where: {
            ownedBy: address as any, // this is totally a bug eh?
          },
        },
      },
    });
  }

  useEffect(() => {
    if (!profilesLoading && profilesData) {
      console.log("Getting challenge");
      const profileId = profilesData.profiles.items[0]?.id;
      getChallenge({
        variables: { request: { signedBy: address, for: profileId } },
      });
    }
  }, [profilesLoading, profilesData]);

  useEffect(() => {
    async function signAndAuthenticate(challenge: AuthChallengeResult) {
      console.log("Signing and authentincating", { challenge });

      try {
        const signature: SignedAuthChallenge = await client.signMessage({
          account: address,
          message: challenge.text,
        });

        console.log("sig", signature);
        console.log("address", address);

        const { data } = await authenticate({
          variables: {
            request: {
              id: challenge.id,
              signature,
            },
          },
        });
        // set things if this works
        setRefreshToken(data.authenticate.refreshToken);
        setToken(data.authenticate.accessToken);

        console.log("authenication data", { data });
      } catch (e) {
        console.log("Error", e);
      }
    }

    if (!challengeLoading && challengeData) {
      const challenge = challengeData.challenge;

      signAndAuthenticate(challenge);
    }
  }, [challengeLoading, challengeData]);

  useEffect(() => {
    if (authenticateData && !authenticateLoading) {
      setToken(authenticateData.authenticate.accessToken);
      setRefreshToken(authenticateData.authenticate.refreshToken);

      console.log("Authenication data", authenticateData);
    }
  }, [authenticateData, authenticateLoading]);

  return (
    <View className="flex flex-1 items-center justify-center">
      <TouchableOpacity
        className="flex items-center justify-center bg-[#C3E4CD] rounded-3xl py-6 px-6 shadow-lg transition duration-300 ease-in-out hover:bg-[#AED4BC] focus:bg-[#99C4AB] active:bg-[#82B49A]"
        onPress={handleLensLogin}
      >
        <Image source={LensLogo} />
        <Text
          style={{ fontFamily: "GrintoWide" }}
          className="text-black font-bold text-xl"
        >
          Login with Lens
        </Text>
      </TouchableOpacity>
    </View>
  );
}
