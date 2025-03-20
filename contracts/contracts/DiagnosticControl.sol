//SPDX-License-Identifier:MIT
pragma solidity ^0.8.28;
 
 
contract DiagnosticCenterRecords {
    // Struct for diagnostic reports
    struct DiagnosticReport {
        string reportHash;        // IPFS CID from NFT.Storage
        string reportMetadata;    // JSON metadata about the report (type, date, etc.)
        uint256 timestamp;        // When the report was added
        address diagnosticCenter; // Which diagnostic center added this report
        bool isActive;            // If the report is active or archived
    }
    
  
    mapping(address => DiagnosticReport[]) private patientReports;
    
 
    mapping(address => bool) private authorizedCenters;
    
    
    mapping(address => mapping(address => bool)) private centerPatientAuth;
    
     
    address private owner;
    
  
    event ReportAdded(address indexed center, address indexed patient, string reportHash, uint256 timestamp);
    event ReportViewed(address indexed center, address indexed patient, uint256 timestamp);
    
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyDiagnosticCenter() {
        require(authorizedCenters[msg.sender], "Only authorized diagnostic centers can perform this action");
        _;
    }
    
    modifier isAuthorizedForPatient(address patient) {
        require(centerPatientAuth[msg.sender][patient], "Center not authorized for this patient");
        _;
    }
    
     
    constructor() {
        owner = msg.sender;
    }
    
   
    function authorizeDiagnosticCenter(address center) external onlyOwner {
        authorizedCenters[center] = true;
    }
   
    function deauthorizeDiagnosticCenter(address center) external onlyOwner {
        authorizedCenters[center] = false;
    }
    
   
    function authorizeCenterForPatient(address center) external {
        require(authorizedCenters[center], "Address is not an authorized diagnostic center");
        centerPatientAuth[center][msg.sender] = true;
    }
    
   
    function deauthorizeCenterForPatient(address center) external {
        centerPatientAuth[center][msg.sender] = false;
    }

  
    function addDiagnosticReport(
        address patient,
        string calldata reportHash,
        string calldata reportMetadata
    ) 
        external 
        onlyDiagnosticCenter 
        isAuthorizedForPatient(patient) 
    {
        DiagnosticReport memory newReport = DiagnosticReport({
            reportHash: reportHash,
            reportMetadata: reportMetadata,
            timestamp: block.timestamp,
            diagnosticCenter: msg.sender,
            isActive: true
        });
        
        patientReports[patient].push(newReport);
        
        emit ReportAdded(msg.sender, patient, reportHash, block.timestamp);
    }
    
  
    function viewPatientReports(address patient) 
        external 
        onlyDiagnosticCenter 
        isAuthorizedForPatient(patient) 
        returns (DiagnosticReport[] memory) 
    {
        emit ReportViewed(msg.sender, patient, block.timestamp);
        return patientReports[patient];
    }
    
 
    function viewMyReports() external view returns (DiagnosticReport[] memory) {
        return patientReports[msg.sender];
    }
    
  
    function isCenterAuthorized(address center) external view returns (bool) {
        return authorizedCenters[center];
    }
    
   
    function isCenterAuthorizedForPatient(address center, address patient) external view returns (bool) {
        return centerPatientAuth[center][patient];
    }
}