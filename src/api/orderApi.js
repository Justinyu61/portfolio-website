import axios from "axios";
import { API_BASE } from "@/config";
import { apiHelper } from "./apiHelper";

export const getOrdersByPage = async (page) => {
  return apiHelper(() => axios.get(`${API_BASE}/admin/orders?page=${page}`));
};
export const updateOrder = async (id) => {
  return apiHelper(() => axios.put(`${API_BASE}/admin/order/${id}`));
};
export const deleteOrder = async () => {
  return apiHelper(() => axios.delete(`${API_BASE}/admin/order/${this.tempOrder.id}`));
};
// export const xx = async () => {
//   return apiHelper(() => axios.get(`${API_BASE}`));
// };
