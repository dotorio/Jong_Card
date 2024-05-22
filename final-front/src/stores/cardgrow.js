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
  const modalBack = ref('normal')
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
  const missionCount3 = ref(null) 
  
  
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
    missionCount3.value = myPageStore.growCard.missionCount3
    missionStore3.update(missionCount3.value)

    cardGageBar.value = `exp-gage-${cardGage.value}`
    cardImg.value = `/src/assets/card-grow/level${cardLevel.value}.svg`
    coinImg.value = `/src/assets/card-grow/coin${cardLevel.value}.svg`
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

  const upGage = function(element) {
    // console.log('경험치 증가')
    const taget = cardGage.value + 25
    let count = cardGage.value

    let counting = setInterval(function () {
      if (count >= taget) {
        count = taget
        clearInterval(counting)
      } else {
        count += 1
      }
      element.innerHTML = new Intl.NumberFormat().format(count) + '%'
    }, 50)
  
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

    }, 450)
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
    modalBack.value = 'level-up'
    cardImg.value = `/src/assets/card-grow/level${cardLevel.value}.svg`
    coinImg.value = `/src/assets/card-grow/coin${cardLevel.value}.svg`
  }

  const closeModal = function () {
    modalOn.value = ''
    modalBack.value = 'normal'
  }
  

  const updateCardGrow = function () {
    missionCount3.value = missionStore3.getCount()
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
        "missionCount3": missionCount3.value
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


  return { cardGage, cardGageBar, modalOn, cardImg, coinImg,  cardLevel, mission1, mission2, mission3, mission4, mission5, missionCount3, modalBack,
    upGage, closeModal, cardGrowUpdate, missionClear, updateCardGrow,
   }
})
