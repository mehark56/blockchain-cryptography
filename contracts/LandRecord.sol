// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract LandRecord {
    address public owner;
    uint256 private recordCounter;

    struct Record {
        uint256 id;
        string documentHash;
        string ownerSignature;
        string ownerPublicKey;
        uint256 timestamp;
        bool isValid;
        address createdBy;
    }

    mapping(uint256 => Record) public records;
    mapping(address => uint256[]) public ownerRecords;

    event RecordCreated(uint256 indexed recordId, address indexed owner, string documentHash);
    event RecordInvalidated(uint256 indexed recordId, address indexed owner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        recordCounter = 0;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function createRecord(
        string memory _documentHash,
        string memory _ownerSignature,
        string memory _ownerPublicKey
    ) public returns (uint256) {
        require(bytes(_documentHash).length > 0, "Document hash cannot be empty");
        require(bytes(_ownerSignature).length > 0, "Owner signature cannot be empty");
        require(bytes(_ownerPublicKey).length > 0, "Owner public key cannot be empty");

        uint256 recordId = recordCounter;
        records[recordId] = Record({
            id: recordId,
            documentHash: _documentHash,
            ownerSignature: _ownerSignature,
            ownerPublicKey: _ownerPublicKey,
            timestamp: block.timestamp,
            isValid: true,
            createdBy: msg.sender
        });

        ownerRecords[msg.sender].push(recordId);
        recordCounter++;

        emit RecordCreated(recordId, msg.sender, _documentHash);
        return recordId;
    }

    function invalidateRecord(uint256 _recordId) public {
        require(_recordId < recordCounter, "Record does not exist");
        require(records[_recordId].isValid, "Record is already invalid");
        require(
            msg.sender == records[_recordId].createdBy || msg.sender == owner,
            "Only record creator or owner can invalidate"
        );

        records[_recordId].isValid = false;
        emit RecordInvalidated(_recordId, records[_recordId].createdBy);
    }

    function getRecord(uint256 _recordId) public view returns (
        uint256 id,
        string memory documentHash,
        string memory ownerSignature,
        string memory ownerPublicKey,
        uint256 timestamp,
        bool isValid,
        address createdBy
    ) {
        require(_recordId < recordCounter, "Record does not exist");
        Record memory record = records[_recordId];
        return (
            record.id,
            record.documentHash,
            record.ownerSignature,
            record.ownerPublicKey,
            record.timestamp,
            record.isValid,
            record.createdBy
        );
    }

    function getOwnerRecords(address _owner) public view returns (uint256[] memory) {
        return ownerRecords[_owner];
    }

    function getRecordCount() public view returns (uint256) {
        return recordCounter;
    }
} 