import axios from "axios";

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;