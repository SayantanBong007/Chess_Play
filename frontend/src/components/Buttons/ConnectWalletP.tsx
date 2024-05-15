import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectWalletComponentP = () => {
  return (
    <div>
      <ConnectWallet
        btnTitle="Connect Wallet To See Profile"
        theme="dark"
        className="px-8 py-4 text-lg"
      />
    </div>
  );
};

export default ConnectWalletComponentP;
