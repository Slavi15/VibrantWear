import { useGetProductsQuery } from "@/redux/services/productApi";
import ProductCard from "./ProductCard";

import styles from "../../styles/elements/Products.module.scss";

const FeaturedProducts = () => {
    const { isLoading, isFetching, data, error } = useGetProductsQuery(null);

    return (
        <div>
            {
                error ? (
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Error!</div>
                ) : isLoading || isFetching ? (
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>
                ) : data ? (
                    <div className={styles.productContainer}>
                        {data.filter(product => product.edition === "Featured").map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : null
            }
        </div>
    );
};

export default FeaturedProducts;