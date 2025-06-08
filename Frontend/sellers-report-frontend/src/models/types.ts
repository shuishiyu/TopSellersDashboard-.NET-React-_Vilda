export interface Order {
    seller: string;
    product: string;
    price: number;
    orderDate: string; // ISO format from backend
    branch: string;
}

export interface TopSellerDto {
    month: string;
    seller: string;
    totalOrders: number;
    totalSales: number;
}

export interface Branch {
    id: string;
    name: string;
}