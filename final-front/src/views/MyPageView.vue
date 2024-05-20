<template>
  <div class="page">
    <h1>
      {{ route.params.username }}님의 페이지
    </h1>

    <div class="container">
      <div class="row">
        <div class="profile-img col-5">

        </div>
        <div class="info col-7">
          <button v-if="!myGrowData" @click="createCardGrow">
            카드 생성
          </button>
          <button v-else @click="goCardGrow">
            카드 가기
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import { useCardGrowStore } from '@/stores/cardgrow';
import { useMyPageStore } from '@/stores/mypage';

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const accountStore = useAccountStore()
const route = useRoute()
const myPageStore = useMyPageStore()
const router = useRouter()
const myGrowData = JSON.parse(localStorage.getItem('my-page'))
const growStore = useCardGrowStore()

const createCardGrow = function () {
  myPageStore.createCardGrow()
}

const goCardGrow = function () {
  router.push({name: 'card-grow', params:{'username': accountStore.userName}})       
}





</script>

<style scoped>
.page {
  border-top: 1px solid rgb(186, 186, 186);
}
.profile-img {
  width: 400px;
  height: 400px;
  border: 1px solid red
}
</style>