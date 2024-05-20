<template>
  <div>
    <Advertisement />
    <h2>문의글 작성</h2>
    <hr>
    <form action="" @submit.prevent="articleWrite"  class="article">
      <input class="title" type="text" v-model="title" placeholder="제목을 입력해주세요.">
      <textarea class="content" cols="30" rows="10" placeholder="내용" v-model="content"></textarea>
      <input type="submit" value="문의 등록" >
    </form>
    <button type="button" class="write" @click="goArticles">목록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/article.js'
import Advertisement from '@/components/Advertisement.vue';
const router = useRouter()
const articleStore = useArticleStore()
const title = ref(null)
const content = ref(null)

const goArticles = function () {
  router.push({ name: 'article' })
}

const articleWrite = function () {
  const payload = {
    title: title.value,
    content: content.value
  }
  articleStore.write(payload)
  title.value = null
  content.value = null
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