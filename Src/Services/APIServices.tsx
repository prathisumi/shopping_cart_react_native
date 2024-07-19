import axios from './Axios';

export const getProductsService = () => {
  return axios.get('products');
};
