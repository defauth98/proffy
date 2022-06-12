import axios from 'axios';
import env from 'react-dotenv';

const api = axios.create({
  baseURL: env.API_URL,
});

export default api;
