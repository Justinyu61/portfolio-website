<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openProductModal(true)">
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="100">分類</th>
        <th width="200">產品名稱</th>
        <th width="120">圖片</th>
        <th width="100">品牌</th>
        <th width="100">原價</th>
        <th width="100">售價</th>
        <th width="100">件數</th>
        <th width="100">是否啟用</th>
        <th width="80">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td><img class="img-fluid" style="max-width: 60%;" :src="item.imageUrl" alt=""></td>
        <td>{{ item.category}}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>{{ item.unit }}</td>
        <td>
          <span class="text-success" v-if=" item.is_enabled ">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openProductModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DeleteModal ref="deleteModal" :item="tempProduct" @delete-item="deleteProduct"></DeleteModal>
  </div>
</template>

<script>
import ProductModal from '@/components/modalController/ProductModal.vue'
import DeleteModal from '@/components/modalController/DeleteModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Products-view',
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  components: {
    ProductModal,
    DeleteModal,
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const productsApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`
      // console.log(productsApi)
      this.isLoading = true
      this.$http.get(productsApi)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            console.log(res.data)
          }
        })
    },
    openProductModal (isNew, item) {
      // console.log(isNew, item) // 確認點擊以及有無帶入產品
      if (isNew) { // 假設是新的產品 (isNew為true狀態)
        this.tempProduct = {} // 會帶入空的物件
      } else { // 如果isNew = false的狀態
        this.tempProduct = { ...item } // 這個tempProduct為新的item( 將item展開取出)
      }
      this.isNew = isNew // 並且把剛剛的狀態存起來
      const productComponent = this.$refs.productModal
      productComponent.showModal()
      this.isLoading = false
    },
    updateProduct (item) {
      this.tempProduct = item
      // console.log(this.tempProduct)
      // 新增
      let updateProductsApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`
      // console.log(updateProductsApi)
      let httpMethod = 'post'
      this.isLoading = true
      // 編輯
      if (!this.isNew) {
        updateProductsApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
        this.isLoading = true
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](updateProductsApi, { data: this.tempProduct })
        .then((res) => {
          // console.log(res)
          productComponent.hideModal()
          this.getProducts()
          this.$httpMsgState(res, '更新產品')
        })
      // console.log(item)
      this.isLoading = false
    },
    deleteProductModal (item) {
      this.tempProduct = { ...item }
      const deleteComponent = this.$refs.deleteModal
      deleteComponent.showModal()
    },
    deleteProduct () {
      const deleteProductApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(deleteProductApi)
        .then((res) => {
          // console.log(res.data)
          const deleteComponent = this.$refs.deleteModal
          deleteComponent.hideModal()
          this.getProducts()
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
