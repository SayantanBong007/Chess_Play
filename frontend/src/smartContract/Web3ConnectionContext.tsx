"use client";

import React, { createContext, useEffect, useState } from "react";
import {
  ChessChainGameplayContract,
  MatchResultEnum,
} from "@/smartContract/networkDetails";
import {
  useAddress, useStorage
} from '@thirdweb-dev/react';
import ChessChainGameplay from "@/smartContract/ChessPlayCore.json";
import { ethers } from "ethers";

interface ContextProps {
  address: string | undefined;
  storage: any;
  createMatch: (matchId: string, stakeAmount: number) => Promise<boolean>;
  joinMatch: (matchId: string, stakeAmount: number) => Promise<boolean>;
  endMatch: (
    matchId: string,
    matchDataURI: string,
    matchNftURI: string,
    gameResult: MatchResultEnum
  ) => Promise<boolean>;
  getMatchDetailOf: (matchId: string) => any;
  getUserNftBalance: () => any;
  getTokenUriFromTokenId: (tokenId: number) => Promise<string>;
  connectWallet: () => Promise<void>;
  getBalance: () => Promise<string>;
}

export const Web3ConnectionContext = createContext<ContextProps>({
  address: "",
  storage: '',
  createMatch: async (matchId: string, stakeAmount: number) => false,
  joinMatch: async (matchId: string, stakeAmount: number) => false,
  endMatch: async (
    matchId: string,
    matchDataURI: string,
    matchNftURI: string,
    gameResult: MatchResultEnum
  ) => false,
  getMatchDetailOf: (matchId: string) => {},
  getUserNftBalance: () => {},
  getTokenUriFromTokenId: async (tokenId: number) => "",
  connectWallet: async () => {},
  getBalance: async () => "",
});

const Web3ConnectionWrapper = ({ children }: any) => {
  const storage = useStorage();
  const [address, setAddress] = useState<string | undefined>(undefined);
  const addressFromHook = useAddress();
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const setupProvider = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1f41b4" }], // Hexadecimal value of 128123, the custom chain ID
          });
        } catch (switchError) {
          // Assuming switchError is of type any to bypass TypeScript error
          if ((switchError as any).code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x1F47B",
                    chainName: "Etherlink Testnet",
                    nativeCurrency: {
                      name: "Tezos",
                      symbol: "XZT",
                      decimals: 18,
                    },
                    rpcUrls: ["https://node.ghostnet.etherlink.com"],
                    blockExplorerUrls: ["https://testnet-explorer.etherlink.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding custom chain:", addError);
            }
          } else {
            console.error("Error switching to custom chain:", switchError);
          }
        }
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
      }
    };
    setupProvider();
  }, []);

  useEffect(() => {
    if (addressFromHook) {
      setAddress(addressFromHook);
    }
  }, [addressFromHook]);

  const signer = provider?.getSigner();

  async function getContract() {
    if (!signer) throw new Error("Signer not initialized");
    const contract = new ethers.Contract(
      ChessChainGameplayContract,
      ChessChainGameplay.abi,
      signer
    );
    return contract;
  }

  async function createMatch(
    matchId: string,
    stakeAmount: number
  ): Promise<boolean> {
    try {
      const contract = await getContract();
      console.log(contract);
      const tx = await contract.createMatch(
        matchId,
        address,
        String(stakeAmount),
        {value: String(stakeAmount)}
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.log("createMatch error", error);
      return false;
    }
  }

  async function joinMatch(
    matchId: string,
    stakeAmount: number
  ): Promise<boolean> {
    try {
      const contract = await getContract();
      const tx = await contract.joinMatch(
        matchId,
        address,
        {value: String(stakeAmount)}
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.log("joinMatch error", error);
      return false;
    }
  }

  async function endMatch(
    matchId: string,
    matchDataURI: string,
    matchNftURI: string,
    gameResult: MatchResultEnum
  ): Promise<boolean> {
    try {
      const contract = await getContract();
      const tx = await contract.endMatch(
        matchId,
        matchDataURI,
        matchNftURI,
        gameResult
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.log("endMatch error", error);
      return false;
    }
  }

  async function getMatchDetailOf(matchId: string): Promise<any> {
    try {
      const contract = await getContract();
      const details = await contract.matchDetailOf(matchId);
      return details;
    } catch (error) {
      console.log("getMatchDetailOf error", error);
      return false;
    }
  }

  async function getUserNftBalance(): Promise<any> {
    try {
      const contract = await getContract();
      const balance = await contract.balanceOf(address);
      return balance;
    } catch (error) {
      console.log("getUserNftBalance error", error);
      return false;
    }
  }

  async function getTokenUriFromTokenId(tokenId: number): Promise<string> {
    try {
      const contract = await getContract();
      const tokenUri = await contract.tokenURI(tokenId);
      return tokenUri;
    } catch (error) {
      console.error("getTokenUriFromTokenId error", error);
      return "";
    }
  }

  async function connectWallet(): Promise<void> {
    try {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1f41b4" }], // Hexadecimal value of 128123, the custom chain ID
          });
        } catch (switchError) {
          // Assuming switchError is of type any to bypass TypeScript error
          if ((switchError as any).code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x1F47B",
                    chainName: "Etherlink Testnet",
                    nativeCurrency: {
                      name: "Tezos",
                      symbol: "XZT",
                      decimals: 18,
                    },
                    rpcUrls: ["https://node.ghostnet.etherlink.com"],
                    blockExplorerUrls: ["https://testnet-explorer.etherlink.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding custom chain:", addError);
            }
          } else {
            console.error("Error switching to custom chain:", switchError);
          }
        }
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  async function getBalance() {
    if (address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    }
    return "0";
  }

  return (
    <Web3ConnectionContext.Provider
      value={{
        address,
        storage,
        createMatch,
        joinMatch,
        endMatch,
        getMatchDetailOf,
        getUserNftBalance,
        getTokenUriFromTokenId,
        connectWallet,
        getBalance
      }}
    >
      {children}
    </Web3ConnectionContext.Provider>
  );
};

export default Web3ConnectionWrapper;