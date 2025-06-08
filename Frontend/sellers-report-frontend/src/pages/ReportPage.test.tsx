import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ReportPage from './ReportPage';
import { fetchBranches, fetchTopSellers } from '../api/sellerService'; // Updated import path

// Mock the sellerService module
jest.mock('../api/sellerService');

const mockBranches = [
    { id: '1', name: 'New York' },
    { id: '2', name: 'Los Angeles' }
];

const mockSellers = [
    {
        month: 'January',
        seller: 'John Doe',
        totalOrders: 15,
        totalSales: 1250.50
    },
    {
        month: 'February',
        seller: 'Jane Smith',
        totalOrders: 18,
        totalSales: 1450.75
    }
];

describe('ReportPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (fetchBranches as jest.Mock).mockResolvedValue(mockBranches);
        (fetchTopSellers as jest.Mock).mockResolvedValue(mockSellers);
    });

    test('loads and displays branches', async () => {
        render(<ReportPage />);

        await waitFor(() => {
            expect(screen.getByText('-- Select a branch --')).toBeInTheDocument();
            mockBranches.forEach(branch => {
                expect(screen.getByText(branch.name)).toBeInTheDocument();
            });
        });
    });

    
});