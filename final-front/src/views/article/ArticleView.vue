<template>
  <div>
    <Advertisement />
      <div class="container">
        <h2>문의글 게시판</h2>
        <hr>
        <div class="main">
          <button class="write me-5" type="button" @click="goWrite">작성하기</button>
          <div class="articles">
            <div class="article-header">
              <div class="title">
                <span>제목</span>
              </div>
              <div class="user">
                <span>작성자</span>
              </div>
            </div>
            <div class="animate__animated" :class="articleClass">
              <ArticleList
              v-for="articlePart in articleStore.articleList" :key="articlePart.id"
              :articlePart="articlePart"
              :partId="articlePart.id"
              />
            </div>
            <div class="d-flex justify-content-center mt-5">
  
              <nav aria-label="Page navigation example">
                <ul class="pagination" @click="pageMove">
                  <li class="page-item"  @click="beforeCurrentPage"><a class="page-link" href="#">이전</a></li>
                  <li class="page-item"
                  v-for="page in articleStore.pageGruop" :key="page"
                  @click="changeCurrentPage(page)"
                  ><a class="page-link" href="#">{{ page }}</a></li>
                  <li class="page-item" @click=afterCurrentPage><a class="page-link" href="#">다음</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, onUpdated, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useAccountStore } from '@/stores/account'
import ArticleList from '@/components/article/ArticleList.vue'
import Advertisement from '@/components/Advertisement.vue'

const articleStore = useArticleStore()
const accountStore = useAccountStore()
const articleClass = ref('')
onMounted(() => {
  accountStore.getUserList()
  
})


const router = useRouter()
const goWrite = function () {
  if (!accountStore.isLogin){
    alert('로그인이 필요합니다!')
    router.push({name: 'account'})
  } else {
    router.push({ name: 'article-write', params: { username: accountStore.userName } })
  }
}

const changeCurrentPage = function (page) {
  articleStore.updatePage(page)
}

const beforeCurrentPage = function () {
  console.log('이전!')
  articleStore.beforePage()
}

const afterCurrentPage = function () {
  console.log('다음')
  articleStore.afterPage()
}

const pageMove = function () {
  articleClass.value = 'animate__fadeIn'
  setTimeout(() => {
    articleClass.value = ''
  },600)
}
</script>

<style scoped>
h2 {
  margin-top: 20px;

}
.main {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.pagination {
  margin: 20px auto;

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
  border-color: #659FA6;
  background-color: #184D59;
  color: #EFF1F3;
  font-family: 'NEXON Lv2 Gothic';
  font-size: 20px;
  font-weight: 700;
  
}

.articles {
  width: 80%;
  height: 500px;
  margin-top: 20px;
  /* border: 1px solid black; */
}
</style>