import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAccountStore } from './account'
import { useMyPageStore } from './mypage'
import axios from 'axios'
import { useMissionStore3 } from './mission-3'

export const useCardGrowStore = defineStore('card-grow', () => {
  const cardGage = ref(0)
  const cardLevel = ref(1)
  const cardGageBar = ref(`exp-gage-0`)
  const modalOn = ref('')
  const cardImg = ref(`/src/assets/card-grow/level${cardLevel.value}.svg`)
  const coinImg = ref(`/src/assets/card-grow/coin${cardLevel.value}.svg`)
  const myPageStore = useMyPageStore()
  const accountStore = useAccountStore()
  const missionStore3 = useMissionStore3()
  const mission1 = ref(false)
  const mission2 = ref(false)
  const mission3 = ref(false)
  const mission4 = ref(false)
  const mission5 = ref(false)
  const missionFirst2 = ref(false)
  const star1 = ref('')
  const star2 = ref('')
  const star3 = ref('')
  
  const userMission = ref()
  
  
  const cardGrowUpdate = function () {
    cardLevel.value = myPageStore.growCard.level
    cardGage.value = myPageStore.growCard.exp
    if (cardGage.value === 100) {
      levelUp()
    }
    mission1.value = myPageStore.growCard.mission1
    mission2.value = myPageStore.growCard.mission2
    mission3.value = myPageStore.growCard.mission3
    mission4.value = myPageStore.growCard.mission4
    mission5.value = myPageStore.growCard.mission5
    cardGageBar.value = `exp-gage-${cardGage.value}`
    cardImg.value = `/src/assets/card-grow/level${cardLevel.value}.svg`
    if (!mission1.value && accountStore.isLogin) {
      missionClear(1)
    }
    if (mission3.value) {
      missionStore3.missionClear()
    }
  }


  const missionClear = function (missonNum) {
    console.log(`미션 ${missonNum}번 클리어!`)
    if (missonNum === 1) {
      mission1.value = true
      upGage()
    } else if (missonNum === 2) {
      mission2.value = true
    } else if (missonNum === 3) {
      mission3.value = true
      upGage()
    } else if (missonNum === 4) {
      mission4.value = true
    } else if (missonNum === 5) {
      mission5.value = true
    }
  }

  const upGage = function() {
    // console.log('경험치 증가')
    cardGage.value += 25
    console.log(cardGage.value)
    setTimeout(() => {
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

    }, 500)
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

    cardImg.value = `/src/assets/card-grow/level${cardLevel.value}.svg`
    coinImg.value = `/src/assets/card-grow/coin${cardLevel.value}.svg`
  }

  const closeModal = function () {
    modalOn.value = ''
  }
  

  const updateCardGrow = function () {
    axios({
      method: 'put',
      url: `http://127.0.0.1:8000/grow/${accountStore.userId}/save-card/`,
      data: {
        "level": cardLevel.value,
        "exp": cardGage.value,
        "mission1": mission1.value,
        "mission2": mission2.value,
        "mission3": mission3.value,
        "mission4": mission4.value,
        "mission5": mission5.value,
      }
    })
      .then(res => {
        console.log(res.data)
        myPageStore.getUserInfo()
      })
      .catch(err => {
        console.log(err)
      })
    }


  return { cardGage, cardGageBar, modalOn, cardImg, coinImg,  cardLevel, mission1, mission2, mission3, mission4, mission5, missionFirst2,
    star1, star2, star3,
    upGage, closeModal, cardGrowUpdate, missionClear, updateCardGrow,
   }
})
