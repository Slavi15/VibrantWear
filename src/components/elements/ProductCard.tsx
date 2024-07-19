import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Product } from "@/redux/interfaces";

const PageRedirectButton = dynamic(() => import("./PageRedirectButton.tsx"));

import styles from "../../styles/elements/ProductCard.module.scss";

interface Props {
    product: Product;
};

const ProductCard = (props: Props) => {
    return (
        <div className={styles.productCard}>
            <Link href={`/store/${props.product._id}`} prefetch={true}>
                <Image
                    className={styles.img}
                    src={props.product.images[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
                    priority={true}
                    alt={props.product.title} />
            </Link>

            <div className={styles.info}>
                <span>{props.product.category}</span>
                <div className={styles.h5}>{props.product.title}</div>
                <div className={styles.h4}>${props.product.price.value.toFixed(2)}</div>
            </div>

            <PageRedirectButton product={props.product} />
        </div>
    );
};

export default ProductCard;