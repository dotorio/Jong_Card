import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'


// router.push({ name: 'home' })
export const useAccountStore = defineStore('account', () => {
  const router = useRouter()
  let id = 7
  const user_id = ref(null)
  const API_URL = 'http://127.0.0.1:8000'

  const isLogin = ref(false)

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
        user_id.value = username
        console.log('로그인 완료!')
        isLogin.value = res.data
        
      })
      .catch(err => {
        console.log(err)
      })

  }

  const logout = function () {
    isLogin.value = null
    user_id.value = null
  }


  return { user_id, isLogin, signUp, login, logout }
})
