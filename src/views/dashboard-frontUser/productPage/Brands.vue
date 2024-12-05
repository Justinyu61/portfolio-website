<template>
  <div class="wrap">
    <div class="banner">
      <div class="banner__text">
        <h2>讓居家的時光<br>從休憩昇華成享受</h2>
      </div>
    </div>
    <div class="container">
    <div class="showProduct">
      <template v-for="item in filterProducts" :key="item.id">
        <div class="showProduct__card" >
          <div class="showProduct__card--img">
            <a href="#" @click.prevent="viewMore(item.id)">
              <img :src="item.imageUrl" alt="">
            </a>
          </div>
            <div class="showProduct__info">
              <div class="infoBox">
              <p class="showProduct__info--content">{{ item.category }}</p>
              <p class="showProduct__info--title">{{ item.title }}</p>
              </div>
              <div class="showProduct__info--price priceBox">
                <h6>價格</h6>
                <p >NT: {{ item.origin_price }} 元</p>
              </div>
            </div>
          <div class="showProduct__footer">
            <div class="showProduct__footer--btn ">
              <button type="button" class="viewMore btn btn-outline-secondary" @click="viewMore(item.id)">
                <font-awesome-icon :icon="['fas', 'search']"/>
                查看更多
              </button>
              <button type="button" class="add-cart btn btn-outline-secondary" @click="addToCart(item.id)">
                <font-awesome-icon class="spinner-color" :icon="['fas', 'spinner']" v-if="this.status.loadingItem === item.id"/>
                <i class="bi bi-cart2" v-else></i>
                加到購物車
              </button>
            </div>
          </div>
<!--          <a class="nav-link" href="#" @click.prevent="logout">登出</a>-->
        </div>
      </template>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
cartStore.getCart()
</script>

<script>

import emitter from '@/methods/getEmitter'

export default {
  name: 'BrandsView',
  data () {
    return {
      allProducts: [],
      products: [],
      brand: {},
      productCategory: '',
      filterProducts: [],
      status: {
        loadingItem: ''
      },
      cart: {}
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  watch: {
    productCategory () {
      this.filterBrands()
    }
  },
  methods: {
    getProducts (page = 1) {
      const getProductItemApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products?page=${page}`
      // console.log('id:', this.id)
      this.isLoading = true
      this.$http.get(getProductItemApi)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.filterProducts = this.products
            this.productCategory = this.$route.query.productCategory
            console.log(this.productCategory)
            // this.$httpMsgState(res, '顯示')
            this.isLoading = false
          }
        })
    },
    filterBrands () {
      const getProductsApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products/all`
      this.isLoading = true
      this.$http.get(getProductsApi)
        .then((res) => {
          this.allProducts = res.data.products
          // console.log(res) // ok
          if (this.productCategory !== '') {
            this.filterProducts = this.allProducts.filter((item) => item.category === this.productCategory)
            console.log(this.filterProducts)
          } else {
            this.filterProducts = this.products
          }
          this.isLoading = false
        })
    },
    viewMore (id) {
      this.$router.push(`/products/product/${id}`)
      // console.log('index:', id)
    },
    addToCart (id, qty = 1) {
      const addToCartApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
      this.isLoading = true
      const toCary = { product_id: id, qty }
      this.$http.post(addToCartApi, { data: toCary })
        .then((res) => {
          // console.log('itemToCart', res)
          this.$httpMsgState(res, '加入購物車')
          this.isLoading = false
          this.status.loadingItem = ''
          emitter.emit('updateCart', this.cart)
        })
    },
    getCart () {
      const getCartApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
      this.isLoading = true
      this.$http.get(getCartApi)
        .then((res) => {
          // console.log('getCart:', res.data.data.carts)
          this.cart = res.data.data
          this.isLoading = false
        })
    }
  },
  created () {
    this.getProducts()
    this.filterBrands()
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/pruductCss/sameCssForproduct.scss" as *;
@use "@/assets/css/pruductCss/brand.scss" as *;
</style>
