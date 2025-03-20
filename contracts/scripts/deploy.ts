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

    let envData = "";

    for (const contractName of contractNames) {
        const Contract = await ethers.getContractFactory(contractName);
        const contract = await Contract.deploy();
        await contract.deployed();

        console.log(`${contractName} deployed at: ${contract.address}`);
        envData += `${contractName.toUpperCase()}_ADDRESS=${contract.address}\n`;
    }

    // Write contract addresses to .env file
    fs.writeFileSync(".env", envData);
    console.log("\n✅ All contract addresses saved to .env!");
}

// Run deployment
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
