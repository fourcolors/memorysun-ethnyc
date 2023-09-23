import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";

export function walletClient() {
  const account = privateKeyToAccount(
    "0x4bbe7288942c939907b14f1f18748afa8a26364e39b9834948c907991d9c4369"
  );

  const client = createWalletClient({
    account,
    chain: polygonMumbai,
    transport: http(),
  });

  return client;
}
