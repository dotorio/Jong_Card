<template>
  <div>
    <div class="container">
      <div class="logo">
        <RouterLink :to="{name: 'home'}"><img src="../assets/account/logo.svg" alt="home"></RouterLink>
      </div>
      <div v-if="accountStore.isLogin" class="logout">
        <a href="" @click="logout">로그아웃</a>
      </div>
      <div v-else class="login">
        <RouterLink :to="{name: 'account'}">로그인/회원가입</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import AccountViewVue from '@/views/AccountView.vue';
import { RouterLink } from 'vue-router';

const accountStore = useAccountStore()

const logout = function () {
  accountStore.logout()
}
</script>

<style scoped>
.container {
  height: 80px;
  padding: 0 20px 0 20px;
  /* background-color: blueviolet; */
  border-bottom: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>