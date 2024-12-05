<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <h2>資料確認</h2>
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
    <div class="mt-5 row justify-content-center">
    <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3 w-100">
        <label for="email" class="form-label text-control">Email:</label>
        <Field id="email" name="email" type="email" placeholder="請輸入 Email" class="form-control" :class="{ 'is-invalid': errors['email'] }" rules="email|required" v-model="form.user.email"></Field>
        <ErrorMessage name="" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label text-control">收件人姓名:</label>
        <Field id="name" name="姓名" type="text" placeholder="請輸入 姓名" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" rules="required" v-model="form.user.name"></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label text-control">收件人電話:</label>
        <Field id="tel" name="電話" type="tel" placeholder="請輸入 電話" class="form-control" :class="{ 'is-invalid': errors['電話'] }" rules="required" v-model="form.user.tel"></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label text-control">收件人地址:</label>
        <Field id="address" name="地址" type="text" placeholder="請輸入 地址" class="form-control" :class="{ 'is-invalid': errors['地址'] }" rules="required" v-model="form.user.address"></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label text-control">留言</label>
        <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="linkBtn">
        <router-link class="btn btn-outline-secondary linkBtn__returnProduct" to="/cart/cartPage">返回購物車</router-link>
        <button class="btn btn-danger linkBtn__goCheck">送出訂單</button>
      </div>
    </Form>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'UserCheck',
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false
    }
  },
  methods: {
    createOrder () {
      const postOrder = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order`
      this.isLoading = false
      const order = this.form
      this.$http.post(postOrder, { data: order })
        .then((res) => {
          // console.log(res)
          this.isLoading = false
          const orderId = res.data.orderId
          this.$router.push(`./order/${orderId}`)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/cartCss/userCheck.scss" as *;
@use "@/assets/css/CartCss/stepper.scss" as *;
@use "@/assets/css/CartCss/sameCssForCart.scss" as *;
</style>
