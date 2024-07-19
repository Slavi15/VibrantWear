"use client";

import dynamic from "next/dynamic";
import { useGetProductByIDQuery } from "@/redux/services/productApi";

const ProductPage = dynamic(() => import("@/components/ProductPage.tsx"));

const IndividiualProduct = ({ params }: { params: { slug: string } }) => {
    const { isLoading, isFetching, data, error } = useGetProductByIDQuery({ _id: params.slug });

    return (
        <div style={{ padding: '20px 10%', marginTop: '95px' }}>
            {
                error ? (
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Error!</div>
                ) : isLoading || isFetching ? (
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>
                ) : data ? (
                    <div>
                        <ProductPage key={data._id} product={data} />
                    </div>
                ) : null
            }
        </div>
    );
};

export default IndividiualProduct;