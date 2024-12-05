<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th width="160">Email</th>
        <th width="160">購買紀錄</th>
        <th width="80">應付金額</th>
        <th width="80">是否已付款</th>
        <th width="100">編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
      <tr >
        <td>{{ $filters.date(item.create_at) }}</td>
        <td><span v-text="item.user.email" v-if="item.user"></span></td>
        <td>
          <ul  class="list-unstyled">
            <li v-for="(product, i) in item.products" :key="i">
              {{ product.product.title }}
              數量: {{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </td>
        <td class="text-right">{{ item.total }}</td>
        <td>
          <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid" @change="updatePaid(item)">
          <label class="form-check-label" :for="`paidSwitch${item.id}`">
          <span class="text-success" v-if="item.is_paid">已付款</span>
          <span class="text-muted" v-else>未付款</span>
          </label>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">檢視</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteOrderModal(item)">刪除</button>
          </div>
        </td>
      </tr>
      </template>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  <OrderModal ref="orderModal" :product="tempOrder" @update-paid="updatePaid"></OrderModal>
  <DeleteModal ref="deleteModal" :item="tempOrder" @delete-item="deleteOrder"></DeleteModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/modalController/OrderModal.vue'
import DeleteModal from '@/components/modalController/DeleteModal.vue'
export default {
  name: 'Orders-view',
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
      isLoading: false,
      isNew: false,
      currentPage: 1
    }
  },
  components: {
    Pagination,
    OrderModal,
    DeleteModal
  },
  methods: {
    getOrders (Page = 1) {
      this.currentPage = Page
      const orderApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/orders?page=${Page}`
      // console.log(orderApi)
      this.isLoading = true
      this.$http.get(orderApi)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data)
            this.orders = res.data.orders
            this.pagination = res.data.pagination
            this.isLoading = false
          }
        })
    },
    openModal (isNew, item) {
      this.tempOrder = { ...item }
      this.isNew = isNew
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    deleteOrderModal (item) {
      this.tempOrder = { ...item }
      const deleteComponent = this.$refs.deleteModal
      deleteComponent.showModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const updateOrderApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(updateOrderApi, { data: paid })
        .then((res) => {
          this.isLoading = false
          this.getOrders()
          this.$httpMsgState(res, '更新付款狀態')
        })
    },
    deleteOrder () {
      const deleteOrderApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(deleteOrderApi)
        .then((res) => {
          const deleteComponent = this.$refs.deleteModal
          deleteComponent.hideModal()
          this.getOrders(this.currentPage)
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>
