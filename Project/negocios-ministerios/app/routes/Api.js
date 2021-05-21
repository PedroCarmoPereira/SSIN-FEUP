import axios from 'axios';
const api = axios.create({ baseURL: 'http://192.168.1.121:8010' });
export default api;