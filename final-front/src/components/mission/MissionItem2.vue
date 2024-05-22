<template>
  <div class="container">
    <p>카드 좋아요 누르기</p>
    <input type="checkbox" v-if="!growStore.mission2">
    <img src="../../assets/card-grow/checked.svg" alt="#" class="animate__animated animate__tada"
    v-else-if="themaStore.thema === 'light'">
    <img src="../../assets/card-grow/checked-dark.svg" alt="#" class="animate__animated animate__tada"
    v-else-if="themaStore.thema === 'dark'">
  </div>
</template>

<script setup>

import { useCardGrowStore } from '@/stores/cardgrow';
import { useThemaStore } from '@/stores/thema';
import { onMounted, ref } from 'vue';

const growStore = useCardGrowStore()
const themaStore = useThemaStore()
</script>

<style scoped>
p {
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 28px;
  left: 20px;
}
input[type=checkbox] {
  width: 50px;
  height: 50px;
  pointer-events: none;

  position: absolute;
  top: 15px;
  right: 20px;

}
.container {
  position: relative;
}
img {
  position: absolute;
  right: 10px;
  top:5px
}
</style>