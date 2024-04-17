"use client";

import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { FaLandmark } from "react-icons/fa";
import { FaChessKing } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";

function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/match/")) {
    return <></>;
  }
  return (
    <div className="glassmorphism-bg bg_gradient_navbar w-full flex justify-between px-20 py-4">
      <span
        onClick={() => router.push("/")}
        className=" cursor-pointer flex items-center justify-center gap-4"
      >
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="Picture of the author"
        />
        <h1 className="text-2xl text-text-color ">Chess Play</h1>
      </span>
      <span className="flex items-center justify-center gap-4">
        <h1 className="basic_btn_3" onClick={() => router.push("/profile")}>
          <FaChessKing />
          Profile
        </h1>

        <h1 className="basic_btn_3" onClick={() => router.push("/marketplace")}>
          <SiBlockchaindotcom />
          Marketplace
        </h1>

        <ConnectWallet theme="light"  />
      </span>
    </div>
  );
}

export default Navigation;
