// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

 
contract DoctorManagement {
    
    struct HealthRecord {
        string recordHash;      
        uint256 timestamp;      
        address doctorAddress;  
        bool isActive;          
    }
    
    // Struct for prescriptions
    struct Prescription {
        string medication;     //name
        string dosage;          // Dosage  
        string frequency;       // How often to take
        uint256 startDate;      // When to start taking
        uint256 endDate;        // When to stop taking
        address doctorAddress;  // Doctor who created the prescription
        bool isActive;          // If the prescription is active
    }
    
    // Mapping from patient address to their records
    mapping(address => HealthRecord[]) private patientRecords;
    
   
    mapping(address => Prescription[]) private patientPrescriptions;
    
   
    mapping(address => bool) private authorizedDoctors;
     
    mapping(address => mapping(address => bool)) private doctorPatientAuth;
    
    
    address private owner;
    
  
    event RecordViewed(address indexed doctor, address indexed patient, uint256 timestamp);
    event PrescriptionAdded(address indexed doctor, address indexed patient, string medication, uint256 timestamp);
    
 
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyDoctor() {
        require(authorizedDoctors[msg.sender], "Only authorized doctors can perform this action");
        _;
    }
    
    modifier isAuthorizedForPatient(address patient) {
        require(doctorPatientAuth[msg.sender][patient], "Doctor not authorized for this patient");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
    }
    
    
    function authorizeDoctor(address doctor) external onlyOwner {
        authorizedDoctors[doctor] = true;
    }
    
    function deauthorizeDoctor(address doctor) external onlyOwner {
        authorizedDoctors[doctor] = false;
    }
    
    function authorizeDocterForPatient(address doctor) external {
        require(authorizedDoctors[doctor], "Address is not an authorized doctor");
        doctorPatientAuth[doctor][msg.sender] = true;
    }
    
    function deauthorizeDoctorForPatient(address doctor) external {
        doctorPatientAuth[doctor][msg.sender] = false;
    }

    function viewPatientRecords(address patient) 
        external 
        onlyDoctor 
        isAuthorizedForPatient(patient) 
        returns (HealthRecord[] memory) 
    {
        emit RecordViewed(msg.sender, patient, block.timestamp);
        return patientRecords[patient];
    }
    
    
    function createPrescription(
        address patient,
        string calldata medication,
        string calldata dosage,
        string calldata frequency,
        uint256 durationDays
    ) 
        external 
        onlyDoctor 
        isAuthorizedForPatient(patient) 
    {
        uint256 startDate = block.timestamp;
        uint256 endDate = startDate + (durationDays * 1 days);
        
        Prescription memory newPrescription = Prescription({
            medication: medication,
            dosage: dosage,
            frequency: frequency,
            startDate: startDate,
            endDate: endDate,
            doctorAddress: msg.sender,
            isActive: true
        });
        
        patientPrescriptions[patient].push(newPrescription);
        
        emit PrescriptionAdded(msg.sender, patient, medication, block.timestamp);
    }
    
     
    function getPatientPrescriptions(address patient) 
        external 
        view 
        onlyDoctor 
        isAuthorizedForPatient(patient) 
        returns (Prescription[] memory) 
    {
        return patientPrescriptions[patient];
    }
    
     
    function viewMyRecords() external view returns (HealthRecord[] memory) {
        return patientRecords[msg.sender];
    }
     
    function viewMyPrescriptions() external view returns (Prescription[] memory) {
        return patientPrescriptions[msg.sender];
    }
}