import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAccountStore } from './account'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCardGrowStore } from './cardgrow';


export const useMyPageStore = defineStore('my-page', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const accountStore = useAccountStore()
  const growStore = useCardGrowStore()
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
          console.log(res.data.card_grow)
        }
        growStore.cardGrowUpdate()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getCardGrow = function () {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/grow/${accountStore.userId}/get_card_grow/`,
    })
      .then(res => {
        growCard.value = res.data[0]
        growStore.cardGrowUpdate()
      })
      .catch(err => {
        console.log(err)
      })
    }

  const createCardGrow = function () {
    console.log(growCard.value)
    if (!JSON.parse(localStorage.getItem('my-page'))) {
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

  }
  const cardGrowReset = function () {
    growCard.value = null
  }
 
  return { growCard, getUserInfo, createCardGrow, getCardGrow, cardGrowReset}
}, {persist: true})
