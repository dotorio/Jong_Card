<template>
  <div>
    <div v-if="article">
      <div class="container">
        <div>
          제목: {{ article.title }}
        </div>
        <div>
          내용: {{ article.content }}
        </div>
        <button type="button" @click="goUpdate">수정하기</button>
        <button type="button" @click="Delete">삭제하기</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import { useArticleStore } from '@/stores/article'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
const accountStore = useAccountStore()
const articleStore = useArticleStore()

onMounted(() => {
  // console.log(route.params.article_id)
  axios({
    method: 'get',
    url: `${API_URL}/articles/${route.params.article_id}/detail/`
  })
    .then(res => {
      article.value = res.data
    })
    .catch(err => {
      console.log(err)
    })
})
const route = useRoute()
const router = useRouter()
const username = accountStore.userName
const article = ref(null)


const goUpdate = function () {
  router.push({name: 'article-update', params: { article_id: article.id }})
}

const Delete = function () {
  axios({
    method: 'delete',
    url: `${API_URL}/articles/${route.params.article_id}/detail/`
  })
    .then(res => {
      console.log('문의글 삭제!')
      router.push({name: 'article'})
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<style scoped>

</style>