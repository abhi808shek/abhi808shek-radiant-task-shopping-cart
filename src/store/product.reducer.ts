import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  images: string[];
}

interface ProductState {
  productsList: Product[];
}

const initialState: ProductState = {
  productsList: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, productsList: action.payload };
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
