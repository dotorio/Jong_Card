<template>
  <div>
    <div class=account-container>
      <img src="../assets/account/logo.svg" alt="logo">
      <div class="account-header" >
        <AccountHeader 
        show-type="signup" position="left-bar" :active="activeSingUp"
        @click="activeChangeSingUp"
        />
        <AccountHeader 
        show-type="signin" position="right-bar" :active="activeSingIn"
        @click="activeChangeSingIn"
        />
      </div>
      <form action="" @submit.prevent="loginOrSignUp">
        <input class="input-data" type="text" placeholder="닉네임" v-model.trim="username">
        <input class="input-data" type="password" placeholder="비밀번호" v-model.trim="password1">
        <input class="input-data" type="password" placeholder="비밀번호 확인" :class="isPasswordCheck" v-model.trim="password2">

        <input type="submit" :value="buttonVal">
      </form>
    </div>
  </div>
</template>

<script setup>
import AccountHeader from '@/components/account/AccountHeader.vue';
import { useAccountStore } from '@/stores/account';
import { ref } from 'vue';

const accountStore = useAccountStore()



const activeSingUp = ref('active')
const activeSingIn = ref('non-active')
const isPasswordCheck = ref('')
const buttonVal = ref('회원가입')

const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)

const loginOrSignUp = function () {
  if (activeSingUp.value === 'active') {
    console.log('회원가입 시도중!')
    const payload = {
      username: username.value,
      password1: password1.value,
      password2: password2.value
    }
    accountStore.signUp(payload)
  } else if (activeSingIn.value === 'active') {
    console.log('로그인 시도중!')
    const payload = {
      username: username.value,
      password: password1.value
    }
    accountStore.login(payload)
  }

  username.value = ''
  password1.value = ''
  password2.value = ''
}


const activeChangeSingUp = function () {
  if (activeSingUp.value === 'non-active'){
    activeSingUp.value = 'active'
    activeSingIn.value = 'non-active'
    isPasswordCheck.value = ''
    username.value = ''
    password1.value = ''
    password2.value = ''
  }
  buttonVal.value = '회원가입'
  
}

const activeChangeSingIn = function () {
  if (activeSingIn.value === 'non-active'){
    activeSingIn.value = 'active'
    activeSingUp.value = 'non-active'
    isPasswordCheck.value = 'show-none'
    username.value = ''
    password1.value = ''
    password2.value = ''
  }
  buttonVal.value = '로그인'
}

</script>

<style scoped>
.account-container {
  margin: 250px auto;
  width: 350px;
  /* height: 320px; */
  position: relative;
}
.account-container > form {
  border: 1px solid #597BF6;
  border-radius: 10px;
}
.account-container > img {
  position: absolute;
  top: -200px;
  left: 132px;
}
.show-none {
  display: none !important;
}

form > .input-data {
  width: 80%;
  height: 40px;

  font-size: 20px;
  font-family: 'NEXON Lv2 Gothic';
  font-weight: bold;

  display: block;
  margin: 30px auto;
  padding-left: 10px;

  border: 1px solid #597BF6;
  border-radius: 10px;
}
input[type="submit"] {
  
  width: 80%;
  height: 40px;

  font-size: 20px;
  font-family: 'NEXON Lv2 Gothic';
  font-weight: bold;
  color: white;

  display: block;
  margin: 30px auto;
  padding-left: 10px;
  cursor: pointer;

  
  border-radius: 10px;
  border-color: #7793fa;
  background-color: #9fb5ff;

}
</style>