import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAccountStore } from './account'
import axios from 'axios';
import { useRouter } from 'vue-router';


export const useMyPageStore = defineStore('my-page', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const accountStore = useAccountStore()
  const growCard = ref(null)
  const router = useRouter()
  
  const getUserInfo = function () {
    axios({
      method: 'get',
      url: `${API_URL}/user/${accountStore.userName}/info/`
    })
      .then(res => {
        if (res.data.card_grow[0]) {
          growCard.value = res.data.card_grow[0]
        }
        console.log(growCard.value)
        console.log(growCard.value.exp)
        console.log(growCard.value.level)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const createCardGrow = function () {
    axios({
      method: 'post',
      url: `${API_URL}/grow/${accountStore.userName}/create-card/`
    })
      .then(res => {
        console.log('카드 생성!')
        growCard.value = res.data
        router.push({name: 'card-grow', params:{'username': accountStore.userName}})
        
      }
      )
      .catch(err => {
        console.log(err)
      })

  }

  return { growCard, getUserInfo, createCardGrow }
})
