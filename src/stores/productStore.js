import { defineStore } from "pinia";
import { getAllProducts } from "@/api/productApi";

export const useProductStore = defineStore("productStore", {
  state: () => ({
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
      } catch (error) {
        $handlerErrorMsg("產品載入失敗", e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
