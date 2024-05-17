<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import HeaderMain from '@/components/main/HeaderMain.vue';
const router = useRouter()

const goCardRecommend = function() {
  router.push({name: 'card-recommend'})
}
</script>

<template>
  <HeaderMain />

  <main class="border-bottom border-2 d-flex justify-content-around align-items-center">
    <div class="article rounded-4">
      <RouterLink :to="{ name: 'article' }">
        <img src="../assets/home/article.svg" alt="문의글" class="mt-3">
      </RouterLink>
      <p class="my-2 ">문의글</p>
    </div>
    <div class="card-recommend rounded-4">
      <img src="../assets/home/cardrecommend.svg" alt="카드추천" class="card-recommend mt-3" @click="goCardRecommend">
      <p class="mt-1">카드 추천</p>
    </div>
  </main>
</template>

<style scoped>
*{
  font-family: 'NEXON Lv2 Gothic';
  font-weight: 700;
}
.card-recommend {
  cursor: pointer;
}
header {
  height: 500px;
  background-color: #A9EAFF;
}
main {
  height: 130px;
  
}
main p {
  font-size: 15px;
}

main > div {
  text-align: center;
  width: 110px;
  height: 110px
}
main > div:hover {
  transition: all 0.5s;
  background-color: #A9EAFF;
  
  cursor: pointer;
}
</style>
