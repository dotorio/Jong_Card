<template>
  <div class="container">
    <p>카드에 동전주기 3회 [ {{ store.missonCardClick }} / 3 ]</p>
    <input type="checkbox"
    v-if="!growStore.mission3">
    <img src="../../assets/card-grow/checked.svg" alt="#" class="animate__animated animate__tada"
    v-else-if="themaStore.thema === 'light'">
    <img src="../../assets/card-grow/checked-dark.svg" alt="#" class="animate__animated animate__tada"
    v-else-if="themaStore.thema === 'dark'">
  </div>
</template>

<script setup>
import { useCardGrowStore } from '@/stores/cardgrow';
import { useMissionStore3 } from '@/stores/mission-3';
import { useThemaStore } from '@/stores/thema';
import { onMounted, ref } from 'vue';

const store = useMissionStore3()
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
  
  position: absolute;
  top: 15px;
  right: 20px;
  pointer-events: none;

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