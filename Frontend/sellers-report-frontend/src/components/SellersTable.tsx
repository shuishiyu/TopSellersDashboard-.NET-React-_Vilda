import React from 'react';
import { TopSellerDto } from '../models/types';

interface SellersTableProps {
    data: TopSellerDto[];
    branchName: string;
}

const SellersTable: React.FC<SellersTableProps> = ({ data, branchName }) => {
    if (data.length === 0) {
        return <div className="no-data">No sales data available for {branchName}</div>;
    }

    return (
        <div className="report-results">
            <h2>Top Sellers for {branchName}</h2>
            <div className="table-responsive">
                <table className="sellers-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Top Seller</th>
                            <th>Orders</th>
                            <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((seller) => (
                            <tr key={`${seller.month}-${seller.seller}`}>
                                <td>{seller.month}</td>
                                <td>{seller.seller}</td>
                                <td>{seller.totalOrders}</td>
                                <td>${seller.totalSales.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellersTable;