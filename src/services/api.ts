import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    limit: 5,
    skip: 0,
  },
});

export default api;
