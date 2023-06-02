import axios from "axios";

const service = axios.create({
  baseURL: "https://barter-backend-nkn6.onrender.com/",
});

service.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default service;
