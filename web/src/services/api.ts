import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proffy-backend-deploy.herokuapp.com/',
});

export default api;
