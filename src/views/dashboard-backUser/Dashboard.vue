<template>
  <Navbar></Navbar>
  <div class="container-fluid  position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, provide } from 'vue';
import emitter from '@/methods/getEmitter';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Navbar from '@/components/AdminHeader.vue';
import ToastMessages from '@/components/toastMessageController/ToastMessages.vue';

const router = useRouter();

provide('emitter', emitter);

onMounted(() => {
  //設置全局的 Authorization 請求頭
  axios.defaults.headers.common.Authorization = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  const customerApi = `${import.meta.env.VITE_API}api/user/check`;

  axios
    .post(customerApi)
    .then((res) => {
      if (!res.data.success) {
        router.push('/login');
      }
    })
    .catch((err) => {
      console.error('验证用户失败:', err);
    });
})
</script>

<style lang="scss" scoped>
.container-fluid {
  margin-top: 140px;
}
</style>
