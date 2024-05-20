<template>
  <div class="container">
    <p>출석하기</p>
    <input type="checkbox" :checked="growStore.mission1">
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import { useCardGrowStore } from '@/stores/cardgrow';
import { onMounted, ref } from 'vue';
const growStore = useCardGrowStore()
const accountStore = useAccountStore()


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