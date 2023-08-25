const { ethers } = require("hardhat");

let main = async () => {
  DriveFactory = await ethers.getContractFactory("MyDrive");
  Drive = await DriveFactory.deploy();

  console.log(await Drive.getAddress());
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
  });
