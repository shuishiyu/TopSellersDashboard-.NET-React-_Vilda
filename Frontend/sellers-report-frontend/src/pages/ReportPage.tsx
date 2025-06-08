import React, { useState, useEffect } from 'react';
import { fetchBranches, fetchTopSellers } from '../api/sellerService';
import BranchDropdown from '../components/BranchDropdown';
import SellersTable from '../components/SellersTable';
import { TopSellerDto, Branch } from '../models/types';

const ReportPage: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [sellersData, setSellersData] = useState<TopSellerDto[]>([]);
    const [loading, setLoading] = useState({
        branches: false,
        sellers: false
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBranches = async () => {
            try {
                setLoading(prev => ({ ...prev, branches: true }));
                setError(null);
                const data = await fetchBranches();
                setBranches(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load branches');
            } finally {
                setLoading(prev => ({ ...prev, branches: false }));
            }
        };

        loadBranches();
    }, []);

    useEffect(() => {
        if (!selectedBranch) return;

        const loadSellers = async () => {
            try {
                setLoading(prev => ({ ...prev, sellers: true }));
                setError(null);
                const data = await fetchTopSellers(selectedBranch);
                setSellersData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load seller data');
            } finally {
                setLoading(prev => ({ ...prev, sellers: false }));
            }
        };

        loadSellers();
    }, [selectedBranch]);

    return (
        <div className="report-container">
            <h1>Monthly Top Sellers Report</h1>

            <div className="controls">
                {loading.branches ? (
                    <p>Loading branches...</p>
                ) : (
                    <BranchDropdown
                        branches={branches}
                        selectedBranch={selectedBranch}
                        onBranchChange={setSelectedBranch}
                        disabled={loading.sellers}
                    />
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="results">
                {loading.sellers ? (
                    <p>Loading report data...</p>
                ) : (
                    selectedBranch && <SellersTable data={sellersData} branchName={selectedBranch} />
                )}
            </div>
        </div>
    );
};

export default ReportPage;