<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModel(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title}}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1 " class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openCouponModel(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempDiscount" ref="couponModal" @update-coupon="updateCoupon"></CouponModal>
    <DeleteModal :item="tempDiscount" ref="deleteModal" @delete-item="deleteCoupon"></DeleteModal>
    <Pagination :pages="pagination" @emit-pages="getCoupons"></Pagination>
  </div>
</template>

<script>
import CouponModal from '@/components/modalController/CouponModal.vue'
import DeleteModal from '@/components/modalController/DeleteModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Discount-view',
  data () {
    return {
      coupons: {},
      tempDiscount: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false,
      pagination: {}
    }
  },
  components: {
    CouponModal,
    DeleteModal,
    Pagination
  },
  methods: {
    openCouponModel (isNew, item) {
      // console.log(isNew, item)
      this.isNew = isNew
      if (this.isNew) {
        this.tempDiscount = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempDiscount = { ...item }
      }
      this.$refs.couponModal.showModal()
      this.isLoading = false
    },
    getCoupons (page = 1) {
      this.isLoading = true
      const CouponsApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupons?page=${page}`
      this.$http.get(CouponsApi, this.tempDiscount)
        .then((res) => {
          // console.log(res)
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },
    updateCoupon (tempDiscount) {
      if (this.isNew) {
        const createCouponApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon`
        this.$http.post(createCouponApi, { data: tempDiscount })
          .then((res) => {
            // console.log(res, tempDiscount)
            this.$httpMsgState(res, '新增優惠券')
            this.getCoupons()
            this.$refs.couponModal.hideModal()
          })
      } else {
        const resetCouponApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon/${this.tempDiscount.id}`
        this.$http.put(resetCouponApi, { data: tempDiscount })
          .then((res) => {
            // console.log(res)
            this.$httpMsgState(res, '更新優惠券')
            this.getCoupons()
            this.$refs.couponModal.hideModal()
          })
      }
    },
    deleteCouponModal (item) {
      this.tempDiscount = { ...item }
      const deleteComponent = this.$refs.deleteModal
      deleteComponent.showModal()
    },
    deleteCoupon () {
      const deleteCouponsApi = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon/${this.tempDiscount.id}`
      this.isLoading = true
      this.$http.delete(deleteCouponsApi)
        .then((res) => {
          this.$httpMsgState(res, '刪除優惠券')
          const deleteComponent = this.$refs.deleteModal
          deleteComponent.hideModal()
          this.getCoupons()
        })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
