import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCardGrowStore } from './cardgrow'



export const useThemaStore = defineStore('thema', () => {
  const thema = ref('light')
  const expGage = ref('exp-gage-light')
  const button = ref('button-light')
  const main = ref('main-light')
  const mission = ref('mission-light')
  const missionContainer = ref('mission-container-light')
  const cardContainer = ref('card-container-light')
  const expContainer = ref('exp-container-light')
 
  const themaChage = function (element) {
    if (thema.value === 'light') {
      thema.value = 'dark'
      expGage.value = ('exp-gage-dark')
      button.value = ('button-dark')
      main.value = ('main-dark')
      mission.value = ('mission-dark')
      missionContainer.value = ('mission-container-dark')
      cardContainer.value = ('card-container-dark')
      expContainer.value = ('exp-container-dark')
    } else {
      thema.value = 'light'
      expGage.value = ('exp-gage-light')
      button.value = ('button-light')
      main.value = ('main-light')
      mission.value = ('mission-light')
      missionContainer.value = ('mission-container-light')
      cardContainer.value = ('card-container-light')
      expContainer.value = ('exp-container-light')

    }
    console.log(thema.value)
  }
  return { thema, expGage ,button ,main ,mission ,missionContainer , expContainer, cardContainer, themaChage }
})
