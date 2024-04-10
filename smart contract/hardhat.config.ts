import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  solidity: "0.8.12",
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: ['231470531281029c7ff44196b913bcc6ab62ab6a04ccebcdc99366cf031be0c8'],
    },
    sphinx: {
      url: "https://sphinx.shardeum.org/",
      chainId: 8082,
      accounts: ['231470531281029c7ff44196b913bcc6ab62ab6a04ccebcdc99366cf031be0c8'],
    },
  }
};

export default config;
