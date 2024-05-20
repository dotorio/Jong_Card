<template>
  <div class="container">
    <p>기타 등등</p>
    <input type="checkbox">
  </div>
</template>

<script setup>
import { ref } from 'vue';

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