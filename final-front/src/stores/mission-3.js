import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCardGrowStore } from './cardgrow'



export const useMissionStore3 = defineStore('mission-3', () => {
  
  const missonCardClick = ref(0)
  const isClear = ref(false)

  const upCount = function () {
    if (missonCardClick.value < 3) {
      missonCardClick.value += 1
      console.log('실행!')
    }
    if (missonCardClick.value === 3 && !isClear.value) {
      isClear.value = true
      console.log('클리어!')
      const growStore = useCardGrowStore()
      growStore.upGage()
      growStore.moveStar3()
    }
  }
  
  if (missonCardClick.value === 3) {
    console.log(1)
  }

  return { missonCardClick, isClear, upCount}
})
