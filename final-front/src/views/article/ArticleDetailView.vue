<template>
  <div>
    <div v-if="article">
      <span>제목: {{ article.title }}</span>
      <span>내용: {{ article.content }}</span>

      <button type="button" @click="goUpdate">수정하기</button>
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
</script>

<style scoped>

</style>