// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PatientManagement {
    address public owner;
    
    struct Record {
        bytes recordHash;
        string recordName;
        string description;  // Added description field
        uint256 timestamp;
        address uploader;
    }
    
    struct Patient {
        uint256 recordCount;
        mapping(address => bool) authorizedEntities;
        mapping(address => bool) emergencyAccess;
        mapping(address => uint256) insuranceAgentAccess; // Timestamp when access expires
        address[] accessList;
    }
    
    mapping(address => Patient) public patients;
    mapping(address => mapping(uint256 => Record)) public records;
    
    event RecordUploaded(
        address indexed patient, 
        uint256 recordId, 
        string recordName, 
        string description, 
        uint256 timestamp
    );
    
    event ReportAdded(
        address indexed patient, 
        address indexed doctor, 
        uint256 recordId, 
        string recordName, 
        string description
    );
    
    // Other events remain the same...
    
    constructor() {
        owner = msg.sender;
    }
    
    // Other modifiers remain the same...
    
    function uploadRecord(
        bytes memory recordHash, 
        string memory recordName, 
        string memory description
    ) public {
        uint256 recordId = patients[msg.sender].recordCount;
        records[msg.sender][recordId] = Record({
            recordHash: recordHash,
            recordName: recordName,
            description: description,  // Added description
            timestamp: block.timestamp,
            uploader: msg.sender
        });
        patients[msg.sender].recordCount++;
        
        emit RecordUploaded(
            msg.sender, 
            recordId, 
            recordName, 
            description, 
            block.timestamp
        );
    }
    
    // Modify viewRecords to return record names and descriptions
    function viewRecords() public view onlyAuthorized(msg.sender) returns (
        bytes[] memory, 
        string[] memory, 
        string[] memory
    ) {
        uint256 count = patients[msg.sender].recordCount;
        bytes[] memory patientRecords = new bytes[](count);
        string[] memory recordNames = new string[](count);
        string[] memory descriptions = new string[](count);
        
        for (uint256 i = 0; i < count; i++) {
            patientRecords[i] = records[msg.sender][i].recordHash;
            recordNames[i] = records[msg.sender][i].recordName;
            descriptions[i] = records[msg.sender][i].description;
        }
        
        return (patientRecords, recordNames, descriptions);
    }
    
    // Similarly modify viewPatientRecords
    function viewPatientRecords(address patient) public view onlyAuthorized(patient) returns (
        bytes[] memory, 
        string[] memory, 
        string[] memory
    ) {
        uint256 count = patients[patient].recordCount;
        bytes[] memory patientRecords = new bytes[](count);
        string[] memory recordNames = new string[](count);
        string[] memory descriptions = new string[](count);
        
        for (uint256 i = 0; i < count; i++) {
            patientRecords[i] = records[patient][i].recordHash;
            recordNames[i] = records[patient][i].recordName;
            descriptions[i] = records[patient][i].description;
        }
        
        return (patientRecords, recordNames, descriptions);
    }
    
    function addMedicalReport(
        address patient, 
        bytes memory reportHash, 
        string memory reportName, 
        string memory description
    ) public onlyAuthorized(patient) {
        uint256 recordId = patients[patient].recordCount;
        records[patient][recordId] = Record({
            recordHash: reportHash,
            recordName: reportName,
            description: description,  // Added description
            timestamp: block.timestamp,
            uploader: msg.sender
        });
        patients[patient].recordCount++;
        
        emit ReportAdded(
            patient, 
            msg.sender, 
            recordId, 
            reportName, 
            description
        );
    }
    
    // All other functions remain the same...
   }
    
    function grantEmergencyAccess(address entity) public onlyAuthorized(msg.sender) {
        require(entity != address(0), "Invalid address");
        require(!patients[msg.sender].emergencyAccess[entity], "Entity already has emergency access");
        
        patients[msg.sender].emergencyAccess[entity] = true;
        
        emit EmergencyAccessGranted(msg.sender, entity);
    }
    
    // Multi-signature emergency unlock
    function multiSigUnlock(address patient, address[] memory approvers) public {
        require(approvers.length >= 2, "At least 2 approvers required");
        
        // Check if all approvers are valid (e.g., recognized healthcare providers)
        // This is a simplified version - in a real system, you'd need more robust validation
        for (uint256 i = 0; i < approvers.length; i++) {
            require(approvers[i] != address(0), "Invalid approver address");
        }
        
        // Grant emergency access to the caller
        patients[patient].emergencyAccess[msg.sender] = true;
        
        emit EmergencyAccessGranted(patient, msg.sender);
    }
    
    
    function getAccessList(address patient) public view onlyAuthorized(patient) returns (address[] memory) {
        return patients[patient].accessList;
    }
}