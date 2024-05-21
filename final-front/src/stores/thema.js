import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCardGrowStore } from './cardgrow'



export const useThemaStore = defineStore('thema', () => {
  const thema = ref('light')

  const themaChage = function () {
    if (thema.value === 'light') {
      thema.value = 'dark'
    } else {
      thema.value = 'light'
    }
    console.log(thema.value)
  }
  return { thema, themaChage }
})
