<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import HeaderMain from '@/components/main/HeaderMain.vue';
import { useAccountStore } from '@/stores/account';
const router = useRouter()
const accountStore = useAccountStore()
const goCardRecommend = function() {
  router.push({name: 'card-recommend'})
}

const goCardGrow = function() {
  if (JSON.parse(localStorage.getItem('my-page'))){
    router.push({name: 'card-grow', params:{'username': accountStore.userName}})
  } else {
    router.push({name: 'my-page', params:{'username': accountStore.userName}})
  }
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
    <div class="card-grow rounded-4">
      <img src="../assets/home/card-grow.svg" alt="카드키우기" class="card-grow" @click="goCardGrow">
      <p class="mt-1">카드 키우기</p>
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
.card-grow {
  cursor: pointer;
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
