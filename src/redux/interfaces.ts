export interface Product {
    _id: number;
    title: string;
    description: string;
    edition?: string;
    price: {
        value: number;
        currency: string;
    };
    shipping_price: {
        value: number;
        currency: string;
    };
    images: string[];
    category: string;
    section: string;
    reviews: string[];
    sizes: string[];
    colours: string[];
};

export interface CartItem {
    cid: string;
    product: Product;
    size: string;
    quantity: number;
};

export interface PaginationProduct {
    products: Product[],
    page: number;
    totalPages: number;
};