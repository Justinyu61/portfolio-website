import { defineStore } from "pinia";
import { toRaw } from 'vue';
import {
  getCart,
  addToCart,
  deleteCartItem,
  updateCartItem,
  applyCoupon,
} from "@/api/cartApi";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    isLoading: false,
    cartList: [],
    total: 0,
    finalTotal: 0,
    status: {
      loadingItem: "", // 讀取效果
    },
    couponCode: "",
  }),
  getters: {
    cartLength() {
      return this.cartList?.carts?.length || 0;
    },
  },
  actions: {
    handlerErrorMsg(e, msg = "操作失敗") {
      console.warn(msg, e);
    },
    setLoading(itemId = null) {
      this.isLoading = true;
      this.status.loadingItem = itemId;
    },
    cleanLoading() {
      this.isLoading = false;
      this.status.loadingItem = "";
    },
    minus(item) {
      item.qty -= 1;
      this.updateCartItem(item);
    },
    plus(item) {
      item.qty += 1;
      this.updateCartItem(item);
    },
    async getCart() {
      this.setLoading();

      try {
        const res = await getCart();
        const { carts, total, final_total } = res.data.data;
        if (carts.length !== 0) {
          this.cartList = carts;
          this.total = total;
          this.finalTotal = final_total;
          this.isLoading = false;
        }
      } catch (error) {
        // handlerErrorMsg("購物車為空，請重定向到產品頁");
      } finally {
        this.isLoading = false;
      }
    },
    async addToCart(id, qty = 1) {
      this.setLoading();
      const payload = { product_id: id, qty };
      try {
        const res = await addToCart(payload);
        if (res.data.success) {
          this.updateCart(payload);
        }
        this.cleanLoading();
      } catch (error) {
        handlerErrorMsg("加入購物車項目失敗:", error);
      }
    },
    async deleteCartItem(id) {
      this.setLoading(id);
      try {
        await deleteCartItem(id);
        this.getCart();
      } catch (error) {
        handlerErrorMsg("移除購物車項目失敗:", error);
      } finally {
        this.cleanLoading();
      }
    },
    async updateCartItem(item) {
      this.setLoading(item.id);
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      try {
        await updateCartItem(item.id, cart);
        this.getCart();
      } catch (error) {
        handlerErrorMsg("更新購物車項目失敗:", error);
      } finally {
        this.cleanLoading();
      }
    },
    async addCouponCode() {
      this.setLoading();
      const couponCode = {
        code: this.couponCode,
      };
      try {
        await applyCoupon(couponCode);
        this.getCart();
      } catch (error) {
        handlerErrorMsg("加入優惠券失敗:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
