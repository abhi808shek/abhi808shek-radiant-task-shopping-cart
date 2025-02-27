import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  images: string[];
}

interface ProductState {
  productsList: Product[];
  searchResults: Product[];
}

const initialState: ProductState = {
  productsList: [],
  searchResults: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, productsList: action.payload };
    },
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      return { ...state, searchResults: action.payload };
    },
  },
});

export const { setProducts, setSearchResults } = productSlice.actions;

export default productSlice.reducer;
