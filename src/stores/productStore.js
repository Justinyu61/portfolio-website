import { defineStore } from "pinia";
import { getAllProducts, getProductById } from "@/api/productApi";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    product: {},
    products: [],
    status: {
      // 對應的品項id
      loadingItem: "",
    },
    isLoading: false,
  }),
  getters: {},
  actions: {
    async getAllProducts() {
      this.isLoading = true;
      try {
        const res = await getAllProducts();
        this.products = res.data.products;
      } catch (e) {
        this.handlerErrorMsg("產品載入失敗", e);
      } finally {
        this.isLoading = false;
      }
    },
    async getProductById(id) {
      this.isLoading = true;
      try {
        const res = await getProductById(id);
        if (res.data.success) {
          this.product = res.data.product;
          // this.handlerErrorMsg(res, '顯示')
          this.isLoading = false;
        }
      } catch (e) {
        console.warn("產品載入失敗", e);
      }
    },
  },
});
