//SPDX-License-Identifier:MIT
pragma solidity ^0.8.28;
 
contract MedAccessControl {
    
    enum AccessType { 
        RECORDS,       
        PRESCRIPTIONS, 
        DIAGNOSTICS,   
        EMERGENCY,    
        FULL_ACCESS   
    }
    
     
    struct AccessPermission {
        address provider;    
        string providerName; 
        string providerRole; 
        AccessType accessType;  
        uint256 grantedAt; 
        uint256 expiresAt; 
        bool isActive;  
    }
    
   
    struct AccessEvent {
        address provider;   
        uint256 timestamp;   
        string actionType;   
        string details;     
    }
    
     
    mapping(address => AccessPermission[]) private patientPermissions;
    
     
    mapping(address => AccessEvent[]) private accessHistory;
    
    
    mapping(address => mapping(address => uint256)) private providerIndex;
    
    
    mapping(address => mapping(address => bool)) private hasPermission;
    
    // Events
    event AccessGranted(address indexed patient, address indexed provider, AccessType accessType, uint256 expiresAt);
    event AccessRevoked(address indexed patient, address indexed provider, string reason);
    event AccessUsed(address indexed patient, address indexed provider, string actionType);
    event EmergencyAccessUsed(address indexed patient, address indexed provider, string reason);
    
    /**
     * @dev Patient grants access to a healthcare provider
     * @param provider Address of the healthcare provider
     * @param providerName Name of the provider
     * @param providerRole Role of the provider
     * @param accessType Type of access being granted
     * @param durationDays Duration in days (0 for no expiration)
     */
    function grantAccess(
        address provider,
        string calldata providerName,
        string calldata providerRole,
        AccessType accessType,
        uint256 durationDays
    ) 
        external 
    {
        require(provider != address(0), "Invalid provider address");
        require(provider != msg.sender, "Cannot grant access to yourself");
        
        // Calculate expiration time
        uint256 expiresAt = 0;
        if (durationDays > 0) {
            expiresAt = block.timestamp + (durationDays * 1 days);
        }
        
        if (hasPermission[msg.sender][provider]) {
            // Update existing permission
            uint256 index = providerIndex[msg.sender][provider];
            patientPermissions[msg.sender][index].accessType = accessType;
            patientPermissions[msg.sender][index].expiresAt = expiresAt;
            patientPermissions[msg.sender][index].isActive = true;
            patientPermissions[msg.sender][index].grantedAt = block.timestamp;
        } else {
            // Create new permission
            AccessPermission memory newPermission = AccessPermission({
                provider: provider,
                providerName: providerName,
                providerRole: providerRole,
                accessType: accessType,
                grantedAt: block.timestamp,
                expiresAt: expiresAt,
                isActive: true
            });
            
            // Store the index for quick access
            providerIndex[msg.sender][provider] = patientPermissions[msg.sender].length;
            hasPermission[msg.sender][provider] = true;
            patientPermissions[msg.sender].push(newPermission);
        }
        
        // Record in access history
        _addToAccessHistory(
            msg.sender,
            provider,
            "GRANT_ACCESS",
            string(abi.encodePacked("Granted ", _accessTypeToString(accessType), " access"))
        );
        
        emit AccessGranted(msg.sender, provider, accessType, expiresAt);
    }
    
    /**
     * @dev Patient revokes access from a healthcare provider
     * @param provider Address of the healthcare provider
     * @param reason Reason for revoking access
     */
    function revokeAccess(address provider, string calldata reason) external {
        require(hasPermission[msg.sender][provider], "No active permission for this provider");
        
        uint256 index = providerIndex[msg.sender][provider];
        patientPermissions[msg.sender][index].isActive = false;
        
        // Record in access history
        _addToAccessHistory(
            msg.sender,
            provider,
            "REVOKE_ACCESS",
            reason
        );
        
        emit AccessRevoked(msg.sender, provider, reason);
    }
    
    /**
     * @dev Set expiration date for a provider's access
     * @param provider Address of the healthcare provider
     * @param durationDays New duration in days (0 to remove expiration)
     */
    function updateAccessExpiration(address provider, uint256 durationDays) external {
        require(hasPermission[msg.sender][provider], "No active permission for this provider");
        
        uint256 expiresAt = 0;
        if (durationDays > 0) {
            expiresAt = block.timestamp + (durationDays * 1 days);
        }
        
        uint256 index = providerIndex[msg.sender][provider];
        patientPermissions[msg.sender][index].expiresAt = expiresAt;
        
        // Record in access history
        _addToAccessHistory(
            msg.sender,
            provider,
            "UPDATE_EXPIRATION",
            string(abi.encodePacked("Updated access expiration to ", 
                expiresAt == 0 ? "never expire" : "expire in days: ", 
                _uint2str(durationDays)))
        );
    }
    
    /**
     * @dev Bulk revoke all accesses for a patient
     * @param reason Reason for revoking all access
     */
    function revokeAllAccess(string calldata reason) external {
        AccessPermission[] storage permissions = patientPermissions[msg.sender];
        
        for (uint i = 0; i < permissions.length; i++) {
            if (permissions[i].isActive) {
                permissions[i].isActive = false;
                
                // Record in access history
                _addToAccessHistory(
                    msg.sender,
                    permissions[i].provider,
                    "REVOKE_ACCESS",
                    string(abi.encodePacked("Bulk revocation: ", reason))
                );
                
                emit AccessRevoked(msg.sender, permissions[i].provider, reason);
            }
        }
    }
    
    /**
     * @dev Check if a provider has access to a patient's data
     * @param patient Address of the patient
     * @param provider Address of the healthcare provider
     * @param accessType Type of access to check
     * @return bool indicating if provider has valid access
     */
    function checkAccess(address patient, address provider, AccessType accessType) external returns (bool) {
        // If patient is calling, always grant access to their own data
        if (patient == msg.sender) {
            return true;
        }
        
        // Check if provider is calling and has permission
        if (provider == msg.sender && hasPermission[patient][provider]) {
            uint256 index = providerIndex[patient][provider];
            AccessPermission storage permission = patientPermissions[patient][index];
            
            // Check if access is active and not expired
            bool hasValidAccess = permission.isActive && 
                (permission.expiresAt == 0 || permission.expiresAt > block.timestamp);
                
            // Check access type
            bool hasRequiredAccess = (permission.accessType == AccessType.FULL_ACCESS) || 
                (permission.accessType == accessType);
                
            if (hasValidAccess && hasRequiredAccess) {
                // Record the access
                _addToAccessHistory(
                    patient,
                    provider,
                    "ACCESS_DATA",
                    string(abi.encodePacked("Accessed ", _accessTypeToString(accessType)))
                );
                
                emit AccessUsed(patient, provider, _accessTypeToString(accessType));
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * @dev Patient can get all their active permissions
     * @return Array of access permissions
     */
    function getMyActivePermissions() external view returns (AccessPermission[] memory) {
        AccessPermission[] storage allPermissions = patientPermissions[msg.sender];
        
        // First, count active permissions
        uint256 activeCount = 0;
        for (uint256 i = 0; i < allPermissions.length; i++) {
            if (allPermissions[i].isActive &&
                (allPermissions[i].expiresAt == 0 || allPermissions[i].expiresAt > block.timestamp)) {
                activeCount++;
            }
        }
        
        // Create result array of the correct size
        AccessPermission[] memory activePermissions = new AccessPermission[](activeCount);
        
        // Fill the result array
        uint256 j = 0;
        for (uint256 i = 0; i < allPermissions.length; i++) {
            if (allPermissions[i].isActive &&
                (allPermissions[i].expiresAt == 0 || allPermissions[i].expiresAt > block.timestamp)) {
                activePermissions[j] = allPermissions[i];
                j++;
            }
        }
        
        return activePermissions;
    }
    
    /**
     * @dev Patient can get their access history
     * @param count Maximum number of events to return (0 for all)
     * @return Array of access events
     */
    function getMyAccessHistory(uint256 count) external view returns (AccessEvent[] memory) {
        AccessEvent[] storage history = accessHistory[msg.sender];
        
        uint256 resultCount = count == 0 || count > history.length ? history.length : count;
        AccessEvent[] memory result = new AccessEvent[](resultCount);
        
        // Return the most recent events
        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = history[history.length - 1 - i];
        }
        
        return result;
    }
    
    /**
     * @dev Emergency access for healthcare providers
     * @param patient Address of the patient
     * @param reason Emergency reason
     * @return bool indicating if emergency access was recorded
     */
    function emergencyAccess(address patient, string calldata reason) external returns (bool) {
        // This should be restricted to verified emergency providers in a real system
        // For demonstration purposes, we'll just record the emergency access
        
        _addToAccessHistory(
            patient,
            msg.sender,
            "EMERGENCY_ACCESS",
            reason
        );
        
        emit EmergencyAccessUsed(patient, msg.sender, reason);
        return true;
    }
    
    /**
     * @dev Add an event to access history
     * @param patient Patient address
     * @param provider Provider address
     * @param actionType Type of action
     * @param details Additional details
     */
    function _addToAccessHistory(
        address patient,
        address provider,
        string memory actionType,
        string memory details
    ) private {
        AccessEvent memory newEvent = AccessEvent({
            provider: provider,
            timestamp: block.timestamp,
            actionType: actionType,
            details: details
        });
        
        accessHistory[patient].push(newEvent);
    }
    
    /**
     * @dev Convert AccessType enum to string
     * @param accessType The access type to convert
     * @return string representation of the access type
     */
    function _accessTypeToString(AccessType accessType) private pure returns (string memory) {
        if (accessType == AccessType.RECORDS) return "RECORDS";
        if (accessType == AccessType.PRESCRIPTIONS) return "PRESCRIPTIONS";
        if (accessType == AccessType.DIAGNOSTICS) return "DIAGNOSTICS";
        if (accessType == AccessType.EMERGENCY) return "EMERGENCY";
        if (accessType == AccessType.FULL_ACCESS) return "FULL_ACCESS";
        return "UNKNOWN";
    }
    
    /**
     * @dev Convert uint to string
     * @param value The uint to convert
     * @return string representation of the uint
     */
    function _uint2str(uint256 value) private pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        
        uint256 temp = value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }
        
        return string(buffer);
    }
}