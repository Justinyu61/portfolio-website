import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Trivia from '@/views/home/Trivia.vue'
import Login from '@/views/login/Login.vue'
import Dashboard from '@/views/dashboard-backUser/Dashboard.vue'
import Products from '@/views/dashboard-backUser/ProductControler/Products.vue'
import Orders from '@/views/dashboard-backUser/orderConfirmation/Orders.vue'
import Discount from '@/views/dashboard-backUser/discountPage/Discount.vue'
import ProductBoard from '@/views/dashboard-frontUser/productPage/ProductBoard.vue'
import ProductIndex from '@/views/dashboard-frontUser/productPage/ProductPage.vue'
import ProductItem from '@/views/dashboard-frontUser/productPage/ProductItem.vue'
import CartBoard from '@/views/dashboard-frontUser/cartPage/CartBoard.vue'
import CartPage from '@/views/dashboard-frontUser/cartPage/CartPage.vue'
import UserCheck from '@/views/dashboard-frontUser/cartPage/UserCheck.vue'
import FinalOrder from '@/views/dashboard-frontUser/cartPage/FinalOrder.vue'
import Brands from '@/views/dashboard-frontUser/productPage/Brands.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: () => {
    }
  },
  {
    path: '/trivia',
    name: 'Trivia',
    component: Trivia
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: Products
      },
      {
        path: 'orders',
        component: Orders
      },
      {
        path: 'discount',
        component: Discount
      }
    ]
  },
  {
    path: '/products',
    component: ProductBoard,
    children: [
      {
        path: 'productsIndex',
        component: ProductIndex
      },
      {
        path: 'product/:productId',
        component: ProductItem
      },
      {
        path: '/brands',
        component: Brands
      }
    ]
  },
  {
    path: '/cart',
    component: CartBoard,
    children: [
      {
        path: 'cartPage',
        component: CartPage
      },
      {
        path: 'userCheck',
        component: UserCheck
      },
      {
        path: 'order/:orderId',
        component: FinalOrder
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
