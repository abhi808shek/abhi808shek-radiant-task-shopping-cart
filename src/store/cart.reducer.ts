import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  cart: any[];
}

const initialState: cartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      return { ...state, cart: action.payload };
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
