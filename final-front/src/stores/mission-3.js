import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCardGrowStore } from './cardgrow'



export const useMissionStore3 = defineStore('mission-3', () => {
  const growStore = useCardGrowStore()
  const missonCardClick = ref(0)
  const isClear = ref(false)


  if (growStore.mission3) {
    missonCardClick.value = 3
  }

  const upCount = function () {
    if (missonCardClick.value < 3) {
      missonCardClick.value += 1
      console.log('실행!')
    }
    if (missonCardClick.value === 3 && !growStore.mission3) {
      isClear.value = true
      console.log('클리어!')
      const growStore = useCardGrowStore()
      growStore.missionClear(3)
      growStore.moveStar3()
    }
  }
  
  if (missonCardClick.value === 3) {
    console.log(1)
  }

  return { missonCardClick, isClear, upCount}
})
