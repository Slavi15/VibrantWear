import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { CartItem } from "@/redux/interfaces";

import styles from "../../styles/elements/QuantityButtons.module.scss";

interface Props {
    onIncrease: () => void;
    onDecrease: () => void;
    // onRemove: () => void;
    quantity: number;
};

const QuantityButtons = (props: Props) => {
    return (
        <div className={styles.quantityContainer}>
            <div className={styles.items}>
                <HiMinus className={styles.icon} onClick={props.onDecrease} />
                <div className={styles.count}>{props.quantity}</div>
                <HiPlus className={styles.icon} onClick={props.onIncrease} />
            </div>
            {/* <HiTrash className={styles.trashIcon} onClick={props.onRemove} /> */}
        </div>
    );
};

// const dispatch = useAppDispatch();
// const qty = useAppSelector(state => productQuantitySelector(state, props.product.id))
{/* <QuantityButtons 
    onIncrease={() => dispatch(increment(props.product))} 
    onDecrease={() => dispatch(decrement(props.product))} 
    onRemove={() => dispatch(remove(props.product))}
    quantity={qty} /> */}

export default QuantityButtons;