<template>
  <div class="d-flex flex-column align-items-center">
    <span v-if="card.main === 2 && props.card.cardCompany === 'KB국민카드'" class="badge text-bg-warning p-2">{{card.cardCompany}}</span>
    <span v-if="card.main === 2 && props.card.cardCompany === '하나카드'" class="badge text-bg-success p-2">{{card.cardCompany}}</span>
    <span v-if="card.main === 2 && props.card.cardCompany === '삼성카드'" class="badge text-bg-primary p-2">{{card.cardCompany}}</span>
    <span v-if="card.main === 2 && props.card.cardCompany === '롯데카드'" class="badge text-bg-danger p-2">{{card.cardCompany}}</span>
    
    
    <p class="align-self-start summary">{{ card.summary }}</p>
    <div v-if="card.main === 2" 
    class="d-flex main-item">
      <span>{{ card.content }}</span>
      <p class="ms-4">
        {{ card.title }}
      </p>
      <div>
        <span class="item-detail animate__animated animate__fadeInLeft" v-if="card.main === 2" @click="goDetail()">-자세히 보기-</span>
      </div>
      <img :src="card.img" class="animate__animated" alt="#"
      :class="cardShow">
    </div>
  </div>
</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
onMounted(() => {
  cardShow.value = 'animate__fadeInRight animate__slow'
})
onUnmounted(() => {
  cardShow.value = ''
})

const router = useRouter()

const props = defineProps({
  card : Object
})

const card = props.card
console.log(props.card)
const cardShow = ref('')
// console.log(card)

const goDetail = function () {
  router.push({name: 'card-detail', params:{'card_id': props.card.cardId}})
}
</script>

<style scoped>
.summary {
  margin-top: 80px;
  margin-left: 50px;
}
p {
  font-size: 25px;
}

div > img{
  width: 40%;
}

.main-item > img {
  position: absolute;
  right: -85px;
  top: 140px;
}
.main-item > span {
  position: absolute;
  left: 50px;
  top: 120px;
  font-weight: 400;
}
.main-item > p {
  position: absolute;
  left: 30px;
  top: 220px;
  font-size: 30px;
}
.badge {
  position: absolute;
  left: 50px;
  top: 30px;
}
.item-detail {
  position: absolute;
  font-size: 15px;
  bottom: 80px;
  left: 60px;
  color: rgb(159, 159, 255);
  cursor: pointer;
}
</style>