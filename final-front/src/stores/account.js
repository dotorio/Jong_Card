import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useArticleStore } from './article'

// router.push({ name: 'home' })
export const useAccountStore = defineStore('account', () => {
  const router = useRouter()
  const userList = ref(null)
  const userName = ref(null)
  const API_URL = 'http://127.0.0.1:8000'
  const articleStore = useArticleStore()

  const isLogin = ref(false)

  const getUserList = function () {
    axios({
      method: 'get',
      url: `${API_URL}/user/`
    })
      .then(res => {
        userList.value = res.data
        articleStore.getArticle()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const signUp = function (payload) {
    const username = payload.username
    const password1 = payload.password1
    const password2 = payload.password2
    

    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
      .then(res => {
        console.log('회원가입 완료!')
        const payload = {
          username: username,
          password: password1
        }
        login(payload)
        

      })
      .catch(err => {
        console.log(err)
      })

  }
  
  const login = function (payload) {
    const username = payload.username
    const password = payload.password

    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
      .then(res => {  
        router.push({  name: 'home' } )
        userName.value = username
        console.log('로그인 완료!')
        isLogin.value = res.data
      })
      .catch(err => {
        console.log(err)
      })

  }
  const articleWrite = function (username) {
    userName.value = username
  }

  const logout = function () {
    isLogin.value = null
    userName.value = null
  }


  return { userName, userList, isLogin, getUserList, signUp, login, logout, articleWrite }
}, { persist: true })
