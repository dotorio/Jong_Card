<template>
  <div class="page">
    <div class="container mt-5">
        <div class="left-side">
          <div class="card-container">
            <img :src="growStore.cardImg" alt="#" class="my-card" @click="goCardGrow"
            v-if="myGrowData">
            <img src="../assets/card-grow/no-card.svg" alt="#" class="no-card" @click="createCardGrow"
            v-else>

            <img src="../assets/card-grow/wallet.svg" alt="#" class="wallet">

            <button v-if="!myGrowData" @click="createCardGrow" class="card-btn">
              카드 생성
            </button>
            <button v-else @click="goCardGrow" class="card-btn">
              카드 가기
            </button>

          </div>
        </div>
        
      
        <div class="right-side">
          <p>닉네임: {{ accountStore.userName }}</p>
          <div class="like-card">
            <p>{{ accountStore.userName }}님이 좋아한 카드</p>
            <hr>
            <div class="container scrollbar">
              <div class="row">
                <div v-if="likeCards"
                v-for="card in likeCards.card" :key="card.id" class="col-4">
                  
                <div class="card" @click="goCardDetail(card.id)">
                    <img :src="`/src/assets/cards/${card.id}.svg`" alt="#">
                    <p>{{ card.cardName }}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import { useCardGrowStore } from '@/stores/cardgrow';
import { useMyPageStore } from '@/stores/mypage';
import axios from 'axios';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const accountStore = useAccountStore()
const route = useRoute()
const myPageStore = useMyPageStore()
const router = useRouter()
const myGrowData = JSON.parse(localStorage.getItem('my-page'))
const growStore = useCardGrowStore()

const likeCards = ref(null)

onMounted(() => {
  axios({
    method: 'get',
    url: `http://127.0.0.1:8000/cards/${accountStore.userName}/1/likes_card_toggle/`
  })
    .then(res => {
      likeCards.value = res.data
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  if (myPageStore.growCard) {
    growStore.cardGrowUpdate()
  }
})

const goCardDetail = function (cardId) {
  router.push({name:'card-detail', params: {'card_id': cardId}})
}

const createCardGrow = function () {
  myPageStore.createCardGrow()
}

const goCardGrow = function () {
  router.push({name: 'card-grow', params:{'username': accountStore.userName}})       
}

</script>

<style scoped>
.container {
  /* background-color: red; */
  height: 10px;
  position: relative;
}
.page {
  border-top: 1px solid rgb(186, 186, 186);
}
.my-card {
  transform: rotateZ(-20deg);
  z-index: 0;
  position: absolute;
  left: 70px;
  top: 50px;
  cursor: pointer;
}

p {
  font-size: 30px;
  font-weight: 700;
}
.card img:hover {
  transition: all 1s;
  transform: scale(1.1);
}
.card-btn {
  position: absolute;
  top: 420px;
  left: 150px;

  width: 120px;
  height: 50px;
  border-radius: 10px;
  
  border-color: #659FA6;
  background-color: #184D59;
  color: white;
  border-width: thick;
  font-size: 20px;
  font-weight: 700;
}
.right-side .container {
  height: 700px;
}
.card {
  width: 150px;
  margin: 20px;
  border-color: white;
  cursor: pointer;
}
.card p{
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}
.no-card {
  z-index: 0;
  position: absolute;
  left: 100px;
  top: 30px;
  cursor: pointer;
}
.my-card:hover {
  transition: all 1s;
  transform: translateY(-50px) rotateZ(-20deg);
}
.no-card:hover {
  transition: all 1s;
  transform: translateY(-120px);
}
.wallet {
  z-index: 1;
  position: absolute;
  top: 100px;
}
.left-side {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 150px;

}
.right-side {
  position: absolute;
  width: 720px;
  height: 1000px;
  /* border: 1px solid black; */
  left: 700px;
}

.scrollbar { 
  overflow-y: scroll; /*  */
}

/* 스크롤바의 폭 너비 */
.scrollbar::-webkit-scrollbar {
    width: 10px;  
}

.scrollbar::-webkit-scrollbar-thumb {
    background: rgb(0, 146, 110); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
}

.scrollbar::-webkit-scrollbar-track {
    background: rgba(220, 20, 60, .1);  /*스크롤바 뒷 배경 색상*/
}
</style>