<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <h2>購物車</h2>
    <div class="stepper">
      <ul>
        <li >Step 1 <br>確認購物車</li>
        <div class="arrowIconRight">
        <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
        </div>
        <div class="arrowIconDown">
          <font-awesome-icon  :icon="['fas', 'arrow-down']"/>
        </div>
        <li >Step 2 <br>填寫資料</li>
        <div class="arrowIconRight">
          <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
        </div>
        <div class="arrowIconDown">
          <font-awesome-icon  :icon="['fas', 'arrow-down']"/>
        </div>
        <li>Step 3 <br>完成訂單</li>
      </ul>
    </div>
    <div class="cartBody">
      <div class="product-table" v-for="item in cart.carts" :key="item.id">
<!--        <button type="button" class="btn btn-outline-danger btn-sm cancel-btn" @click="removeCartItem(item.id)">-->
<!--          <i class="bi bi-x"></i>-->
<!--        </button>-->
        <div class="product-img">
          <img :src="item.product.imageUrl" alt="">
        </div>
        <div class="product-title">
          <h3>{{ item.product.title }}</h3>
        </div>
        <div class="product-qty">
          <button class="btn" @click="minus(item)">
            <font-awesome-icon :icon="['fas', 'minus']"/>
          </button>
          <input type="number" min="1" v-model="item.qty" @change="updateCartItem(item)">
          <button class="btn" @click="plus(item)">
            <font-awesome-icon :icon="['fas', 'plus']"/>
          </button>
        </div>
        <div class="mobile-style">
        <div class="product-price">
          <h4>${{ item.product.price }}元 / 件</h4>
          <small v-if="item.coupon" class="text-success">折扣價：</small>
            小計: ${{ $filters.currency(item.final_total)}}元
        </div>
        <button type="button" class="cart-del"  :disabled="this.status.loadingItem === item.id" @click="removeCartItem(item.id)">
          <font-awesome-icon :icon="['fas', 'spinner']" v-if="this.status.loadingItem === item.id"/>
          <font-awesome-icon :icon="['fas', 'trash-can']" v-else/>
        </button>
      </div>
      </div>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
      <div class="total-price">
        <div class="discount" v-if="cart.final_total !== cart.total">
        <h4>總計: ${{ $filters.currency(cart.total) }}元</h4>
        <strong>
          折扣後: ${{ $filters.currency(cart.final.total) }}元
        </strong>
          </div>
        <h4>總計: ${{ $filters.currency(cart.total) }}元</h4>
      </div>
    </div>
    <div class="linkBtn">
      <router-link class="btn btn-outline-secondary linkBtn__returnProduct" to="/products/productsIndex">繼續購物</router-link>
      <router-link class="btn btn-danger linkBtn__goCheck" to="/cart/userCheck">送出訂單</router-link>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'CartPage',
  data () {
    return {
      isLoading: false,
      cart: {},
      status: {
        loadingItem: ''// 讀取效果
      },
      coupon_code: ''
    }
  },
  methods: {
    getCart () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(getCartApi)
        .then((res) => {
          if (res.data.data.carts.length !== 0) {
            // console.log('getCart:', res.data.data)
            this.cart = res.data.data
            this.isLoading = false
          } else {
            this.$router.push('/products/productsIndex')
          }
        })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const deleteItemApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(deleteItemApi)
        .then((res) => {
          // console.log('deleteItem', res)
          this.$httpMsgState(res, '產品移除')
          this.isLoading = false
          this.status.loadingItem = ''
          this.getCart()
        })
    },
    minus (item) {
      item.qty -= 1
      this.updateCartItem(item)
    },
    plus (item) {
      item.qty += 1
      this.updateCartItem(item)
    },
    updateCartItem (item) {
      const updateCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(updateCartApi, { data: cart })
        .then((res) => {
          // console.log('update', res)
          this.status.loadingItem = ''
          this.getCart()
        })
    },
    addCouponCode () {
      const addCouponCodeApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const couponCode = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(addCouponCodeApi, { data: couponCode })
        .then((res) => {
          // console.log('coupon', res)
          this.$httpMsgState(res, '加入優惠券')
          this.getCart()
          this.isLoading = false
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/cartCss/cartPage.scss" as *;
@use "@/assets/css/cartCss/stepper.scss" as *;
@use "@/assets/css/cartCss/sameCssForCart.scss" as *;
</style>
