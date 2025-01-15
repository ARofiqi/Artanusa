import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

// const axiosInstance = axios.create({
//   baseURL: "https://x1hnjxjj-3000.asse.devtunnels.ms/api",
//   timeout: 5000,
// });

// const axiosInstance = axios.create({
//   baseURL: "https://artanusa.ti22f.my.id/API/",
//   timeout: 5000,
// });

export default axiosInstance;
