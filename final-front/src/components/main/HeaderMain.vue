<template>
  <div>
    <header class="overflow-hidden">
      <MainItem :card="cardList[0]" class="item shift remain remain-1"/>
      <MainItem :card="cardList[1]" class="item shift main"/>
      <MainItem :card="cardList[2]" class="item shift remain remain-2"/>
      <MainItem :card="cardList[3]" class="item shift remain remain-3"/>
      <div class="item shift remain remain-4"></div>
      <button class="prev-button position-absolute top-50 ps-5" @click="changeItem('prev')"><</button>
      <button class="next-button position-absolute top-50" @click="changeItem('next')">></button>
    </header>
  </div>
</template>

<script setup>
import MainItem from '@/components/main/HeaderItem.vue'
import { ref } from 'vue';

const cardList = ref([
  { id: 1, title: '추천 카드1', bank: '신한은행', summary: '좋은카드임다1', main: 1 },
  { id: 2, title: '추천 카드2', bank: '신한은행', summary: '좋은카드임다2', main: 2 },
  { id: 3, title: '추천 카드3', bank: '국민은행', summary: '좋은카드임다3', main: 3 },
  { id: 4, title: '추천 카드4', bank: '국민은행', summary: '좋은카드임다4', main: 4 },
])


const changeBlock1 = function (item, direct) {
  if (direct === 'prev') {
    item.classList.remove('remain-1')
    item.classList.add('remain-4')
  } else if (direct === 'next') {
    item.classList.add('new-main')
    item.classList.remove('remain', 'remain-1')
    item.classList.add('main')
    setTimeout(removeClass , 1000, item, 'new-main')  
  }
}

const changeBlockMain = function (item, direct) {
  if (direct === 'prev'){
    item.classList.add('mini')
    item.classList.remove('main')
    item.classList.add('remain', 'remain-1')
    setTimeout(removeClass , 1000, item, 'mini');
  } else if (direct === 'next') {
    item.classList.add('mini')
    item.classList.remove('main')
    item.classList.add('remain', 'remain-2')
    setTimeout(removeClass , 1000, item, 'mini');
  }
  ;
}

const changeBlock2 = function (item, direct) {
  if (direct === 'prev') {
    item.classList.add('new-main')
    item.classList.remove('remain', 'remain-2')
    item.classList.add('main')
    setTimeout(removeClass , 1000, item, 'new-main');  
  } else if (direct === 'next') {
    item.classList.remove('remain-2')
    item.classList.add('remain-3')
  }
  
}

const changeBlock3 = function (item, direct) {
  if (direct === 'prev'){
    item.classList.remove('remain-3')
    item.classList.add('remain-2')
  } else if (direct === 'next') {
    item.classList.remove('remain-3')
    item.classList.add('remain-4')
  }
}

const changeBlock4 = function (item, direct) {
  if (direct === 'prev'){
    item.classList.remove('remain-4')
    item.classList.add('remain-3')
  } else if (direct === 'next') {
    item.classList.remove('remain-4')
    item.classList.add('remain-1')
  }
}


const changeItem = function ( direct ) {
  const mainItem = document.querySelector(".main")
  const remainItem1 = document.querySelector(".remain-1")
  const remainItem2 = document.querySelector(".remain-2")
  const remainItem3 = document.querySelector(".remain-3")
  const remainItem4 = document.querySelector(".remain-4")
  const items = document.querySelectorAll(".item")
  // console.log(items)
  
  changeBlock1(remainItem1, direct)
  changeBlockMain(mainItem, direct)
  changeBlock2(remainItem2, direct)
  changeBlock3(remainItem3, direct)
  changeBlock4(remainItem4, direct)
}



const removeClass = function (item, key) {
  item.classList.remove(`${key}`)
}

</script>

<style scoped>
.mini {
  transform: scale(300px, 150px);
}
.shift {
  transition: all 1s;
}
.new-main{
  transform: scale(400px, 300px);
}
button {
  width: 30px;
  border: 0;
  font-size: 50px;
  font-weight: bold;
  color: rgba(186, 223, 255, 0.579);
  background-color: rgba(240, 248, 255, 0);
}

header {
  height: 500px;
  background-color: rgb(223, 239, 253);
  position: relative;
}
.next-button {
  right: 40px;
}
.item {
  position: absolute;
  bottom: 50px;
  cursor: pointer;
}

.main {
  width: 400px;
  height: 300px;
  background-color: blue;
  left: 300px;
  z-index: 1;

} 
.remain {
width: 300px;
height: 150px;
background-color: red;
} 

.remain-1 {
  left: -150px;
}

.remain-2 {
  left: 850px;
}
.remain-3 {
  left: 1300px;
}

.remain-4 {
  left: 1750px;
}
</style>