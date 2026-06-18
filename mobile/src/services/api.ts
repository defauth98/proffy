import axios from 'axios';

declare const process: { env?: { API_URL?: string } } | undefined;

const baseURL =
  typeof process !== 'undefined' && process?.env?.API_URL
    ? process.env.API_URL
    : 'http://localhost:3333';

const api = axios.create({
  baseURL,
});

export default api;
