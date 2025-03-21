// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PatientManagement {
    address public owner;
    
    struct Record {
        bytes recordHash;
        uint256 timestamp;
        address uploader;
    }
    
    struct Patient {
        bool exists;
        uint256 recordCount;
        mapping(address => bool) authorizedEntities;
        mapping(address => bool) emergencyAccess;
        address[] accessList;
    }
    
     
    mapping(address => Patient) public patients;
    mapping(address => mapping(uint256 => Record)) public records;
    
    
    event RecordUploaded(address indexed patient, uint256 recordId, uint256 timestamp);
    event AccessGranted(address indexed patient, address indexed entity);
    event AccessRevoked(address indexed patient, address indexed entity);
    event EmergencyAccessGranted(address indexed patient, address indexed entity);
    event ReportAdded(address indexed patient, address indexed doctor, uint256 recordId);
    
     
    constructor() {
        owner = msg.sender;
    }
    
     
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyPatient() {
        require(patients[msg.sender].exists || msg.sender == owner, "Only registered patients can perform this action");
        _;
    }
    
    modifier onlyAuthorized(address patient) {
        require(
            patients[patient].authorizedEntities[msg.sender] || 
            patients[patient].emergencyAccess[msg.sender] || 
            msg.sender == patient || 
            msg.sender == owner, 
            "Not authorized to access this patient's records"
        );
        _;
    }
    
   
    function uploadRecord(bytes memory recordHash) public onlyPatient {
        uint256 recordId = patients[msg.sender].recordCount;
        records[msg.sender][recordId] = Record({
            recordHash: recordHash,
            timestamp: block.timestamp,
            uploader: msg.sender
        });
        patients[msg.sender].recordCount++;
        
        emit RecordUploaded(msg.sender, recordId, block.timestamp);
    }
    
    // Grant access to a doctor or diagnostic center
    function grantAccess(address entity) public onlyPatient {
        require(entity != address(0), "Invalid address");
        require(!patients[msg.sender].authorizedEntities[entity], "Entity already has access");
        
        patients[msg.sender].authorizedEntities[entity] = true;
        patients[msg.sender].accessList.push(entity);
        
        emit AccessGranted(msg.sender, entity);
    }
    
    // Revoke access from a doctor or diagnostic center
    function revokeAccess(address entity) public onlyPatient {
        require(patients[msg.sender].authorizedEntities[entity], "Entity does not have access");
        
        patients[msg.sender].authorizedEntities[entity] = false;
        
        // Remove from access list
        for (uint256 i = 0; i < patients[msg.sender].accessList.length; i++) {
            if (patients[msg.sender].accessList[i] == entity) {
                // Move the last element to the position of the element to delete
                patients[msg.sender].accessList[i] = patients[msg.sender].accessList[patients[msg.sender].accessList.length - 1];
                // Remove the last element
                patients[msg.sender].accessList.pop();
                break;
            }
        }
        
        emit AccessRevoked(msg.sender, entity);
    }
    
    // View patient's own records
    function viewRecords() public view onlyPatient returns (bytes[] memory) {
        uint256 count = patients[msg.sender].recordCount;
        bytes[] memory patientRecords = new bytes[](count);
        
        for (uint256 i = 0; i < count; i++) {
            patientRecords[i] = records[msg.sender][i].recordHash;
        }
        
        return patientRecords;
    }
    
    // Doctor/Diagnostic Functions
    
    // View a patient's records (if authorized)
    function viewPatientRecords(address patient) public view onlyAuthorized(patient) returns (bytes[] memory) {
        uint256 count = patients[patient].recordCount;
        bytes[] memory patientRecords = new bytes[](count);
        
        for (uint256 i = 0; i < count; i++) {
            patientRecords[i] = records[patient][i].recordHash;
        }
        
        return patientRecords;
    }
    
    // Add a medical report (if authorized)
    function addMedicalReport(address patient, bytes memory reportHash) public onlyAuthorized(patient) {
        uint256 recordId = patients[patient].recordCount;
        records[patient][recordId] = Record({
            recordHash: reportHash,
            timestamp: block.timestamp,
            uploader: msg.sender
        });
        patients[patient].recordCount++;
        
        emit ReportAdded(patient, msg.sender, recordId);
    }
    
    // Emergency & Security Functions
    
    // Grant emergency access
    function grantEmergencyAccess(address entity) public onlyPatient {
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
    
    // Get list of entities with access to a patient's records
    function getAccessList(address patient) public view onlyAuthorized(patient) returns (address[] memory) {
        return patients[patient].accessList;
    }
}