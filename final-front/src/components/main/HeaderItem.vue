<template>
  <div class="d-flex flex-column align-items-center">
    <p class="align-self-start ms-4 mt-4">{{ card.summary }}</p>
    <div v-if="card.main === 2" 
    class="d-flex main-item">
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
p {
  font-size: 25px;
}

div > img{
  width: 50%;
}

.main-item > img {
  position: absolute;
  right: -35px;
  top: 50px;
}
.main-item > p {
  position: absolute;
  left: 0px;
  top: 100px;
}
</style>