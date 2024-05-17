<template>
  <div>
    <h2>문의글 게시판</h2>
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"
        v-for="page in articleStore.pageGruop" :key="page"
        @click="changeCurrentPage(page)"
        ><a class="page-link" href="#">{{ page }}</a></li>
        
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
    <hr>
    <div class="container">
        <button class="write" type="button" @click="goWrite">작성하기</button>
        <div class="articles">
          <div class="article-header">
            <div class="title">
              <span>제목</span>
            </div>
            <div class="user">
              <span>작성자</span>
            </div>
          </div>
          <ArticleList
          v-for="articlePart in articleStore.articleList" :key="articlePart.id"
          :articlePart="articlePart"
          :partId="articlePart.id"
          />
        </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, onUpdated } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useAccountStore } from '@/stores/account'
import ArticleList from '@/components/article/ArticleList.vue'

const articleStore = useArticleStore()
const accountStore = useAccountStore()

onMounted(() => {
  accountStore.getUserList()
  
})

const router = useRouter()
const goWrite = function () {
  router.push({ name: 'article-write', params: { username: accountStore.userName } })
}

const changeCurrentPage = function (page) {
  articleStore.updatePage(page)
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.article-header {
  height: 50px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: gray;
  display: flex;
}
.article-header .title {
  width: 70%;
  height: 50px;
  border-right: 2px solid black;
  text-align: center;
}
.article-header .user {
  width: 30%;
  height: 50px;
  text-align: center;
}
span {
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  margin-top: 15px;
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
  margin-top: 20px;
  /* border: 1px solid black; */
}
</style>