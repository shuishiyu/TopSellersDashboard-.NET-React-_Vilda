 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BranchDropdown from '../BranchDropdown';
import '@testing-library/jest-dom';

describe('BranchDropdown Component', () => {
    const mockBranches = [
        { id: '1', name: 'New York' },
        { id: '2', name: 'Los Angeles' },
        { id: '3', name: 'Chicago' },
    ];

    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with default option', () => {
        render(
            <BranchDropdown
                branches={mockBranches}
                selectedBranch=""
                onBranchChange={mockOnChange}
            />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByText('-- Select a branch --')).toBeInTheDocument();
    });

    test('displays all branch options', () => {
        render(
            <BranchDropdown
                branches={mockBranches}
                selectedBranch=""
                onBranchChange={mockOnChange}
            />
        );

        mockBranches.forEach(branch => {
            expect(screen.getByText(branch.name)).toBeInTheDocument();
        });
    });

    test('calls onChange handler when selection changes', () => {
        render(
            <BranchDropdown
                branches={mockBranches}
                selectedBranch=""
                onBranchChange={mockOnChange}
            />
        );

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: '2' }
        });

        expect(mockOnChange).toHaveBeenCalledWith('2');
    });

    test('displays the selected branch', () => {
        render(
            <BranchDropdown
                branches={mockBranches}
                selectedBranch="2"
                onBranchChange={mockOnChange}
            />
        );

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe('2');
    });

    test('is disabled when disabled prop is true', () => {
        render(
            <BranchDropdown
                branches={mockBranches}
                selectedBranch=""
                onBranchChange={mockOnChange}
                disabled={true}
            />
        );

        expect(screen.getByRole('combobox')).toBeDisabled();
    });
});