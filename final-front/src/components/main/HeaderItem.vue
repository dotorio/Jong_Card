<template>
  <div class="d-flex flex-column align-items-center">
    <span v-if="card.main===2" class="badge text-bg-success p-2">{{card.cardCompany}}</span>
    <p class="align-self-start summary">{{ card.summary }}</p>
    <div v-if="card.main === 2" 
    class="d-flex main-item">
      <span>{{ card.content }}</span>
      <p class="ms-4">
        {{ card.title }}
      </p>
      <img :src="card.img" class="animate__animated" alt="#"
      :class="cardShow">
    </div>
  </div>
</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue';
onMounted(() => {
  cardShow.value = 'animate__fadeInRight animate__slow'
})
onUnmounted(() => {
  cardShow.value = ''
})


const props = defineProps({
  card : Object
})

const card = props.card
const cardShow = ref('')
// console.log(card)


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
</style>