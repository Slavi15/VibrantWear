import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import styles from "../../styles/elements/PageButtons.module.scss";

interface Props {
    onNext: () => void;
    onPrevious: () => void;
    page: number;
    totalPages: number;
};

const PageButtons = (props: Props) => {
    return (
        <div className={styles.pageButtonContainer}>
            <div onClick={props.onPrevious} className={styles.previousButton}>
                <BsArrowLeft />
            </div>
            <div className={styles.currentPage}>{props.page} / {props.totalPages}</div>
            <div onClick={props.onNext} className={styles.nextButton}>
                <BsArrowRight />
            </div>
        </div>
    );
};

export default PageButtons;