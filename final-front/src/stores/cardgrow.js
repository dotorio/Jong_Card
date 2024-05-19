import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'


export const useCardGrowStore = defineStore('card-grow', () => {
  const cardGage = ref(0)
  const cardLevel = ref(1) 
  const cardGageBar = ref('exp-gage-0')
  const modalOn = ref('')
  const cardImg = ref(`src/assets/card-grow/level${cardLevel.value}.svg`)
  const coinImg = ref(`src/assets/card-grow/coin${cardLevel.value}.svg`)
  const star1 = ref('')
  const starClear1 = ref(false)
  const star2 = ref('')
  const star3 = ref('')

  const moveStar1 = function () {
    starClear1.value = true
    setTimeout(() => {
      star1.value = 'star-move-1'
      setTimeout(() => {
        star1.value = ''
      }, 1200)
    })
  }

  const moveStar2 = function () {
    star2.value = 'star-move-2'
    setTimeout(() => {
      star2.value = ''
    }, 1200)
  }

  const moveStar3 = function () {
    star3.value = 'star-move-3'
    setTimeout(() => {
      star3.value = ''
    }, 1200)
  }

  const upGage = function() {
    console.log('경험치 증가')
    console.log(cardGage.value)

    
    setTimeout(() => {
      cardGage.value += 25
      if (cardGage.value === 100) {
        setTimeout(levelUp, 1000)
      }
      if (cardGage.value === 25) {
        cardGageBar.value = 'exp-gage-25'
      } else if (cardGage.value === 50) {
        cardGageBar.value = 'exp-gage-50'
      } else if (cardGage.value === 75) {
        cardGageBar.value = 'exp-gage-75'
      } else if (cardGage.value === 100) {
        cardGageBar.value = 'exp-gage-100'
      }
    }, 1000)
    // console.log(cardGage.value)
  }

  const levelUp = function () {
    cardLevel.value += 1
    if (cardLevel.value > 5) {
      cardLevel.value = 5
    }
    console.log(cardLevel.value)
    cardGage.value = 0
    cardGageBar.value = 'exp-gage-0'
    modalOn.value = 'on animate__fadeInDown'

    cardImg.value = `src/assets/card-grow/level${cardLevel.value}.svg`
    coinImg.value = `src/assets/card-grow/coin${cardLevel.value}.svg`
  }

  const closeModal = function () {
    modalOn.value = ''
  }

  return { cardGage, cardGageBar, modalOn, cardImg, coinImg, 
    star1, star2, star3, starClear1,
    upGage, closeModal, moveStar1, moveStar2, moveStar3
   }
})
