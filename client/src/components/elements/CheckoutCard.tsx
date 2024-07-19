import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { increment, decrement, remove, cartItemsByIDAndSize } from "@/redux/features/cartSlice";
import { CartItem } from "@/redux/interfaces";
import QuantityButtons from "./QuantityButtons";

import styles from "../../styles/elements/CheckoutCard.module.scss";
import { HiTrash } from "react-icons/hi";

interface Props {
    cartItem: CartItem;
};

const CheckoutCard = ({ cartItem }: Props) => {
    const dispatch = useAppDispatch();

    const cartItemByIdAndSize = useAppSelector(state => cartItemsByIDAndSize(state, cartItem.product._id, cartItem.size));
    console.log(cartItemByIdAndSize);
    
    // const qty = useAppSelector(state => productQuantitySelector(state, cartItem.product.id));

    return (
        <tr>
            <td><HiTrash className={styles.icon} onClick={() => dispatch(remove(cartItemByIdAndSize as CartItem))} /></td>
            <td>
                <Image
                    style={{ border: '1px solid #CCE7D0' }}
                    src={cartItem.product.images[0]}
                    width={80}
                    height={80}
                    alt={cartItem.product.title} />
            </td>
            <td>{cartItem.product.title}</td>
            <td>{cartItem.size}</td>
            <td>${cartItem.product.price.value.toFixed(2)}</td>
            <td>
                <QuantityButtons
                    onIncrease={() => dispatch(increment(cartItemByIdAndSize as CartItem))}
                    onDecrease={() => dispatch(decrement(cartItemByIdAndSize as CartItem))}
                    quantity={cartItemByIdAndSize?.quantity as number} />
            </td>
            <td>${(cartItem.product.price.value * (cartItemByIdAndSize?.quantity || 0)).toFixed(2)}</td>
        </tr>

        // <div className={styles.checkoutCardContainer}>
        //     <Image
        //         style={{ padding: "10px" }}
        //         src={cartItem.product.images[0]}
        //         width={100}
        //         height={100}
        //         alt={cartItem.product.title} />
        //     <div className={styles.info}>
        //         <div className={styles.title}>{cartItem.product.title}</div>
        //         {/* <QuantityButtons
        //             onIncrease={() => dispatch(increment(cartItem.product))}
        //             onDecrease={() => dispatch(decrement(cartItem.product))}
        //             quantity={cartItem.quantity} /> */}
        //     </div>
        // </div>
    );
};

export default CheckoutCard;