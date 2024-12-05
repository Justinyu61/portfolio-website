import axios from 'axios';

const API_BASE = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}`

export const getCart = async () => {
  const res = await axios.get(`${API_BASE}/cart`)
  return res.data;
}

export const deleteCartItem = async () => {
  const res = await axios.delete(`${API_BASE}/cart/${id}`)
  return res.data;
}

export const updateCartItem = async (id, cartData) => {
  const res = await axios.put(`${API_BASE}/cart/${id}`, { data: cartData})
  return res.data;
}

export const applyCoupon = async (couponCode) => {
  const res = await axios.post(`${API_BASE}/coupon}`, {data: {code: couponCode}})
  return res.data;
}
