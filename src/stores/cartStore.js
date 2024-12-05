import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { getCart, deleteCartItem, updateCartItem, applyCoupon } from '@/api/cartApi';

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    isLoading: false,
    cartList: [],
    status: {
      loadingItem: "", // 讀取效果
    },
    couponCode: "",
  }),
  getters: {},
  actions: {
    redirectToProducts(router, message) {
      alert(message);
      router.push("/products/productsIndex");
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
      const router = useRouter();
      this.isLoading = true;
      try {
        const data = await getCart();
        if (data.carts.length !== 0) {
          this.cartList = data;
          this.isLoading = false;
        } else {
          this.redirectToProducts(router, "購物車為空，請重定向到產品頁");
        }
      } catch (error) {
        this.redirectToProducts(router, "購物車為空，請重定向到產品頁");
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCartItem(id) {
      this.status.loadingItem = id;
      this.isLoading = true;
      try {
        await removeCartItem(id);
        this.getCart();
      } catch (error) {
        console.error("移除購物車項目失敗:", error);
      } finally {
        this.isLoading = false;
        this.status.loadingItem = "";
      }
    },
    async updateCartItem(item) {
      this.status.loadingItem = item.id;
      this.isLoading = true;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      try {
        await updateCartItem(item.id, cart );
        this.getCart();
      } catch (error) {
        console.error("更新購物車項目失敗:", error);
      } finally {
        this.status.loadingItem = "";
        this.isLoading = false;
      }
    },
    async addCouponCode() {
      const couponCode = {
        code: this.couponCode,
      };
      this.isLoading = true;
      try {
        await applyCoupon(couponCode);
        this.getCart();
      } catch (error) {
        console.error("加入優惠券失敗:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
