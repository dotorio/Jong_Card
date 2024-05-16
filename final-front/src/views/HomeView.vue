<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter()

const goCardRecommend = function() {
  router.push({name: 'card-recommend'})
}
</script>

<template>
  <h1>메인 페이지</h1>


  <RouterLink :to="{ name: 'article' }">문의글</RouterLink>
  <img src=".." alt="카드추천" class="card-recommend" @click="goCardRecommend">
</template>

<style scoped>
.card-recommend {
  cursor: pointer;
}
</style>
