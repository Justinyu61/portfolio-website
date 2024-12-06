import axios from "axios";
import { API_BASE } from "@/config";
import { apiHelper } from "./apiHelper";

export const getAllProducts = async () => {
  return apiHelper(() => axios.get(`${API_BASE}/products/all`));
};

export const getProductByItem = async (id) => {
  return apiHelper(() => axios.get(`${API_BASE}/product/${id}`));
};

export const getProductByPage = async (page) => {
  return apiHelper(() => axios.get(`${API_BASE}/products?page=${page}`));
};

// export const xx = async () => {
//   return apiHelper(() => axios.get(`${API_BASE}`));
// };
