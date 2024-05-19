<template>
  <div>
    <div class="nav">
      <div class="logo">
        <RouterLink :to="{name: 'home'}"><img src="../assets/homelogo.svg" alt="home"></RouterLink>
      </div>
      <div v-if="accountStore.isLogin" class="logout">
        <a class="account" href="" @click="logout">로그아웃</a>
      </div>
      <div v-else class="login">
        <RouterLink class="account" :to="{name: 'account'}">로그인/회원가입</RouterLink>
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
.nav {
  height: 80px;
  padding: 0 20px 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.account {
  transition: all 0.2s;
  display: inline-block;
  padding: 10px;
  text-decoration: none;
  color: black;
  font-family: 'NEXON Lv2 Gothic';
  font-size: 15px;
  font-weight: 700;

  border: 3px solid black;
  border-radius: 20px;
}

.account:hover {
  transition: all 0.2s;
  color: #3FCEF6;
  border-color: #3FCEF6;
  background-color: #A7E7F6;
}
</style>