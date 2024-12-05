<template>
    <Navbar></Navbar>
  <div class="container-fluid  position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/AdminHeader.vue'
import emitter from '@/methods/getEmitter'
import ToastMessages from '@/components/toastMessageController/ToastMessages.vue'

export default {
  name: 'Dashboard-view',
  components: {
    Navbar,
    ToastMessages
  },
  created () {
    this.$http.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const customerApi = `${import.meta.env.VITE_API}api/user/check`
    // console.log(customerApi)
    this.$http.post(customerApi, this.user)
      .then((res) => {
        // console.log(res)
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  margin-top: 140px;
}
</style>
