import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAccountStore } from './account'

export const useArticleStore = defineStore('article', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const articleList = ref(null)
  const pageGruop = ref(null)
  const currentPage = ref(1)
  // const username = ref(null)
  const accountStore = useAccountStore()  

  const updatePage = function (page) {
    currentPage.value = page
  }


  const getArticle = function () {
    articleList.value = []
    let articlePart = []
    axios({
      method: 'get',
      url: `${API_URL}/articles/`
    })
      .then(res => {
        let cnt = 0
        let partId = 1
        res.data.forEach(article => {
          accountStore.userList.forEach(user => {
            if (article.username === user.id) {
              articlePart.push({
                id: article.id,
                title: article.title,
                content: article.content,
                username: user.username
              })
              cnt++ 
              if (cnt % 7 === 0) {
                articleList.value.push(
                  { id: partId++,
                    'articleList': articlePart
                  })
                articlePart = []
              }
              
            }
          });
        });
        articleList.value.push(
          { id: partId++,
            'articleList': articlePart
          })
        pageGruop.value = articleList.value.length
        console.log(articleList.value)
      })
      .catch(err => {
        console.log(err)
      })

  }
  
  const write = function (payload) {
    const title = payload.title
    const content = payload.content
    const accountStore = useAccountStore()

    axios({
      method: 'post',
      url: `${API_URL}/articles/${accountStore.userName}/write/`,
      data: {
        title, content
      }
    })
      .then(res => {
        console.log('문의 작성!')
        accountStore.articleWrite(res.data[1])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const update = function (payload) {
    console.log(payload)
    const id = payload.id
    const title = payload.title
    const content = payload.content
    const accountStore = useAccountStore()
    
    axios({
      method: 'put',
      url: `${API_URL}/articles/${id}/detail/`,
      data: {
        title, content
      }
    })
      .then(res => {
        console.log('문의 수정!')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return { articleList, currentPage, pageGruop, updatePage, getArticle, write, update}
})
