// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRecord {
    struct LandRecordStruct {
        string documentHash; // (for example, a hash of the land document)
        address owner;       // (the owner's address)
        uint256 timestamp;   // (when the record was created)
        bool isVerified;     // (whether the record is verified)
    }

    // An array of LandRecordStructs (indexed by recordId)
    LandRecordStruct[] public landRecords;

    // A mapping (recordId => signature) (so that a record can be "signed" (by the owner) (using a signature (bytes) computed off-chain (for example, using ethers.js) and stored (via a new function signRecord(uint256 _recordId, bytes calldata _signature) (which reverts if the record does not exist or if the caller is not the owner)). (Note: This update does not use OpenZeppelin.)
    mapping(uint256 => bytes) public signatures;

    address public admin;

    // Event emitted when a new record is created (with recordId, documentHash, owner, and timestamp)
    event RecordCreated(uint256 indexed recordId, string documentHash, address owner, uint256 timestamp);

    // Event emitted when a record is "signed" (with recordId, owner, and signature (bytes) (for an applied cryptography project) (so that a record can be "signed" (by the owner) (using a signature (bytes) computed off-chain (for example, using ethers.js) and stored (via a new function signRecord(uint256 _recordId, bytes calldata _signature) (which reverts if the record does not exist or if the caller is not the owner)). (Note: This update does not use OpenZeppelin.)
    event RecordSigned(uint256 indexed recordId, address owner, bytes signature);

    event RecordVerified(uint256 indexed recordId, address admin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Function to create a new land record (takes a document hash and an owner address, then pushes a new LandRecordStruct (with isVerified set to false) into landRecords and emits a RecordCreated event)
    function createRecord(string memory _documentHash, address _owner) public returns (uint256) {
        uint256 recordId = landRecords.length;
        LandRecordStruct memory newRecord = LandRecordStruct({
            documentHash: _documentHash,
            owner: _owner,
            timestamp: block.timestamp,
            isVerified: false
        });
        landRecords.push(newRecord);
        emit RecordCreated(recordId, _documentHash, _owner, block.timestamp);
        return recordId;
    }

    // Function to retrieve a land record (by recordId) (returns the LandRecordStruct (or reverts if the recordId is out of bounds)
    function getRecord(uint256 _recordId) public view returns (LandRecordStruct memory) {
        require(_recordId < landRecords.length, "Record does not exist");
        return landRecords[_recordId];
    }

    // Function to return the total number of land records (i.e. landRecords.length)
    function getRecordCount() public view returns (uint256) {
        return landRecords.length;
    }

    // New function (for an applied cryptography project) (so that a record can be "signed" (by the owner) (using a signature (bytes) computed off-chain (for example, using ethers.js) and stored (via a new function signRecord(uint256 _recordId, bytes calldata _signature) (which reverts if the record does not exist or if the caller is not the owner)). (Note: This update does not use OpenZeppelin.)
    function signRecord(uint256 _recordId, bytes calldata _signature) public {
        require(_recordId < landRecords.length, "Record does not exist");
        LandRecordStruct storage record = landRecords[_recordId];
        require(msg.sender == record.owner, "Only the owner can sign the record");
        signatures[_recordId] = _signature;
        emit RecordSigned(_recordId, record.owner, _signature);
    }

    // New function (for an applied cryptography project) (so that a record's signature (bytes) (computed off-chain (for example, using ethers.js) and stored (via a new function signRecord(uint256 _recordId, bytes calldata _signature) (which reverts if the record does not exist or if the caller is not the owner)) (can be retrieved (or reverts if the record does not exist)). (Note: This update does not use OpenZeppelin.)
    function getSignature(uint256 _recordId) public view returns (bytes memory) {
        require(_recordId < landRecords.length, "Record does not exist");
        return signatures[_recordId];
    }

    // On-chain signature verification
    function verifySignature(uint256 _recordId, bytes32 _messageHash, bytes memory _signature) public view returns (bool) {
        require(_recordId < landRecords.length, "Record does not exist");
        address owner = landRecords[_recordId].owner;
        bytes32 r;
        bytes32 s;
        uint8 v;
        require(_signature.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
        address recovered = ecrecover(_messageHash, v, r, s);
        return (recovered == owner);
    }

    // Admin-only: verify a record after checking the signature
    function verifyRecord(uint256 _recordId, bytes32 _messageHash, bytes memory _signature) public onlyAdmin {
        require(_recordId < landRecords.length, "Record does not exist");
        require(verifySignature(_recordId, _messageHash, _signature), "Invalid signature");
        landRecords[_recordId].isVerified = true;
        emit RecordVerified(_recordId, msg.sender);
    }
} 