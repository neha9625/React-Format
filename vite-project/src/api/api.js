import axios from "axios";

let baseURL = "http://localhost:3001";

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});
