import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getNearbyQRCodes = async (lat, lng) => {
  const response = await api.get(`/qr/nearby?lat=${lat}&lng=${lng}`);
  return response.data;
};

export const scanQRCode = async (qrCodeId, userId, lat, lng) => {
  const response = await api.post('/qr/scan', { qrCodeId, userId, lat, lng });
  return response.data;
};

export const getPrizeHistory = async (userId) => {
  const response = await api.get(`/prize/history/${userId}`);
  return response.data;
};

export default api;