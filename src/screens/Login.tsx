import { LoginWithLensButton } from "@/components/LoginWithLensButton";
import { useAuthStorage } from "@/store/authStore";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { SafeAreaView } from "moti";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Address, createPublicClient, createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";
import WCLogo from "../../assets/wc-logo.png";

const WalletConnectButton = ({ onConnect }) => {
  return (
    <View className="flex flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={onConnect}
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800 p-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
      >
        <Image style={{ width: 50, height: 50, margin: 20 }} source={WCLogo} />
        <Text className="text-white text-lg font-bold">Connect Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Login() {
  const client = useAuthStorage((state) => state.client);
  const setClient = useAuthStorage((state) => state.setClient);
  const setAddress = useAuthStorage((state) => state.setAddress);

  const publicClient = useAuthStorage((state) => state.publicClient);
  const setPublicClient = useAuthStorage((state) => state.setPublicClient);

  const { isOpen, open, close, provider, isConnected, address } =
    useWalletConnectModal();

  const onConnect = () => {
    return open();
  };

  // Init viem when the wallet is connected
  useEffect(() => {
    if (isConnected && provider) {
      const _client = createWalletClient({
        chain: polygonMumbai,
        transport: custom(provider),
      });

      const _publicClient = createPublicClient({
        chain: polygonMumbai,
        transport: custom(provider),
      });

      setClient(_client);
      setPublicClient(_publicClient);
      setAddress(address as Address);
      console.log("everything is connected with the wallet");
    }
  }, [isConnected, provider]);

  return (
    <SafeAreaView className="flex-1">
      {false ? (
        <LoginWithLensButton />
      ) : (
        <WalletConnectButton onConnect={onConnect} />
      )}
    </SafeAreaView>
  );
}
