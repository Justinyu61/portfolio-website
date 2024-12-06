<template>

  <div class="header">
    <div class="header-container" :class="{ 'scroll-nav': scrollNav }">
      <div class="header__hide-box">
      </div>
      <div class="header__logo">
        <router-link to="/">
          <img src="../assets/image/Logo.jpg" alt>
        </router-link>
      </div>
      <div class="header__mini-bar">
        <div class="mini-user">
          <router-link to="/login" class="btn mini-user__img">
            <font-awesome-icon :icon="['fas', 'user']" />
          </router-link>
        </div>
        <div class="mini-cart">
          <div class="container">
            <div class="cartIcon">
              <button class="btn cartIcon__img" @click="sideCartToggle">
                <font-awesome-icon :icon="['fas', 'bag-shopping']" />
              </button>
              <div class="icon-num" v-if="cartStore.cartLength !== 0">
                <p>{{ cartStore.cartLength }}</p>
              </div>
              <div class="icon-null" v-else>
                <p>{{ cartStore.cartLength }}</p>
              </div>
            </div>
            <transition name="sideCart" v-show="sideCart">
              <div class="cart-wrap">
                <div class="cart-container">
                  <div class="cart-header">
                    <h2>
                      <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                      購物車
                    </h2>
                    <a href="#" @click.prevent="sideCartToggle">
                      <font-awesome-icon :icon="['fas', 'xmark']" />
                    </a>
                  </div>
                  <h3 v-if="cartStore.cartLength === 0">購物車是空的喲!</h3>
                  <div class="cart-item" v-for="item in cartStore.cartList" :key="item.id">
                    <div class="cart-photo">
                      <img :src="item.product.imageUrl" alt="">
                    </div>
                    <div class="cart-text">
                      <h3> {{ item.product.title }} </h3>
                      <div class="num">
                        <h4> {{ item.qty }} 件</h4>
                        <h4>NT {{ $filters.currency(item.total) }} 元</h4>
                      </div>
                    </div>
                    <button type="button" class="cart-del" :disabled="cartStore.status.loadingItem === item.id"
                      @click="cartStore.deleteCartItem(item.id)">
                      <font-awesome-icon :icon="['fas', 'spinner']" v-if="cartStore.status.loadingItem === item.id" />
                      <font-awesome-icon :icon="['fas', 'trash-can']" v-else />
                    </button>
                  </div>
                  <div class="cart-footer" v-if="cartStore.cartLength !== 0">
                    <h4>小計</h4>
                    <h5>$ {{ $filters.currency(cartStore.total) }}</h5>
                  </div>
                  <div class="cart-checkout" v-if="cartStore.cartLength !== 0" @click="cartCheckout">
                    <router-link to="/cart/cartPage">
                      <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                      結帳
                    </router-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-container">
      <nav class="navbar navbar-expand-lg navbar-light scroll-menu">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#my-nav"
            aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse nav-hide" id="my-nav">
            <ul class="navbar-nav">
              <li class="nav-item"><router-link to="/" class="nav-link active" @click="hideNenu">首頁</router-link></li>
              <li class="nav-item"><router-link to="/products/productsIndex" class="nav-link"
                  @click="hideNenu">全部商品</router-link></li>
              <li class="nav-item"><router-link to="/trivia" class="nav-link" @click="hideNenu">香氛小知識</router-link></li>
              <!--              <li class="nav-item"><router-link to="/" class="nav-link" @click="hideNenu">關於我們</router-link></li>-->
              <li class="nav-item"><router-link to="/cart/cartPage" class="nav-link" @click="hideNenu">購物車</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import emitter from '@/methods/getEmitter';
import $ from 'jquery'


const cartStore = useCartStore();

const sideCart = ref(false);
const scrollNav = ref(false); // 控制頁面高度
const screenWidth = ref(''); // 頁面寬度

const screenSize = () => {
  screenWidth.value = window.innerWidth;
}

const updateCartHandler = (data) => {
  cartStore.updateCartItem(data);
}

const sideCartToggle = () => {
  sideCart.value = !sideCart.value
}

const updateScroll = () => {
  const scrollPosition = window.scrollY;
  // console.log(scrollPosition)
  if (scrollPosition > 50) {
    scrollNav.value = true;
    return;
  }
  scrollNav.value = false;
}

const cartCheckout = () => {
      sideCart.value = false;
    }

const hideNenu = () => {
  // $('.nav-hide').collapse('hide');
}

onMounted(() => {
  cartStore.getCart();
  emitter.on('updateCartItem', updateCartHandler);
  window.addEventListener('resize', screenSize);
})

onBeforeUnmount(() => {
  window.addEventListener('scroll', updateScroll);
})
</script>



<style lang="scss" scoped>
@use "@/assets/css/userHeader/navbar.scss" as *;
@use "@/assets/css/userHeader/miniCart.scss" as *;
@use "@/assets/css/userHeader/header.scss" as *;
</style>
