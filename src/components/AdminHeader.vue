<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">這裡是LOGO</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="navbar-nav">
        <router-link to="/dashboard/discount" class="nav-link">優惠券</router-link>
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar-view',
  methods: {
    logout () {
      const logoutApi = `${import.meta.env.VITE_API}logout`
      // console.log(logoutApi)
      this.$http.post(logoutApi, this.user)
        .then((res) => {
          if (res.data.success) {
            // console.log(res)
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
