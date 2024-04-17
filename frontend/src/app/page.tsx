"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

import { ConnectWallet } from "@thirdweb-dev/react";
import CreateMatch from "@/components/Match/CreateMatch";
import JoinMatch from "@/components/Match/JoinMatch";

export default function Home() {
  const address = useAddress();

  return (
    <section className="page_section flex">
      <div className="flex-1 flex_center ">
        <Image src="/logo.png" width={600} height={600} alt="logo" />
      </div>
      <div className="flex-1 flex_center text-text-color ">
        <h1 className="text-6xl font-bold primary_gradient pb-3">
          Welcome to Chess Play
        </h1>
        <p className="text-center mb-4 mt-1 font-semibold">
          Your Moves, Forever Captured.
        </p>

        <p className="w-[80%] text-center text-lg mb-8 chess-font ">
          Revolutionize chess with blockchain technology. Stake tokens,
          challenge global players, and immortalize every move as an NFT.
          Collect, trade, and showcase your unique strategies. Join the future
          of gaming now!
        </p>

        {address ? (
          <div className="flex flex-col gap-4 ">
            <CreateMatch />
            <JoinMatch />
          </div>
        ) : (
          <>
            <ConnectWallet
              btnTitle="Connect Wallet To Play"
              theme="light"
              className="px-8 py-4 text-lg"
            />
          </>
        )}
      </div>
    </section>
  );
}
