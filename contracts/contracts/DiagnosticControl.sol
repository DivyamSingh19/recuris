// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DiagnosticControl {
    struct DiagnosticReport {
        string reportHash;
        string reportMetadata;
        uint256 timestamp;
        address diagnosticCenter;
        bool isActive;
    }

    mapping(address => DiagnosticReport[]) private patientReports;
    mapping(address => bool) private authorizedCenters;
    mapping(address => mapping(address => bool)) private centerPatientAuth;
    
    address public owner; // Changed to public for easier access

    event ReportAdded(address indexed center, address indexed patient, string reportHash, uint256 timestamp);
    event ReportViewed(address indexed center, address indexed patient, uint256 timestamp);
    event CenterAuthorized(address indexed center);
    event CenterDeauthorized(address indexed center);
    event CenterPatientAuthorizationChanged(address indexed center, address indexed patient, bool authorized);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyDiagnosticCenter() {
        require(authorizedCenters[msg.sender], "Only authorized diagnostic centers can perform this action");
        _;
    }

    modifier isAuthorizedForPatient(address patient) {
        require(
            centerPatientAuth[msg.sender][patient] || 
            msg.sender == patient || 
            msg.sender == owner, 
            "Center not authorized for this patient"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function authorizeDiagnosticCenter(address center) external onlyOwner {
        require(center != address(0), "Invalid center address");
        require(!authorizedCenters[center], "Center already authorized");
        
        authorizedCenters[center] = true;
        emit CenterAuthorized(center);
    }

    function deauthorizeDiagnosticCenter(address center) external onlyOwner {
        require(authorizedCenters[center], "Center is not authorized");
        
        authorizedCenters[center] = false;
        emit CenterDeauthorized(center);
    }

    function authorizeCenterForPatient(address center) external {
        require(authorizedCenters[center], "Address is not an authorized diagnostic center");
        
        centerPatientAuth[center][msg.sender] = true;
        emit CenterPatientAuthorizationChanged(center, msg.sender, true);
    }

    function deauthorizeCenterForPatient(address center) external {
        centerPatientAuth[center][msg.sender] = false;
        emit CenterPatientAuthorizationChanged(center, msg.sender, false);
    }

    function addDiagnosticReport(
        address patient,
        string calldata reportHash,
        string calldata reportMetadata
    ) external onlyDiagnosticCenter isAuthorizedForPatient(patient) {
        require(bytes(reportHash).length > 0, "Report hash cannot be empty");
        
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

     
    function renounceOwnership() external onlyOwner {
        owner = address(0);
    }
}