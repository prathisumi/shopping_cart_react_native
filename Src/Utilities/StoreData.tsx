import {useSelector} from 'react-redux';
import {RootState} from '../Store';

export const useProductList = () => {
  return useSelector((state: RootState) => state.product.productList);
};

export const useCategoryList = () => {
  return useSelector((state: RootState) => state.product.categoryList);
};

export const useCartList = () => {
  return useSelector((state: RootState) => state.product.cartList);
};

export const useOrderList = () => {
  return useSelector((state: RootState) => state.product.orderList);
};
