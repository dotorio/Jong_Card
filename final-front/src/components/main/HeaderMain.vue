<template>
  <div>
    <header class="overflow-hidden">
      <MainItem :card="cardList[0]" class="item shift remain remain-1"/>
      <MainItem :card="cardList[1]" class="item shift main"/>
      <MainItem :card="cardList[2]" class="item shift remain remain-2"/>
      <MainItem :card="cardList[3]" class="item shift remain remain-3"/>
      <MainItem :card="cardList[4]" class="item shift remain remain-4"/>
      <button class="prev-button position-absolute top-50 ps-5" @click="changeItem('next')"><</button>
      <button class="next-button position-absolute top-50" @click="changeItem('prev')">></button>
    </header>
  </div>
</template>

<script setup>
import MainItem from '@/components/main/HeaderItem.vue'
import { ref } from 'vue';

const cardList = ref([
  { id: 1, title: 'My WE:SH 카드', cardCompany: 'KB국민카드' ,content: "다양한 혜택으로 일상을 더 즐겁게", summary: '일상을 더 즐겁게', main: 1, img: '/src/assets/home/main1.svg'},
  { id: 2, title: 'WE:SH All 카드', cardCompany: 'KB국민카드' ,content: "모든 생활 영역에서 특별한 혜택을 누리세요", summary: '특별한 생활 혜택', main: 2, img: '/src/assets/home/main2.svg'},
  { id: 3, title: 'K-패스 체크카드', cardCompany: 'KB국민카드' ,content: "일상 속 편리하고 안전한 결제를 원하신다면", summary: '편리하고 안전한 결제', main: 3, img: '/src/assets/home/main3.svg'},
  { id: 4, title: 'K-패스카드', cardCompany: 'KB국민카드' ,content: "쉽고 빠른 교통 결제, 다방면에서 유용한", summary: '쉽고 빠른 교통 결제', main: 4, img: '/src/assets/home/main4.svg'},
  { id: 5, title: '톡톡 my living카드', cardCompany: 'KB국민카드' ,content: "당신의 삶을 위한 혜택, 스마트한 소비를 실현하는" ,summary: '스마트한 소비 혜택', main: 5, img: '/src/assets/home/main5.svg'},
])


const changeBlock1 = function (item, direct) {
  // console.log(item)
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
  cardList.value.forEach(element => {
    if (direct === 'next') {
      element.main += 1
      element.main %= 6
      if (element.main === 0) {
        element.main += 1
      }
    } else {
      element.main -= 1
      if (element.main === 0) {
        element.main += 5
      }
    }
    // console.log(element.main)
  })


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
.mini, .mini > img {
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
  /* border: 1px solid black; */
  color: rgba(186, 223, 255, 0.579);
  background-color: rgba(240, 248, 255, 0);
}

header {
  height: 600px;
  background-color: rgb(223, 239, 253);
  position: relative;
}
.next-button {
  right: 40px;
}
.item {
  position: absolute;
  bottom: 120px;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.main {
  width: 500px;
  height: 370px;
  background-color: #E0FFFF;

  border-radius: 20px;
  left: 400px;
  z-index: 1;

} 
.remain {
  width: 350px;
  height: 180px;
  background-color: #E0FFFF;
  border-radius: 10px;
  padding-left: 22px;
} 

.remain-1 {
  left: -150px;
}

.remain-2 {
  left: 1100px;
}
.remain-3 {
  left: 1700px;
}

.remain-4 {
  left: 2350px;
}
</style>