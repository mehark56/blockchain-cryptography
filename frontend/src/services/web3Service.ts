import { ethers } from 'ethers';
import LandRecordABI from '../contracts/LandRecord.json';

// Contract address from environment variable
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0xEe6679dAAd498314D9CB9cD7B4F7F60d0258C0A9';

class Web3Service {
  private provider: ethers.JsonRpcProvider | ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private wallet: ethers.Wallet | null = null;

  async initialize() {
    try {
      // Check if Frame is running
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please start Frame to use this application');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create provider and signer
      this.provider = new ethers.BrowserProvider(window.ethereum as any);
      if (this.provider instanceof ethers.BrowserProvider) {
        this.signer = await this.provider.getSigner();
      }

      // Create contract instance
      if (this.signer) {
        this.contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          LandRecordABI.abi,
          this.signer
        );
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize Web3:', error);
      throw error;
    }
  }

  async initializeWithPrivateKey(privateKey: string) {
    try {
      // Create a provider using Ganache's default URL
      this.provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
      
      // Create wallet from private key
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      this.signer = this.wallet;

      // Create contract instance
      if (this.signer) {
        this.contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          LandRecordABI.abi,
          this.signer
        );
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize Web3 with private key:', error);
      throw error;
    }
  }

  async getAdminAddress(): Promise<string> {
    if (!this.provider || !(this.provider instanceof ethers.JsonRpcProvider)) {
      throw new Error('Provider not initialized or not a JsonRpcProvider');
    }
    const accounts = await this.provider.listAccounts();
    return accounts[0].toString();
  }

  disconnect() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.wallet = null;
  }

  async getContract() {
    if (!this.contract) {
      await this.initialize();
    }
    return this.contract;
  }

  async getSignerAddress(): Promise<string> {
    if (!this.signer) {
      await this.initialize();
    }
    return await this.signer!.getAddress();
  }

  // Land Record Contract Methods
  async createLandRecord(documentHash: string, ownerAddress: string) {
    try {
      const contract = await this.getContract();
      const tx = await contract!.createRecord(documentHash, ownerAddress);
      return await tx.wait();
    } catch (error) {
      console.error('Error creating land record:', error);
      throw error;
    }
  }

  async signRecord(recordId: number, signature: string) {
    try {
      const contract = await this.getContract();
      const tx = await contract!.signRecord(recordId, signature);
      return await tx.wait();
    } catch (error) {
      console.error('Error signing record:', error);
      throw error;
    }
  }

  async getSignature(recordId: number) {
    try {
      const contract = await this.getContract();
      return await contract!.getSignature(recordId);
    } catch (error) {
      console.error('Error getting signature:', error);
      throw error;
    }
  }

  async verifySignature(recordId: number, messageHash: string, signature: string) {
    try {
      const contract = await this.getContract();
      return await contract!.verifySignature(recordId, messageHash, signature);
    } catch (error) {
      console.error('Error verifying signature:', error);
      throw error;
    }
  }

  async verifyRecord(recordId: number, messageHash: string, signature: string) {
    try {
      const contract = await this.getContract();
      const tx = await contract!.verifyRecord(recordId, messageHash, signature);
      return await tx.wait();
    } catch (error) {
      console.error('Error verifying record:', error);
      throw error;
    }
  }

  async getLandRecord(id: number) {
    try {
      const contract = await this.getContract();
      const record = await contract!.getLandRecord(id);
      return {
        id: record.id,
        documentHash: record.documentHash,
        ownerSignature: record.ownerSignature,
        owner: record.owner,
        timestamp: new Date(Number(record.timestamp) * 1000).toISOString(),
        isVerified: record.isVerified,
        metadata: record.metadata,
      };
    } catch (error) {
      console.error('Error getting land record:', error);
      throw error;
    }
  }

  async getAllLandRecords() {
    try {
      const contract = await this.getContract();
      const recordCount = await contract!.getRecordCount();
      const records = [];

      for (let i = 0; i < recordCount; i++) {
        const record = await this.getLandRecord(i);
        records.push(record);
      }

      return records;
    } catch (error) {
      console.error('Error getting all land records:', error);
      throw error;
    }
  }

  async verifyLandRecord(id: number) {
    try {
      const contract = await this.getContract();
      const tx = await contract!.verifyLandRecord(id);
      return await tx.wait();
    } catch (error) {
      console.error('Error verifying land record:', error);
      throw error;
    }
  }

  async transferOwnership(id: number, newOwner: string) {
    try {
      const contract = await this.getContract();
      const tx = await contract!.transferOwnership(id, newOwner);
      return await tx.wait();
    } catch (error) {
      console.error('Error transferring ownership:', error);
      throw error;
    }
  }

  // Event Listeners
  onLandRecordCreated(callback: (record: any) => void) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    this.contract.on('LandRecordCreated', (id, documentHash, owner, timestamp, event) => {
      callback({
        id: id.toString(),
        documentHash,
        owner,
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        transactionHash: event.transactionHash,
      });
    });
  }

  onOwnershipTransferred(callback: (record: any) => void) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    this.contract.on('OwnershipTransferred', (id, previousOwner, newOwner, event) => {
      callback({
        id: id.toString(),
        previousOwner,
        newOwner,
        transactionHash: event.transactionHash,
      });
    });
  }

  onLandRecordVerified(callback: (record: any) => void) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    this.contract.on('LandRecordVerified', (id, verifier, timestamp, event) => {
      callback({
        id: id.toString(),
        verifier,
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        transactionHash: event.transactionHash,
      });
    });
  }
}

// Create a singleton instance
const web3Service = new Web3Service();
export default web3Service; 