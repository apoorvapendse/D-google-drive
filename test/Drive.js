const { ethers } = require("hardhat");
const { expect } = require("chai");
describe("Running Tests", () => {
  let DriveFactory, Drive;

  beforeEach(async function () {
    DriveFactory = await ethers.getContractFactory("MyDrive");
    Drive = await DriveFactory.deploy();
    [owner, person1, person2, person3, person4, ...addrs] =
      await ethers.getSigners();
  });

  it("should add users to access array", async () => {
    await Drive.addAccess(person1.address);
    await Drive.addAccess(person2.address);

    let ownerArray = await Drive.connect(owner).getSharedOwners();
    console.log("owner array:", ownerArray);
    expect(ownerArray[0].userAddress).to.equal(person1.address);
    expect(ownerArray[0].access).to.equal(true);
    expect(ownerArray[1].userAddress).to.equal(person2.address);
    expect(ownerArray[1].access).to.equal(true);
  });
  it("should revoke access properly by setting access prop as false", async () => {
    await Drive.addAccess(person1.address);
    await Drive.addAccess(person2.address);
    await Drive.revokeAccess(person1.address);

    let ownerArray = await Drive.connect(owner).getSharedOwners();
    expect(ownerArray[0].access).to.equal(false);
    expect(ownerArray[1].access).to.equal(true);
    await Drive.addAccess(person1.address);
    await Drive.addAccess(person3.address);

    ownerArray = await Drive.connect(owner).getSharedOwners();
    expect(ownerArray[0].access).to.equal(true);
    expect(ownerArray[1].access).to.equal(true);
    expect(ownerArray[2].userAddress).to.equal(person3.address);
  });
});
