import { network } from "hardhat";

async function main() {
  // NOUVEAUTÉ HARDHAT 3 : On ouvre explicitement la connexion réseau pour obtenir ethers
  const { ethers } = await network.connect();

  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec le compte :", deployer.address);

  // 1. Déploiement du Mock USDC
  console.log("Déploiement de MockUSDC...");
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  console.log("✅ MockUSDC déployé à :", usdcAddress);

  // 2. Déploiement de la Factory
  console.log("Déploiement de HPIVFactory...");
  const HPIVFactory = await ethers.getContractFactory("HPIVFactory");
  const factory = await HPIVFactory.deploy();
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("✅ HPIVFactory déployée à :", factoryAddress);

  console.log("\n--- RÉSUMÉ POUR LE FRONTEND ---");
  console.log(`FACTORY_ADDRESS_LIVE: "${factoryAddress}"`);
  console.log(`USDC_SEPOLIA_ADDRESS: "${usdcAddress}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
