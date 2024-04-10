import { ethers } from "hardhat";

async function main() {
  const ChessPlayCore = await ethers.deployContract("ChessPlayCore");
  await ChessPlayCore.waitForDeployment();

  console.log(`Contarct deployed to: ${ChessPlayCore.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
