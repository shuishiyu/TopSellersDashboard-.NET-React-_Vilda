import React from 'react';
import { Branch } from '../models/types';

interface BranchDropdownProps {
    branches: Branch[];
    selectedBranch: string;
    onBranchChange: (branch: string) => void;
    disabled?: boolean;
}

const BranchDropdown: React.FC<BranchDropdownProps> = ({
    branches,
    selectedBranch,
    onBranchChange,
    disabled = false
}) => {
    return (
        <select
            style={{ fontSize: '18px' }} 
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            disabled={disabled}
            className="branch-dropdown"
        >

            <option value="">-- Select a branch --</option>
            {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                    {branch.name}
                </option>
            ))}
        </select>
    );
};

export default BranchDropdown;