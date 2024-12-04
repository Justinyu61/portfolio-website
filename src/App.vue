<template>
  <UserHeader/>
  <router-view></router-view>
  <UserFooter/>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import UserFooter from '@/components/UserFooter.vue'


export default {
  components: {
    UserHeader,
    UserFooter
  }
}
</script>

<style lang="scss">
@import "@/assets/all.scss";
</style>
