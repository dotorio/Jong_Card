import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAccountStore } from './account'


export const useArticleStore = defineStore('article', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const write = function (payload) {
    const title = payload.title
    const content = payload.content
    const accountStore = useAccountStore()

    axios({
      method: 'post',
      url: `${API_URL}/articles/${accountStore.user_id}/write/`,
      data: {
        title, content
      }
    })
      .then(res => {
        console.log('문의 작성!')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return { write }
})
