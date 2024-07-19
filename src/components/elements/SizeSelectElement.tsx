import styles from "../../styles/elements/SizeSelectElement.module.scss";

interface Props {
    onClick: () => void;
    sizeState: string;
    size: string;
};

const SizeSelectElement = (props: Props) => {
    return <div onClick={props.onClick} className={styles.sizeElement}>{props.size}</div>
};

export default SizeSelectElement;