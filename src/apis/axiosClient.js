import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://192.168.2.92:9000",
  baseURL: "http://localhost:9000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
