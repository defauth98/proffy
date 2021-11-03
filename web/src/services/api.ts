import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proffy-deploy-2.herokuapp.com',
});

export default api;
