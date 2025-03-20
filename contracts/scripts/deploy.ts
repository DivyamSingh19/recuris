import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import * as fs from "fs-extra";

dotenv.config();

async function main() {
  const contractNames: string[] = [
    "DiagnosticControl",
    "DoctorManagement",
    "Lock",
    "MedAccessControl",
    "Migrations",
    "MultiSigAccess",
    "PatientManagement",
    "PrescriptionControl"
  ];

  
  let existingEnvData = "";
  try {
    existingEnvData = fs.readFileSync(".env", "utf8");
  } catch (error) {
   
  }

  let newEnvData = "";

  for (const contractName of contractNames) {
    try {
      const Contract = await ethers.getContractFactory(contractName);
      const contract = await Contract.deploy();
      await contract.waitForDeployment();  

       
      const address = await contract.getAddress();
      
      console.log(`${contractName} deployed at: ${address}`);
      newEnvData += `${contractName.toUpperCase()}_ADDRESS=${address}\n`;
    } catch (error) {
      console.error(`Error deploying ${contractName}:`, error);
      throw error;  
    }
  }

 
  const updatedEnvData = existingEnvData + "\n" + newEnvData;
  
  fs.writeFileSync(".env", updatedEnvData);
  console.log("\n✅ All contract addresses saved to .env!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });