"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useAppSelector } from "@/redux/store";
import { totalPriceSelector, totalShippingPriceSelector } from "@/redux/features/cartSlice";

const CheckoutCard = dynamic(() => import("./elements/CheckoutCard.tsx"));

import styles from "../styles/Checkout.module.scss";
import { jost } from "@/styles/fonts";

const Checkout = () => {
    const cartItems = useAppSelector(state => state.cartReducer.cartItems);
    const totalItemsPrice = useAppSelector(totalPriceSelector);
    const totalShipping = useAppSelector(totalShippingPriceSelector);

    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const input = document.getElementById('input') as HTMLInputElement;
        const applyButton = document.getElementById('applyButton') as HTMLDivElement;
        const tableButton = document.getElementById('tableButton') as HTMLDivElement;

        applyButton?.addEventListener('click', () => {
            input.value === process.env.NEXT_PUBLIC_COUPON_CODE && setDiscount(totalItemsPrice * 0.2);
            input.value = '';
        });

        tableButton?.addEventListener('click', () => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems: cartItems
                })
            })
            .then(res => {
                if (res.ok) return res.json();

                return res.json().then(json => Promise.reject(json));
            })
            .then(({ url }) => {
                window.location = url;
            })
            .catch(err => console.log(err));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.checkoutContainer}>
            {
                !cartItems.length ?
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>No items in shopping bag!</div> :
                    <div>
                        <section className={styles.cartItems}>
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td>Remove</td>
                                        <td>Image</td>
                                        <td>Product</td>
                                        <td>Size</td>
                                        <td>Price</td>
                                        <td>Quantity</td>
                                        <td>Subtotal</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((item, index) => (
                                            <CheckoutCard key={index} cartItem={item} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                        <section className={styles.cartCheckout}>
                            <div className={styles.coupon}>
                                <div className={styles.h3}>Apply Coupon Code</div>
                                <div className={styles.couponElements}>
                                    <input type="text"
                                        placeholder="Enter Your Coupon"
                                        id="input"
                                        style={jost.style} />
                                    <div id="applyButton" className={styles.couponButton}>Apply</div>
                                </div>
                            </div>

                            <div className={styles.subTotal}>
                                <div className={styles.h3}>Cart Totals</div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Cart Subtotal</td>
                                            <td>$ {totalItemsPrice.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>$ {totalShipping.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Discount</td>
                                            <td>{discount ? `$ ${discount.toFixed(2)}` : `$ ${Number('0').toFixed(2)}`}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Total</strong></td>
                                            <td><strong>$ {(totalItemsPrice + totalShipping - discount).toFixed(2)}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="tableButton" className={styles.tableButton}>Proceed to Checkout</div>
                            </div>
                        </section>
                    </div>
            }
            {/* <div className={styles.totalPrice}>Total: ${totalItemsPrice.toFixed(2)}</div>
            <button className={styles.checkoutButton}>Checkout</button> */}
        </div>
    );
};

export default Checkout;