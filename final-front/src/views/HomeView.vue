<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import HeaderMain from '@/components/main/HeaderMain.vue';
import { useAccountStore } from '@/stores/account';
import ArticleList from '@/components/article/ArticleList.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useArticleStore } from '@/stores/article';
const router = useRouter()
const accountStore = useAccountStore()
const articleStore = useArticleStore()

onMounted(() => {
  articleStore.getArticle()
})
const goCardRecommend = function() {
  router.push({name: 'card-recommend'})
}

const goCardGrow = function() {
  if (JSON.parse(localStorage.getItem('my-page')) && accountStore.isLogin){
    router.push({name: 'card-grow', params:{'username': accountStore.userName}})
  } else if (accountStore.isLogin){
    router.push({name: 'my-page', params:{'username': accountStore.userName}})
  } else {
    alert('로그인이 필요합니다!')
    router.push({name: 'account'})
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
  <div class="container">
    <div class="guard">
      <div class="articles">
        <h4>문의글</h4>
        <hr>
        <article v-if="articleStore.articleList" class="d-flex flex-column justify-content-center">
          <p class="d-flex justify-content-between" 
          v-for="article in articleStore.articleList[0].articleList"
          :key="article.id" >
  
          <span>{{ article.title }}</span>
          <span>{{ article.username }}</span>
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
*{
  font-family: 'NEXON Lv2 Gothic';
  font-weight: 700;
}
.container {
  position: relative;
}
.articles {
  width: 500px;
  height: 420px;
  border: 2px solid rgb(145, 145, 145);
  border-radius: 20px;
  top: 70px;
  right: 10px;
  padding: 40px;
  margin: 50px;
}

article {
  width: 400px;
  height: 300px;
  /* background-color: blue; */
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
