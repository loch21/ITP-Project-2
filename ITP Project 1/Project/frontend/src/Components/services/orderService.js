import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Set auth token for requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Create new order
 * @param {Object} orderData - Order details
 * @returns {Promise} Created order
 */
export const createOrder = async (orderData) => {
  try {
    const { data } = await API.post('/orders', orderData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

/**
 * Get order by ID
 * @param {String} orderId - Order ID
 * @returns {Promise} Order details
 */
export const getOrderById = async (orderId) => {
  try {
    const { data } = await API.get(`/orders/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get order');
  }
};

/**
 * Get logged in user's orders
 * @returns {Promise} List of user's orders
 */
export const getMyOrders = async () => {
  try {
    const { data } = await API.get('/orders/myorders');
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get orders');
  }
};