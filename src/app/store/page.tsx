import dynamic from "next/dynamic";
const PaginatedProducts = dynamic(() => import("@/components/elements/PaginatedProducts.tsx"));

import styles from "../../styles/Store.module.scss";

const Store = () => {
    return (
        <div>
            <section className={styles.banner}>
                <div className={styles.h2}>#shopping</div>
            </section>

            <div style={{ padding: '40px 10%' }}>
                <PaginatedProducts />
            </div>
        </div>
    );
};

export default Store;