import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCardGrowStore } from './cardgrow'



export const useMissionStore2 = defineStore('mission-2', () => {
  const isClear = ref(false)
  const missionClear = function () {
    isClear.value = true
    const store = useCardGrowStore()
    console.log('미션2 클리어!')
    store.upGage()
    store.moveStar2()
  }

  return { isClear, missionClear }
})
