import React from 'react';
import { UserRole } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RoleSelectorProps {
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, setSelectedRole }) => {
  return (
    <Card className="w-full mb-6">
      <CardContent className="pt-6">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium">Select Your Role</h3>
        </div>
        <RadioGroup
          value={selectedRole}
          onValueChange={(value: any) => setSelectedRole(value as UserRole)}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {Object.values(UserRole).map((role) => (
            <div key={role} className="flex items-center space-x-2">
              <RadioGroupItem value={role} id={`role-${role}`} />
              <Label htmlFor={`role-${role}`} className="capitalize">
                {role}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default RoleSelector;