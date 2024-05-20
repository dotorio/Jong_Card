<template>
  <div class="container">
    <p>카드 좋아요 누르기</p>
    <input type="checkbox" :checked="growStore.mission2">
  </div>
</template>

<script setup>

import { useCardGrowStore } from '@/stores/cardgrow';
import { onMounted, ref } from 'vue';

const growStore = useCardGrowStore()

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
</style>