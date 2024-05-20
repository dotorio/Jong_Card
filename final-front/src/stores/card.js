import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cardsort } from '@/method/cardsort'
import axios from 'axios'
import { useAccountStore } from './account'


export const useCardStore = defineStore('card', () => {
  const accountStore = useAccountStore()
  const cardList = ref(null)
  const benefitList = ref(null)
  const userLikeCards = ref(null)
  const API_URL = 'http://127.0.0.1:8000'
  const updateCardList = function() {
    const accountStore = useAccountStore()

    axios({
      method: 'get',
      url: `${API_URL}/cards/${accountStore.userName}/update-card-list/`
    })
      .then(res => {
        cardList.value = res.data
        benefitList.value = cardsort(cardList)
        // console.log(benefitList.value)
        localStorage.setItem('cardList', JSON.stringify(cardList.value))
        if (accountStore.isLogin) {
          axios({
            method: 'get',
            url: `http://127.0.0.1:8000/cards/${accountStore.userName}/2/likes_card_toggle/`
          })
          .then(res => {
            userLikeCards.value = res.data.card
            console.log(userLikeCards.value)
          }) 
          .catch(err => {
            console.log(err)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return { cardList, userLikeCards, benefitList, updateCardList }
})
