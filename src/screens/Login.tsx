import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { SafeAreaView } from "moti";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createPublicClient, createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";

const WalletConnectButton = ({ onConnect }) => {
  return (
    <View className="flex flex-1 items-center justify-center ">
      <TouchableOpacity
        onPress={onConnect}
        className="flex items-center justify-center bg-blue-500 p-4 rounded-lg"
      >
        <Text className="text-white text-lg">Connect Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Login() {
  const { isOpen, open, close, provider, isConnected, address } =
    useWalletConnectModal();

  const [client, setClient] = useState<any>();
  const [publicClient, setPublicClient] = useState<any>();

  const onConnect = () => {
    if (isConnected) {
      console.log("isConnected", provider);
      provider?.disconnect();
    }
    return open();
  };

  // Init viem when the wallet is connected
  useEffect(() => {
    if (isConnected && provider) {
      console.log("this is getting called at lot");
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
    }
  }, [isConnected, provider]);

  return (
    <SafeAreaView className="flex-1">
      {!isConnected && <WalletConnectButton onConnect={onConnect} />}
    </SafeAreaView>
  );
}
