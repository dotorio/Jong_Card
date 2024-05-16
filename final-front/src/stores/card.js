import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cardsort } from '@/method/cardsort'
import axios from 'axios'

export const useCardStore = defineStore('card', () => {
  const cardList = ref(null)
  const benefitList = ref(null)
  

  const API_URL = 'http://127.0.0.1:8000'
  const updateCardList = function() {
    axios({
      method: 'get',
      url: `${API_URL}/cards/update-card-list`
    })
      .then(res => {
        // console.log(res.data)
        cardList.value = res.data
        console.log(res.data)
        // localStorage.setItem('cardList', JSON.stringify(res.data))
        benefitList.value = cardsort(cardList)
        // console.log(benefitList.value)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return { cardList, benefitList, updateCardList }
})
