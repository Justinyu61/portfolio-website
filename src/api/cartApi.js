import axios from "axios";
import { API_BASE } from "@/config";
import { apiHelper } from "./apiHelper";

export const getCart = async () => {
  return apiHelper(() => axios.get(`${API_BASE}/cart`));
};

export const addToCart = async (payload) => {
  const res = await axios.post(`${API_BASE}/cart`, { data: payload });
  return res.data;
};

export const deleteCartItem = async (id) => {
  const res = await axios.delete(`${API_BASE}/cart/${id}`);
  return res.data;
};

export const updateCartItem = async (id, cartData) => {
  const res = await axios.put(`${API_BASE}/cart/${id}`, { data: cartData });
  return res.data;
};

export const applyCoupon = async (couponCode) => {
  const res = await axios.post(`${API_BASE}/coupon`, {
    data: { code: couponCode },
  });
  return res.data;
};
