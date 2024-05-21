<template>
  <div>
    <div class="nav">
      <div class="logo">
        <RouterLink :to="{name: 'home'}"><img src="../assets/homelogo.svg" alt="home"></RouterLink>
      </div>
      <div  v-if="accountStore.isLogin" class="d-flex align-items-center">
        <div class="me-4">
          <RouterLink class="my-page" :to="{name: 'my-page', params:{'username': accountStore.userName}}"> {{ accountStore.userName }} </RouterLink>
        </div>
        <div class="logout">
          <RouterLink class="account" :to="{name: 'account'}" @click="logout">로그아웃</RouterLink>
        </div>
        
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
import { RouterLink, useRouter } from 'vue-router';

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
  border-bottom: 2px solid #30303063;
}
.my-page {
  color: black;
  text-decoration: none;
  font-family: 'NEXON Lv2 Gothic';
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 5px;
  border-bottom: 3px solid black;
}
.my-page:hover {
  color: #3FCEF6;
  border-color: #3FCEF6;;
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