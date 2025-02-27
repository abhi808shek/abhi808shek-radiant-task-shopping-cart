import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.reducer";
import globalLoaderReducer from "./global.reducer";
import products from "./product.reducer";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    globalLoader: globalLoaderReducer,
    products: products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
