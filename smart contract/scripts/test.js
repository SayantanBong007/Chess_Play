import { ethers } from "ethers";
import { abi } from "../artifacts/contracts/ChessPlayCore.sol/ChessPlayCore.json";

const provider = new ethers.providers.JsonRpcProvider("https://128123.rpc.thirdweb.com");

const signer = new ethers.Wallet('231470531281029c7ff44196b913bcc6ab62ab6a04ccebcdc99366cf031be0c8', provider);

const contractAddress = "0x3e4f44C8b1b971D424BE3E9d9cDB628c061F6C76";

const contract = new ethers.Contract(contractAddress, abi, signer);

const test = async () => {
    console.log(await contract.createMatch("1", "0x1234", 100000000000));
}


