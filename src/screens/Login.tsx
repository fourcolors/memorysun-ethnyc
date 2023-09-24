
  import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { SafeAreaView, Text, View } from "moti";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createPublicClient, createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";

export default function Login() {

const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

const [client, setClient] = useState<any>();
const [publicClient, setPublicClient] = useState<any>();

const onConnect = () => {
  if (isConnected) {
    console.log('isConnected', provider)
    return provider?.disconnect();
  }
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
    }
  }, [isConnected, provider]);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={onConnect}>
        <View style={{backgroundColor: 'lightblue', width: 200}}><Text>Login with wallet connect</Text></View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
