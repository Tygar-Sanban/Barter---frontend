import axios from "axios";

const service = axios.create({
  baseURL:
    "mongodb+srv://admin:s2OPtuiTrb6LwX4y@cluster0.j2x1pms.mongodb.net/BarterDB?retryWrites=true&w=majority",
});

service.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default service;
