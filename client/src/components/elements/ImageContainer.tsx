import Image from "next/image";

import styles from "../../styles/elements/ImageContainer.module.scss";

interface Props {
    image: string;
}

const ImageContainer = (props: Props) => {
    return <div className={styles.smallImageColumn}>
        <Image
            className={styles.smallImage}
            src={props.image}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', border: '1px solid #CCE7D0' }}
            priority={true}
            alt={props.image} />
    </div>
};

export default ImageContainer;