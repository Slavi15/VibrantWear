"use client";

import { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/redux/interfaces";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { add, cartItemsByIDAndSize, increment } from "@/redux/features/cartSlice";

import { jost } from "@/styles/fonts";

const ImageContainer = dynamic(() => import('./elements/ImageContainer.tsx'));
const SizeSelectElement = dynamic(() => import('./elements/SizeSelectElement.tsx'));
const QuantityButtons = dynamic(() => import('./elements/QuantityButtons.tsx'));

import styles from "../styles/ProductPage.module.scss";

interface Props {
    product: Product;
};

const ProductPage = (props: Props) => {
    const dispatch = useAppDispatch();

    const [imageURL, setImageURL] = useState(props.product.images[0]);
    const [sizeState, setSizeState] = useState('');
    let [qty, setQty] = useState(0);

    const router = useRouter();

    const cartItemByIdAndSize = useAppSelector(state => cartItemsByIDAndSize(state, props.product._id, sizeState));

    useEffect(() => {
        router.prefetch("/cart");

        const smallImage = Array.from(document.getElementById('smallImageGroup')?.children as HTMLCollectionOf<HTMLDivElement>);

        smallImage.map(image => {
            image.addEventListener('click', function () {
                setImageURL((this.children[0] as HTMLImageElement).alt);
            });
        });
    }, []);

    const debouncePath = useMemo(() => debounce(url => {
        router.replace(url);
    }), [router]);

    return (
        <section className={styles.productPage}>
            <div className={styles.mainProductImage}>
                {
                    imageURL &&
                    <Image
                        className={styles.mainImage}
                        id="mainImage"
                        src={imageURL}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto', border: '1px solid #CCE7D0' }}
                        priority={true}
                        alt={props.product.title} />
                }

                <div className={styles.smallImageGroup} id="smallImageGroup">
                    {props.product.images.map((image, index) => (
                        <ImageContainer key={index} image={image} />
                    ))}
                </div>
            </div>

            <div className={styles.singleProductDetails}>
                <div className={styles.h6}>{props.product.section}</div>
                <div className={styles.h4}>{props.product.title}</div>
                <div className={styles.h2}>${props.product.price.value.toFixed(2)}</div>

                <div id="sizeContainer" className={styles.sizeContainer}>
                    {props.product.sizes.map((size, index) => (
                        <SizeSelectElement key={index}
                            onClick={() => {
                                setSizeState(size);
                            }}
                            sizeState={''}
                            size={size} />
                    ))}
                </div>

                <div className={styles.buttonElements}>
                    <QuantityButtons
                        onIncrease={() => setQty(++qty)}
                        onDecrease={() => setQty(--qty)}
                        quantity={qty} />

                    <button
                        disabled={qty > 0 && sizeState !== '' ? false : true}
                        onClick={() => {
                            if (cartItemByIdAndSize === undefined) {
                                dispatch(add({ product: props.product, size: sizeState, quantity: qty }));
                            } else {
                                dispatch(increment(cartItemByIdAndSize));
                            };

                            debouncePath("/cart");
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            textDecoration: 'none',
                        }}>
                        <div className={styles.button} style={jost.style}>Add to cart</div>
                    </button>
                </div>

                <div className={styles.h4}>Product Details</div>
                <span>{props.product.description}</span>
            </div>
        </section>
    );
};

export default ProductPage;