# Smart Contracts (Land Record)

This folder contains a simple LandRecord contract (written without OpenZeppelin) for a blockchain-based land records project. The contract (located in contracts/LandRecord.sol) defines a struct (LandRecordStruct) and functions (createRecord, getRecord, and getRecordCount) to manage land records.

## Prerequisites

• Node (and npm) installed  
• Ganache CLI (or Ganache GUI) running (for example, on 127.0.0.1:7545) so that Truffle can deploy the contract.

## Instructions

1. Open a terminal and cd into the smart-contracts folder (for example, “cd /Users/mehar/Desktop/BLOCKCHAIN EL/smart-contracts”).  
2. Run “npm install” (this installs Truffle (and its dependencies) as a dev dependency).  
3. Run “npx truffle compile” (this compiles the LandRecord contract (using solc 0.8.0) and produces artifacts (in build/contracts)).  
4. (Ensure that Ganache CLI (or Ganache GUI) is running (for example, on 127.0.0.1:7545) so that Truffle can deploy the contract.)  
5. Run “npx truffle migrate --network development” (this deploys the LandRecord contract (using the migration file (1_deploy_land_record.js) and the network settings (in truffle-config.js) so that the contract is deployed (and “working”) as soon as possible). 