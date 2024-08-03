import { configureStore } from '@reduxjs/toolkit';

import productReducer from './slice';


const Store = configureStore({
  reducer: {
    products:productReducer.reducer
  },
});

export default Store;           