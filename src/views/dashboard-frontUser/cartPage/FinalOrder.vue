<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container ">
      <h2>訂單資訊</h2>
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
      <div class="row justify-content-center form-place">
        <form class="col-md-6 " @submit.prevent="payOrder">
          <table class="table align-middle">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td>{{ item.product.title }}</td>
                <td>{{ item.qty }} / 個</td>
                <td class="text-end">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-end">總計</td>
                <td class="text-end">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-end" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalOrder',
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const getOrder = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(getOrder)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order
            // console.log(this.order)
          }
        })
    },
    payOrder () {
      const payOrder = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(payOrder)
        .then((res) => {
          console.log('pay', res)
          if (res.data.success) {
            this.getOrder()
            this.isLoading = false
          }
        })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    // console.log(this.orderId)
    this.getOrder()
  }
}
// -NADWnfd8TtCJnmH4M2o
</script>

<style lang="scss" scoped>
@use "@/assets/css/CartCss/finalOrder.scss" as *;
@use "@/assets/css/CartCss/stepper.scss" as *;
@use "@/assets/css/CartCss/sameCssForCart.scss" as *;
</style>
