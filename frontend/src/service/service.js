import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005",
});

service.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default service;
