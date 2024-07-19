import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productApi } from "./services/productApi";
import { cartSlice } from "./features/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        cartReducer: cartSlice.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([productApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;