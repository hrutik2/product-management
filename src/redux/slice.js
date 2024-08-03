import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  
};

const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateProduct(state, action) {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
    AddProduct(state, action) {
      state.products.push(action.payload);
    },
  },
});

export const { setProducts, setFilters, updateProduct, AddProduct } = productReducer.actions;
export default productReducer;
