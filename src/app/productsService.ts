// src/app/productsService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Cache-Control': 'no-cache'
  }
});

export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};
