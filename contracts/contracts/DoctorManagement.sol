  
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElectronicHealthRecords {
    address public owner;

    struct Record {
        address patient;
        address doctor;
        string details;
        uint256 timestamp;
    }

    struct Prescription {
        address patient;
        address doctor;
        string medication;
        uint256 timestamp;
    }

    mapping(address => Record[]) private records;
    mapping(address => Prescription[]) private prescriptions;

    event RecordViewed(address indexed doctor, address indexed patient);
    event PrescriptionAdded(address indexed doctor, address indexed patient, string medication);

    constructor() {
        owner = msg.sender;
    }

    
    function viewRecords(address patient) public view returns (Record[] memory) {
        require(records[patient].length > 0, "No records found for this patient");
        return records[patient];
    }

     
    function addPrescription(address patient, string memory medication) public {
        Prescription memory newPrescription = Prescription({
            patient: patient,
            doctor: msg.sender,
            medication: medication,
            timestamp: block.timestamp
        });

        prescriptions[patient].push(newPrescription);
        emit PrescriptionAdded(msg.sender, patient, medication);
    }

    
    function addRecord(address patient, string memory details) public {
        require(msg.sender == owner, "Only owner can add records");

        Record memory newRecord = Record({
            patient: patient,
            doctor: msg.sender,
            details: details,
            timestamp: block.timestamp
        });

        records[patient].push(newRecord);
    }
}
