<template>
  <div class="form-header">
    <div :class="[showType, position, active]">{{ titleText }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  showType: String,
  position: String,
  active: String,
})


const showType = props.showType
const isActive = props.active
const titleText = ref('') 

if (showType === 'signup') {
    titleText.value = '회원가입'  
  } else if (showType === 'signin') {
    titleText.value = '로그인' 
  }
</script>

<style scoped>
.form-header > div {
  padding: 10px;
  position: absolute;

  font-size: 20px;
  font-family: 'NEXON Lv2 Gothic';
  font-weight: bold;

  top: -60px;

  color: #93aafd;
}
.form-header > div:hover {
  background-color: #dee5ff;
  border-radius: 10px;
  transition: all 0.5s;
  cursor: pointer;
}
.left-bar {
  left: 85px
}
.right-bar {
  right: 75px;
}
.active {
  background-color: #dee5ff;
  border-radius: 10px;
  transition: all 1s;
}
.non-active{
  background-color: white;
  transition: all 0.5s;
}
</style>