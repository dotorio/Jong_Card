<template>
  <div class="container">
    <p>카드에 동전주기 3회 [ {{ store.missonCardClick }} / 3 ]</p>
    <input type="checkbox"
    :checked="store.isClear">
  </div>
</template>

<script setup>
import { useMissionStore3 } from '@/stores/mission-3';
import { ref } from 'vue';

const store = useMissionStore3()
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
</style>