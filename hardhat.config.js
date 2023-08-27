require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
  networks: {
    sepolia: {
      url: `${process.env.SEPOLIA_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
