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
        <div class="username">
          <input class="input-data" type="text" placeholder="닉네임" v-model.trim="username">
          <p class="text-center text-warning" v-if="usenameCheck">
            <img src="../assets/account/waring.svg" alt="#">  
            {{ usenameCheck }}
          </p>
        <div class="password">
          <input class="input-data" type="password" placeholder="비밀번호" v-model.trim="password1">
          <p class="text-center text-warning" v-if="passwordCheck">
            <img src="../assets/account/waring.svg" alt="#">  
            {{ passwordCheck }}
          </p>
        </div>
        </div>
        <div class="password2">
          <input class="input-data" type="password" placeholder="비밀번호 확인" :class="isPasswordCheck" v-model.trim="password2">
          <p class="text-center text-warning" v-if="passwordCheck2">
            <img src="../assets/account/waring.svg" alt="#">  
            {{ passwordCheck2 }}
          </p>
        </div>

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
const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
const username = ref(null)
const usenameCheck = ref(null)
const passwordCheck = ref(null)
const passwordCheck2 = ref(null)
const password1 = ref(null)
const password2 = ref(null)

const loginOrSingupCheck = ref(true)

const loginOrSignUp = function () {
  usenameCheck.value = null
  passwordCheck.value = null
  passwordCheck2.value = null
  console.log(username.value)
  if (regExp.test(username.value)){
    usenameCheck.value = '닉네임에 특수문자를 빼주세요!'
    console.log(username.value)
    loginOrSingupCheck.value = false
  } else if (username.value === '') {
    usenameCheck.value = '닉네임을 입력해주세요!'
    loginOrSingupCheck.value = false
  }
   if (password1.value === '') {
    passwordCheck.value = '비밀번호를 입력해주세요!'
    loginOrSingupCheck.value = false
  } else if (activeSingUp.value === 'active' && password1.value !== password2.value) {
    passwordCheck2.value = '비밀번호와 일치하지 않습니다!'
    loginOrSingupCheck.value = false
  } 

  if (loginOrSingupCheck.value) {
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
      console.log(payload)
      accountStore.login(payload)
    }
  }

  username.value = ''
  password1.value = ''
  password2.value = ''
  
  loginOrSingupCheck.value = true
}


const activeChangeSingUp = function () {
  if (activeSingUp.value === 'non-active'){
    activeSingUp.value = 'active'
    activeSingIn.value = 'non-active'
    isPasswordCheck.value = ''
    username.value = ''
    password1.value = ''
    password2.value = ''
    usenameCheck.value = null
    passwordCheck.value = null
    passwordCheck2.value = null
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
    usenameCheck.value = null
    passwordCheck.value = null
    passwordCheck2.value = null
  }
  buttonVal.value = '로그인'
}

</script>

<style scoped>
.username, .password, .password2 {
  position: relative;
}

form p {
  position: absolute;
  top: 40px;
  left: 50px;
}
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

form  .input-data {
  width: 80%;
  height: 40px;

  font-size: 20px;
  font-family: 'NEXON Lv2 Gothic';
  font-weight: bold;

  display: block;
  margin: 40px auto;
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
  margin: 40px auto;
  padding-left: 10px;
  cursor: pointer;

  
  border-radius: 10px;
  border-color: #7793fa;
  background-color: #9fb5ff;

}
</style>