<template>
  <div class="position-relative ">
    <ToastMessages></ToastMessages>
  </div>
  <router-view />
</template>

<script setup>
import emitter from '@/methods/getEmitter'
import ToastMessages from '@/components/toastMessageController/ToastMessages.vue'
import { provide } from 'vue';

provide('emitter', emitter)
</script>

<style scoped></style>
