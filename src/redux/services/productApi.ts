import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, PaginationProduct } from "../interfaces";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], null>({
            query: () => "products",
        }),
        getProductByID: builder.query<Product, { _id: string }>({
            query: ({ _id }) => `products/${_id}`,
        }),
        getPaginationProducts: builder.query<PaginationProduct, { page: number }>({
            query: ({ page }) => `paginationProducts?page=${page}`,
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductByIDQuery, 
    useGetPaginationProductsQuery 
} = productApi;