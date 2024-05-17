import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cardsort } from '@/method/cardsort'
import axios from 'axios'
import { useAccountStore } from './account'


export const useCardStore = defineStore('card', () => {
  const accountStore = useAccountStore()
  const cardList = ref(null)
  const benefitList = ref(null)
  const API_URL = 'http://127.0.0.1:8000'
  const updateCardList = function() {
    const accountStore = useAccountStore()

    axios({
      method: 'get',
      url: `${API_URL}/cards/${accountStore.userName}/update-card-list/`
    })
      .then(res => {
        cardList.value = res.data
        // console.log(res.data)
        // localStorage.setItem('cardList', JSON.stringify(res.data))
        // console.log(res.data)
        benefitList.value = cardsort(cardList)
        console.log(cardList.value)
        localStorage.setItem('cardList', JSON.stringify(cardList.value))
      })
      .catch(err => {
        console.log(err)
      })
  }
  return { cardList, benefitList, updateCardList }
})
