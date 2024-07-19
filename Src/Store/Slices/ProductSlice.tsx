import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  categoryList: [],
  cartList: [],
  orderList: [],
};

const ProductSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    StoreProductList: (state, action) => {
      state.productList = action.payload;
    },
    StoreCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    StoreCartList: (state, action) => {
      state.cartList = action.payload;
    },
    StoreOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
});

export const {
  StoreCartList,
  StoreCategoryList,
  StoreOrderList,
  StoreProductList,
} = ProductSlice.actions;
export default ProductSlice.reducer;
