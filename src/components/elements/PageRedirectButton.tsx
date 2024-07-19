import Link from "next/link";
import { Product } from "@/redux/interfaces";
import { BsBag } from "react-icons/bs";

import styles from "../../styles/elements/PageRedirectButton.module.scss";

interface Props {
    product: Product;
};

const PageRedirectButton = (props: Props) => {
    return <i className={styles.button}>
        <Link href={`/store/${props.product._id}`} prefetch={true}>
            <BsBag className={styles.icon} />
        </Link>
    </i>
};

export default PageRedirectButton;