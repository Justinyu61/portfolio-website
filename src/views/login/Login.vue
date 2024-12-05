<template>
  <div class="wrap">
    <div class="container">
      <form class="form-place" @submit.prevent="signIn">
        <div class="login-place">
          <h2 class="">後台管理員</h2>
          <p>請先登入:</p>
          <div class="mb-2">
            <label for="inputEmail" class="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required
              autofocus
              v-model="username"
            />
          </div>
          <div class="mb-2">
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
              v-model="password"
            />
          </div>

          <div class="linkBtn">
            <router-link class="btn btn-outline-secondary " to="/">返回首頁</router-link>
            <button class="btn btn-primary" type="submit">登入</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'

const useLoginEffect = () => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })

  const signIn = async () => {
    try {
      const result = await post('admin/signin', {
        username: data.username,
        password: data.password
      })
      if (result?.data?.success) {
        const { token, expired } = result.data
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
        console.log('登入成功')
        await router.push('/dashboard/products')
      }
    } catch (e) {
      console.log(e)
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, signIn }
}

export default {
  name: 'Login-view',
  // data () {
  //   return {
  //     user: {
  //       username: '',
  //       password: ''
  //     }
  //   }
  // },
  // methods: {
  //   signIn () {
  //     const loginApi = `${import.meta.env.VITE_API}admin/signin`
  //     // console.log(loginApi)
  //     this.$http.post(loginApi, this.user)
  //       .then((res) => {
  //         console.log(res)
  //         if (res.data.success) {
  //           const { token, expired } = res.data
  //           console.log(token, expired)
  //           document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
  //           console.log('登入成功')
  //           this.$router.push('/dashboard/products')
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }
  setup () {
    const { username, password, signIn } = useLoginEffect()
    return {
      username,
      password,
      signIn
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/login/login.scss" as *;
</style>
