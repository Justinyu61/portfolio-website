<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <div class="productItem">
    <div class="product-img">
        <img :src="product.imageUrl" alt="">
    </div>
    <div class="product__info">
<!--      <h2>{{ product.category }}</h2>品牌1-->
<!--      <p>{{ product.title }}</p>品名2-->
<!--      <br>-->
<!--      <h3>{{ product.description }}</h3>介紹3-->
<!--      <span>{{ product.content }}</span>內容物4-->
<!--      <br>-->
<!--      <h4>售價 : {{ product.origin_price }} 元</h4> 售價5-->
<!--      <div class="product-info__btn-place" v-if="product.price">-->
<!--                <button type="button" class="btn btn-outline-secondary"-->
<!--                        @click="returnProducts">-->
<!--                  返回商品頁-->
<!--                </button>-->
<!--                <button type="button" class="btn btn-outline-danger "-->
<!--                        @click="addToCart(product.id)">-->
<!--                  加到購物車-->
<!--                </button>-->
<!--      </div>-->
      <div class="product__info--category">
        <h2>{{ product.category }}</h2>
      </div>
      <div class="product__info--title">
        <p>{{ product.title }}</p>
      </div>
      <div class="product__info--originPrice">
        <h4>NT$ {{ product.origin_price }} 元</h4>
      </div>
      <div class="product__info--btnPlace" v-if="product.price">
        <button type="button" class="btn btn-outline-secondary" @click="returnProducts">
          返回商品頁
        </button>
        <button type="button" class="btn btn-outline-danger " @click="addToCart(product.id)">
          加到購物車
        </button>
      </div>
      <div class="product__info--description">
        <h2>商品介紹:</h2>
        <h3>{{ product.description }}</h3>
      </div>
      <div class="product__info--content">
        <h2>主要成分:</h2>
        <h3>{{ product.content }}</h3>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/getEmitter'

export default {
  name: 'ProductItem',
  data () {
    return {
      product: {},
      id: '',
      isLoading: false,
      status: { // 對應的品項id
        loadingItem: ''
      },
      cart: {}
    }
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    getProduct () {
      const getProductItemApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/product/${this.id}`
      // console.log('id:', this.id)
      this.isLoading = true
      this.$http.get(getProductItemApi)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product
            // this.$httpMsgState(res, '顯示')
            this.isLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    returnProducts () {
      this.$router.push('/products/productsIndex')
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
    this.id = this.$route.params.productId
    this.getProduct()
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/pruductCss/productItem.scss" as *;
</style>
