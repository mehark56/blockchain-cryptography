import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = '0xEe6679dAAd498314D9CB9cD7B4F7F60d0258C0A9';
export const RPC_URL = 'http://localhost:8545';

// Contract ABI - this should match your deployed contract
export const CONTRACT_ABI = [
  "function owner() view returns (address)",
  "function recordCounter() view returns (uint256)",
  "function records(uint256) view returns (uint256 id, string documentHash, string ownerSignature, string ownerPublicKey, uint256 timestamp, bool isValid, address createdBy)",
  "function ownerRecords(address) view returns (uint256[])",
  "function createRecord(string _documentHash, string _ownerSignature, string _ownerPublicKey) returns (uint256)",
  "function invalidateRecord(uint256 _recordId)",
  "function getRecord(uint256 _recordId) view returns (uint256 id, string documentHash, string ownerSignature, string ownerPublicKey, uint256 timestamp, bool isValid, address createdBy)",
  "function getOwnerRecords(address _owner) view returns (uint256[])",
  "function getRecordCount() view returns (uint256)",
  "function transferOwnership(address newOwner)",
  "event RecordCreated(uint256 indexed recordId, address indexed owner, string documentHash)",
  "event RecordInvalidated(uint256 indexed recordId, address indexed owner)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)"
];

// Provider setup
export const getProvider = () => {
  return new ethers.JsonRpcProvider(RPC_URL);
};

// Contract instance setup
export const getContract = (signer?: ethers.Signer) => {
  const provider = getProvider();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer || provider
  );
  return contract;
}; 