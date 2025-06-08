import { TopSellerDto, Branch } from '../models/types';

const API_BASE_URL = 'http://localhost:5044/api';

export const fetchBranches = async (): Promise<Branch[]> => {
    const response = await fetch(`${API_BASE_URL}/reports/branches`);
    if (!response.ok) {
        throw new Error(`Failed to fetch branches: ${response.status}`);
    }
    const data = await response.json();
    return data.map((branch: string) => ({ id: branch, name: branch }));
};

export const fetchTopSellers = async (branch: string): Promise<TopSellerDto[]> => {
    const response = await fetch(
        `${API_BASE_URL}/reports/top-sellers?branch=${encodeURIComponent(branch)}`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch top sellers: ${response.status}`);
    }
    return response.json();
};