import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectWalletComponent = () => {
  return (
    <div className="p-1 bg-cyan-500 rounded-lg hover:bg-white">
      <ConnectWallet className="basic_btn_3 bg-cyan-500 border-none hover:bg-white" />
    </div>
  );
};

export default ConnectWalletComponent;
