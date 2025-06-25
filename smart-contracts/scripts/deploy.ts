import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LandRecord contract...");

  const LandRecord = await ethers.getContractFactory("LandRecord");
  const landRecord = await LandRecord.deploy();

  await landRecord.deployed();

  console.log("LandRecord contract deployed to:", landRecord.address);
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 