import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { CartItem, Product } from "../interfaces";
import { RootState } from "../store";
import { nanoid } from "nanoid";

export interface CartState {
    cartItems: CartItem[];
};

const initialState: CartState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<{ product: Product, size: string, quantity: number }>) => {
            console.log(action.payload);
            state.cartItems.push({ cid: nanoid(), product: action.payload.product, size: action.payload.size, quantity: action.payload.quantity });
        },
        increment: (state, action: PayloadAction<CartItem>) => {
            const item = state.cartItems.find(el => el.product._id === action.payload.product._id && el.size === action.payload.size);

            if (item) item.quantity++;
        },
        decrement: (state, action: PayloadAction<CartItem>) => {
            const item = state.cartItems.find(el => el.product._id === action.payload.product._id && el.size === action.payload.size);

            if (item) {
                item.quantity--;

                if (item.quantity === 0)
                    state.cartItems = state.cartItems.filter(el => !(el.product._id === action.payload.product._id && el.size === action.payload.size && el.cid === action.payload.cid));
            };
        },
        remove: (state, action: PayloadAction<CartItem>) => {
            const item = state.cartItems.find(el => el.product._id === action.payload.product._id && el.size === action.payload.size);

            if (item) state.cartItems = state.cartItems.filter(el => !(el.product._id === action.payload.product._id && el.size === action.payload.size && el.cid === action.payload.cid));
        },
    },
});

const cartItems = (state: RootState) => state.cartReducer.cartItems;

export const totalCartItemSelector = createSelector([cartItems],
    (cartItems) => cartItems.reduce((total: number, current: CartItem) => total += current.quantity, 0));

export const totalPriceSelector = createSelector([cartItems],
    (cartItems) => cartItems.reduce((total: number, current: CartItem) => total += (current.quantity * current.product.price.value), 0));

export const totalShippingPriceSelector = createSelector([cartItems],
    (cartItems) => cartItems.reduce((total: number, current: CartItem) => total += (current.quantity * current.product.shipping_price.value), 0));

export const cartItemsByIDAndSize = createSelector(
    [
        cartItems,
        (cartItems, productID: number) => productID,
        (cartItems, productID: number, size: string) => size,
    ],
    (cartItems, productID, size) => {
        return cartItems.find(el => el.product._id === productID && el.size === size);
    });

export const { add, increment, decrement, remove } = cartSlice.actions;
export default cartSlice.reducer;