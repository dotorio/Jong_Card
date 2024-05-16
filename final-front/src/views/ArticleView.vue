<template>
  <div>
    <h2>문의글 게시판</h2>
    <hr>
    <div class="container">
        <button class="write" type="button" @click="goWrite">작성하기</button>
      <div class="articles">
        문의글 목록
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';



const router = useRouter()

const goWrite = function () {
  router.push({ name: 'article-write', params: { username: 'user11'} })
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
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
.articles {
  width: 80%;
  height: 800px;

  border: 1px solid black;
}
</style>