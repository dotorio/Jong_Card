<template>
  <div>
    <h2>문의글 작성</h2>
    <hr>
    <textarea cols="30" rows="10"></textarea>
    <button>등록</button>
    <button type="button" class="write" @click="goArticles">목록</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const goArticles = function () {
  router.push({ name: 'article' })
}
</script>

<style scoped>
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