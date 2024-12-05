<template>
  <Loading :active="cartStore.isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <h2>購物車</h2>
      <div class="stepper">
        <ul>
          <li>Step 1 <br>確認購物車</li>
          <div class="arrowIconRight">
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
          <div class="arrowIconDown">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </div>
          <li>Step 2 <br>填寫資料</li>
          <div class="arrowIconRight">
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
          <div class="arrowIconDown">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </div>
          <li>Step 3 <br>完成訂單</li>
        </ul>
      </div>
      <div class="cartBody">
        <div class="product-table" v-for="item in cartStore.cartList" :key="item.id">
          <!-- <button type="button" class="btn btn-outline-danger btn-sm cancel-btn" @click="removeCartItem(item.id)">
         <i class="bi bi-x"></i>
       </button> -->
          <div class="product-img">
            <img v-if="item.product.imageUrl" :src="item.product.imageUrl" alt="">
            <p v-else>No image available</p>
          </div>
          <div class="product-title">
            <h3>{{ item.product.title }}</h3>
          </div>
          <div class="product-qty">
            <button class="btn" @click="cartStore.minus(item)">
              <font-awesome-icon :icon="['fas', 'minus']" />
            </button>
            <input type="number" min="1" v-model="item.qty" @change="cartStore.updateCartItem(item)">
            <button class="btn" @click="cartStore.plus(item)">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
          </div>
          <div class="mobile-style">
            <div class="product-price">
              <h4>${{ item.product.price }}元 / 件</h4>
              <small v-if="item.coupon" class="text-success">折扣價：</small>
              小計: ${{ $filters.currency(item.final_total) }}元
            </div>
            <button type="button" class="cart-del" :disabled="cartStore.status.loadingItem === item.id"
              @click="cartStore.removeCartItem(item.id)">
              <font-awesome-icon :icon="['fas', 'spinner']" v-if="cartStore.status.loadingItem === item.id" />
              <font-awesome-icon :icon="['fas', 'trash-can']" v-else />
            </button>
          </div>
        </div>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="cartStore.couponCode" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="cartStore.addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
        <div class="total-price">
          <div class="discount" v-if="cartStore.finalTotal !== cartStore.total">
            <h4>總計: ${{ $filters.currency(cartStore.total) }}元</h4>
            <strong>
              折扣後: ${{ $filters.currency(cartStore.finalTotal) }}元
            </strong>
          </div>
          <div v-else>
            <h4>總計: ${{ $filters.currency(cartStore.total) }}元</h4>
          </div>
        </div>
      </div>
      <div class="linkBtn">
        <router-link class="btn btn-outline-secondary linkBtn__returnProduct"
          to="/products/productsIndex">繼續購物</router-link>
        <router-link class="btn btn-danger linkBtn__goCheck" to="/cart/userCheck"
          :disabled="cartStore.cartLength === 0">送出訂單</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
cartStore.getCart()
</script>

<style lang="scss" scoped>
@use "@/assets/css/cartCss/cartPage.scss" as *;
@use "@/assets/css/cartCss/stepper.scss" as *;
@use "@/assets/css/cartCss/sameCssForCart.scss" as *;
</style>
