<template>
  <div>
    <div class="article" :class="isDetail">
      <div class="title">
        <span class="badge text-bg-success" @click="goDetail"
        >상세보기</span>
        <span>{{ article.title }}</span>
      </div>
      <div class="user">
        <span>{{ article.username }}</span>
      </div>
    </div>
  </div>
  <!-- <div>
    {{props.article}}
  </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
const props = defineProps({
  article: Object
})

const isDetail = ref('')


onMounted(() => {
  if (accountStore.userName === props.article.username) {
    isDetail.value = 'detail'
  }
})

const router = useRouter()
const accountStore = useAccountStore()
const article = props.article

const goDetail = function () {
  // console.log(props.article.id)
  // if (accountStore.userName === props.article.username) {
  router.push({ name: 'article-detail', params: { 'article_id': props.article.id }})
}
</script>

<style scoped>
.badge {
  position: absolute;
  left: 30px;
  font-size: 15px;
  cursor: pointer;
}
.article {
  height: 50px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
}
.article .title {
  width: 70%;
  height: 50px;
  border-right: 2px solid black;
  text-align: center;
  position: relative;
}
.article .user {
  width: 30%;
  height: 50px;
  text-align: center;
}
span {
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  margin-top: 10px;
}
</style>