// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract InsuranceProvider {
    // Struct for patient-uploaded health records
    struct HealthRecord {
        string recordHash;      // IPFS or other hash of the medical record
        string recordType;      // Type of record (e.g., "MRI", "Blood Test", "Prescription")
        uint256 timestamp;      // Timestamp of record upload
        bool isActive;          // Whether the record is active
    }
    
    // Struct for insurance claims
    struct InsuranceClaim {
        uint256 claimId;        // Unique claim identifier
        uint256 claimAmount;    // Amount of the insurance claim
        string claimType;       // Type of medical claim
        uint256 submissionDate; // Date the claim was submitted
        bool isApproved;        // Status of the claim
        address claimant;       // Address of the patient who submitted the claim
    }
    
    // Mapping from patient address to their uploaded health records
    mapping(address => HealthRecord[]) private patientRecords;
    
    // Mapping from patient address to their insurance claims
    mapping(address => InsuranceClaim[]) private patientClaims;
    
    // Mapping to track which agents are authorized by a specific patient
    mapping(address => mapping(address => bool)) private patientAgentAuthorization;
    
    // Address of the contract owner (added for additional control)
    address public owner;
    
    // Event for record upload
    event RecordUploaded(address indexed patient, string recordType, uint256 timestamp);
    
    // Event for agent record access
    event RecordAccessed(address indexed patient, address indexed agent, uint256 timestamp);
    
    // Event for claim submission
    event ClaimSubmitted(address indexed patient, uint256 claimId, uint256 amount, uint256 timestamp);
    
    // Event for agent authorization
    event AgentAuthorized(address indexed patient, address indexed agent);
    
    // Event for agent deauthorization
    event AgentDeauthorized(address indexed patient, address indexed agent);
    
    // Modifier to restrict certain functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }
    
    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }
    
    // Function for patients to upload their health records
    function uploadHealthRecord(
        string calldata recordHash, 
        string calldata recordType
    ) external {
        // Input validation
        require(bytes(recordHash).length > 0, "Record hash cannot be empty");
        require(bytes(recordType).length > 0, "Record type cannot be empty");
        
        HealthRecord memory newRecord = HealthRecord({
            recordHash: recordHash,
            recordType: recordType,
            timestamp: block.timestamp,
            isActive: true
        });
        
        patientRecords[msg.sender].push(newRecord);
        
        emit RecordUploaded(msg.sender, recordType, block.timestamp);
    }
    
    // Function for patients to authorize an insurance agent
    function authorizeAgent(address agent) external {
        // Prevent self-authorization or zero address
        require(agent != address(0), "Invalid agent address");
        require(agent != msg.sender, "Cannot authorize yourself");
        
        patientAgentAuthorization[msg.sender][agent] = true;
        
        emit AgentAuthorized(msg.sender, agent);
    }
    
    // Function for patients to deauthorize an insurance agent
    function deauthorizeAgent(address agent) external {
        patientAgentAuthorization[msg.sender][agent] = false;
        
        emit AgentDeauthorized(msg.sender, agent);
    }
    
    // Function for authorized agents to view patient records
    function viewPatientRecords(address patient) 
        external 
        returns (HealthRecord[] memory) 
    {
        // Check if the agent is authorized by the patient
        require(
            patientAgentAuthorization[patient][msg.sender] || 
            msg.sender == patient || 
            msg.sender == owner, 
            "You are not authorized to view this patient's records"
        );
        
        emit RecordAccessed(patient, msg.sender, block.timestamp);
        return patientRecords[patient];
    }
    
    // Function for patients to submit insurance claims
    function submitClaim(
        string calldata claimType,
        uint256 claimAmount
    ) external {
        // Input validation
        require(claimAmount > 0, "Claim amount must be greater than zero");
        require(bytes(claimType).length > 0, "Claim type cannot be empty");
        
        uint256 claimId = block.timestamp; // Using timestamp as a simple unique identifier
        
        InsuranceClaim memory newClaim = InsuranceClaim({
            claimId: claimId,
            claimAmount: claimAmount,
            claimType: claimType,
            submissionDate: block.timestamp,
            isApproved: false,
            claimant: msg.sender
        });
        
        patientClaims[msg.sender].push(newClaim);
        
        emit ClaimSubmitted(msg.sender, claimId, claimAmount, block.timestamp);
    }
    
    // Function for authorized agents to view patient claims
    function viewPatientClaims(address patient) 
        external 
        view 
        returns (InsuranceClaim[] memory) 
    {
        // Check if the agent is authorized by the patient
        require(
            patientAgentAuthorization[patient][msg.sender] || 
            msg.sender == patient || 
            msg.sender == owner, 
            "You are not authorized to view this patient's claims"
        );
        
        return patientClaims[patient];
    }
    
    // Function for patients to view their own records
    function viewMyRecords() external view returns (HealthRecord[] memory) {
        return patientRecords[msg.sender];
    }
   
    // Function for patients to view their own claims
    function viewMyClaims() external view returns (InsuranceClaim[] memory) {
        return patientClaims[msg.sender];
    }
    
    // Optional: Function to renounce ownership
    function renounceOwnership() external onlyOwner {
        owner = address(0);
    }
}