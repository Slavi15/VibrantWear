"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("./ProductCard.tsx"));
const PageButtons = dynamic(() => import("./PageButtons.tsx"));

import { useGetPaginationProductsQuery } from "@/redux/services/productApi";

import styles from "../../styles/elements/Products.module.scss";

const PaginatedProducts = () => {
    let [page, setPage] = useState(1);
    const { isLoading, isFetching, data, error } = useGetPaginationProductsQuery({ page: page });

    return (
        <div>
            {
                error ? (
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Error!</div>
                ) : isLoading || isFetching ? (
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>
                ) : data ? (
                    <div>
                        <div className={styles.productContainer}>
                            {data.products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                        <PageButtons page={page}
                            totalPages={data.totalPages}
                            onNext={() => {
                                page < data.totalPages && setPage(++page);
                            }}
                            onPrevious={() => {
                                page > 1 && setPage(--page);
                            }} />
                    </div>
                ) : null
            }
        </div>
    );
};

export default PaginatedProducts;