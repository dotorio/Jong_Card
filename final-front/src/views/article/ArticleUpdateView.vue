<template>
  <div >
    <h2>문의글 수정</h2>
    <hr>
    <form v-if="title" action="" @submit.prevent="articleUpdate"  class="article">
      <input class="title" type="text" v-model="title">
      <textarea class="content" cols="30" rows="10" v-model="content"></textarea>
      <input type="submit" value="수정하기" >
    </form>
    <button type="button" class="write" @click="goArticles">목록</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/article.js'


const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const id = ref(null)
const title = ref(null)
const content = ref(null)
const article = ref(null)


onMounted(() => {
  articleStore.articleTotal.forEach(element => {
  if (String(element.id) === route.params.article_id) {
    id.value = element.id
    title.value = element.title
    content.value = element.content
  }
});
})



const goArticles = function () {
  router.push({ name: 'article' })
}

const articleUpdate = function () {
  const payload = {
    id: id.value,
    title: title.value,
    content: content.value
  }
  articleStore.update(payload)
  router.push({name: 'article'})
}
</script>

<style scoped>
.article {
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  
}
.title {
  margin: 20px;
  height: 30px;
  padding-left: 10px;
  font-size: 20px;
  font-family: 'NEXON Lv2 Gothic';
}
.content {
  margin: 20px;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 20px;
  font-family: 'NEXON Lv2 Gothic';
}
input[type=submit] {
  width: 150px;
  height: 50px;

  font-size: 25px;
  font-weight: 700;
  margin-left: 20px;
  border-radius: 10px;

  border-color: #A7E7F6;
  background-color: #3FCEF6;
  color: #EFF1F3;
  font-family: 'NEXON Lv2 Gothic';
}
.write {
  width: 100px;
  height: 50px;
  margin-top: 20px;
  border-radius: 10px;
  border-color: #A7E7F6;
  background-color: #3FCEF6;
  color: #EFF1F3;
  font-family: 'NEXON Lv2 Gothic';
  font-size: 20px;
  font-weight: 700;
  
}
</style>