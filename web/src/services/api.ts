import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const api = axios.create({
  baseURL: process.env.API_URL || 'https://proffy-deploy-2.herokuapp.com/' ,
});

export default api;
