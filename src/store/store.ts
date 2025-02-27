import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.reducer";
import globalLoaderReducer from "./global.reducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    globalLoader: globalLoaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
