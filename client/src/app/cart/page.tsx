import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("@/components/Checkout.tsx"));

import styles from "../../styles/Cart.module.scss";

const Cart = () => {
    return (
        <div>
            <section className={styles.banner}>
                <div className={styles.h2}>#cart</div>
            </section>

            <div style={{ padding: '40px 10%' }}>
                <Checkout />
            </div>
        </div>
    );
};

export default Cart;