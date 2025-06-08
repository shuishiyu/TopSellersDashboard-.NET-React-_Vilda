import React from 'react';
import { render, screen } from '@testing-library/react';
import SellersTable from '../SellersTable';
import '@testing-library/jest-dom';

describe('SellersTable Component', () => {
    const mockData = [
        {
            month: 'January',
            seller: 'John Smith',
            totalOrders: 15,
            totalSales: 1250.50
        },
        {
            month: 'February',
            seller: 'Jane Doe',
            totalOrders: 18,
            totalSales: 1450.75
        }
    ];

    const mockBranchName = 'New York';

    test('renders no data message when data is empty', () => {
        render(<SellersTable data={[]} branchName={mockBranchName} />);

        expect(screen.getByText(`No sales data available for ${mockBranchName}`))
            .toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    //test('renders table with correct data', () => {
    //    render(<SellersTable data={mockData} branchName={mockBranchName} />);

    //    // Check title
    //    expect(screen.getByText(`Top Sellers for ${mockBranchName}`))
    //        .toBeInTheDocument();

    //    // Check table exists
    //    const table = screen.getByRole('table');
    //    //expect(table).toBeInTheDocument();
    //    expect(table).toHaveAttribute('aria-labelledby', 'some-element-id');

    //    // Check headers
    //    expect(screen.getByText('Month')).toBeInTheDocument();
    //    expect(screen.getByText('Top Seller')).toBeInTheDocument();
    //    expect(screen.getByText('Orders')).toBeInTheDocument();
    //    expect(screen.getByText('Total Sales')).toBeInTheDocument();

    //    // Check data rows
    //    mockData.forEach(item => {
    //        expect(screen.getByText(item.month)).toBeInTheDocument();
    //        expect(screen.getByText(item.seller)).toBeInTheDocument();
    //        expect(screen.getByText(item.totalOrders.toString())).toBeInTheDocument();
    //        expect(screen.getByText(`$${item.totalSales.toFixed(2)}`)).toBeInTheDocument();
    //    });
    //});

    test('formats currency values correctly', () => {
        const testData = [{
            month: 'March',
            seller: 'Test Seller',
            totalOrders: 10,
            totalSales: 1000.5
        }];

        render(<SellersTable data={testData} branchName={mockBranchName} />);

        expect(screen.getByText('$1000.50')).toBeInTheDocument();
    });

    //test('has correct accessibility attributes', () => {
    //    render(<SellersTable data={mockData} branchName={mockBranchName} />);

    //    const table = screen.getByRole('table');
    //    expect(table).toHaveAttribute('aria-label', 'Top sellers by month');

    //    const rows = screen.getAllByRole('row');
    //    expect(rows.length).toBe(mockData.length + 1); // +1 for header row
    //});
}); 
