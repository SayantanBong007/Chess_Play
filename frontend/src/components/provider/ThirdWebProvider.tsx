"use client";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const Etherlink = {
  chainId: 128123, // Chain ID of the network
  rpc: ["https://128123.rpc.thirdweb.com"],
  nativeCurrency: {
    decimals: 18,
    name: "Tezos",
    symbol: "XTZ",
  },
  shortName: "Tezos", // Display value shown in the wallet UI
  slug: "Tezos", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Etherlink", // Name of the network
  name: "Etherlink", // Name of the network
};

function ThirdWebProvider({ children }: any) {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet()]}
      activeChain={Etherlink}
      // supportedChains={[Etherlink]}
      dAppMeta={{
        name: "Chess Play",
        description: "chess Play desss",
        logoUrl: "/assests/logo.png",
        url: "",
        isDarkMode: true,
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}

export default ThirdWebProvider;
