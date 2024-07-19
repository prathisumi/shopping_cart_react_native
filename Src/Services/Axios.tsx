import axios from 'axios';
import {baseURL} from './ServiceConstants';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default instance;
