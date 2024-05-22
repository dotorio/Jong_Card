<template>
  <div>
    <Advertisement />
    <div v-if="article">
      <div class="container">
        <div class="main article">
          <span class="title">
             {{ article.title }}
          </span>
          <span class="content">
             {{ article.content }}
          </span>  
          <div class="d-flex ">
            <button type="button" @click="goUpdate"
            v-if="accountStore.userId === article.username"
            >수정하기</button>
            <button type="button" @click="Delete"
            v-if="accountStore.userId === article.username"
            >삭제하기</button>
            <button type="button" @click="goArticles"
            >목록</button>
          </div>       
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import { useArticleStore } from '@/stores/article'
import Advertisement from '@/components/Advertisement.vue'
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
      console.log(article.value)
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

const goArticles = function () {
  router.push({ name: 'article' })
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
* {
  font-size: 20px;
  font-weight: 700;
}
.container {
  width: 90%;
}
.main {
  margin: 100px;
}
button {
  width: 120px;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
  border-radius: 10px;

  border-color: #659FA6;
  background-color: #184D59;
  color: #EFF1F3;
}
.article {
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  
}
.title {
  margin: 20px;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'NEXON Lv2 Gothic';
  border-radius: 5px;
  border: 1px solid black;
}
.content {
  margin: 20px;
  padding: 10px; 
  font-size: 20px;
  font-weight: 700;
  font-family: 'NEXON Lv2 Gothic';
  height: 370px;
  border: 1px solid black;
  border-radius: 5px;
}


</style>