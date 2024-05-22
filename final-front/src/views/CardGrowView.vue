<template>
  <div>
    <main :class="themaStore.main">
      <div class="out-side" :class="growStore.modalBack">
        <div class="container">
          <button @click="growStore.upGage(expText)"
          :class="themaStore.button">경험치 증가!</button>
          <div class="card-container me-xl-5" 
            :class="themaStore.cardContainer">
            <img :src="growStore.coinImg" alt="#" 
            class="coin animate__animated"
            :class="coin">
            <div class="card-character">
              <span v-if="growStore.cardLevel >= 1" class="span1"></span>
              <span v-if="growStore.cardLevel >= 2" class="span2"></span>
              <span v-if="growStore.cardLevel >= 3" class="span3"></span>
              <span v-if="growStore.cardLevel >= 4" class="span4"></span>
              <span v-if="growStore.cardLevel >= 5" class="span5"></span>
              <img :src="growStore.cardImg" alt="#"
              class="animate__animated"
              :class="card" @click="activeBounce">
              <div :class="shadow">
              </div>
            </div>
          </div>
          <div class="exp-container" :class="themaStore.expContainer">
            <div class="exp-rel" >
              <div class="exp-gage" :class="themaStore.expGage">
                <div class="bg-warning bg-gradient"
                :class="[growStore.cardGageBar, gageBar]">
                </div>
              </div>
              <div ref="expText" class="exp-text" :class="themaStore.thema">
                {{ growStore.cardGage }} %
              </div>
            </div>
          </div>
          <div class="mission-container" :class="themaStore.missionContainer">
            <MissionItem1 class="mission" :class="themaStore.mission"/> 
            <MissionItem2 class="mission" :class="themaStore.mission"/>
            <MissionItem3 class="mission" :class="themaStore.mission"/> 
            <MissionItem4 class="mission" :class="themaStore.mission"/> 
            <MissionItem5 class="mission" :class="themaStore.mission"/> 
          </div>
        </div>
      </div>
        
        <div class="modal animate__animated" :class="growStore.modalOn">
          <div class="modal-popup">
            <p>레벨업 하였습니다!</p>
            <img :src="growStore.cardImg" alt="">
            <button class="close-btn" @click="growStore.closeModal">확인</button>
          </div>
        </div>
      <!-- 모달 팝업 -->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MissionItem1 from '@/components/mission/MissionItem1.vue'
import MissionItem2 from '@/components/mission/MissionItem2.vue'
import MissionItem3 from '@/components/mission/MissionItem3.vue'
import MissionItem4 from '@/components/mission/MissionItem4.vue'
import MissionItem5 from '@/components/mission/MissionItem5.vue'
import { useMissionStore3 } from '@/stores/mission-3'
import { useCardGrowStore } from '@/stores/cardgrow'
import { RouterLink } from 'vue-router'
import { useMyPageStore } from '@/stores/mypage'
import { useAccountStore } from '@/stores/account'
import { useThemaStore } from '@/stores/thema'
const accountStore = useAccountStore()

const themaStore = useThemaStore()
onMounted(() => {
  myPageStore.getCardGrow()
  gageBar.value = 'hidden'
  setTimeout(() => {
    gageBar.value = ''
  }, 500)
})

onUnmounted(() => {
  console.log('나가기')
  growStore.updateCardGrow()
})

const card = ref(null)
const shadow = ref('shadow')
const coin = ref(null)
const missionStore3 = useMissionStore3()
const growStore = useCardGrowStore()
const myPageStore = useMyPageStore()
const gageBar = ref('')
const expText = ref(null)
console.log(expText)
const showData = function () {
  console.log(growStore.cardGage)
  console.log(growStore.cardLevel)
  console.log(growStore.cardImg)
}

const activeBounce = function () {
  missionStore3.upCount()
  coin.value = "animate__fadeInDownBig animate__slow	"
  setTimeout(bounce, 2000)
  setTimeout(() => {
    shadow.value = 'shadow'
  }, 2500)
  setTimeout(removeBounce, 3000)

}
const bounce = function () {
  card.value = 'animate__bounce'
  shadow.value = 'shadow shadow-remove'

}

const removeBounce = function () {
  card.value = null
  coin.value = null
}
</script>

<style scoped>

/* 경험치 별 영역 */
.hidden {
  opacity: 0;
}
/* 경험치 별 영역 끝 */
.container {
  /* background-color: red; */
  /* height: 20px; */
  position: relative;
  width: 1000px;
}

main  button {
  width: 120px;
  height: 60px;
  position: absolute;
  top: 670px;
  left: 120px;
  font-size: 15px;
  font-weight: 700;
  
  border-radius: 10px;
  border-width: thick;
}

main {
  height: 94vh;
  position: relative;
  
}
/* 모달 영역 */
.modal {
  width: 500px;
  height: 500px;
  border-radius: 20px;
  background-color: #F2E5D5;
  /* z-index: 10; */
  display: none;
  top: 100px;
  left: 650px;
  position: absolute;
  text-align: center;
}
.modal-popup > p {
  margin-top: 50px;
  font-size: 40px;
  font-weight: 700;
}
.modal-popup > img {
  position: absolute;
  top: 150px;
  left: 120px;
}
.modal-popup > button {
  width: 100px;
  height: 50px;

  margin-top: 300px;

  font-size: 25px;
  font-weight: 700;
  top: 70px;
  left: 200px;
  color: white;
  border-radius: 10px;
  border-color: #141A26;
  background-color: #141A26;
}
.on {
  display: block;
  z-index: 3;
}

/* 모달 영역 끝 */

/* 경험치 영역 */
.exp-rel {
  position: relative;
}
.exp-text {
  position: absolute;
  right: 10px;
  top: 25px;

  font-size: 20px;
  font-weight: 700;
}
.exp-gage {
  width: 350px;
  height: 80px;
 
  border-radius: 5px;

  margin-top: 10px;
  margin-left: 10px;
  
}
.exp-gage-0 {
  width: 0px;
  height: 74px;
  transition: all 1s;
}
.exp-gage-25 {
  width: 85px;
  height: 74px;
  border-radius: 3px 0 0 3px;
  /* background-color: yellow; */
  transition: all 1s;
}
.exp-gage-50 {
  width: 175px;
  height: 74px;
  border-radius: 3px 0 0 3px;
  /* background-color: yellow; */
  transition: all 1s;
}
.exp-gage-75 {
  width: 260px;
  height: 74px;
  border-radius: 3px 0 0 3px;
  /* background-color: yellow; */
  transition: all 1s;
}
.exp-gage-100 {
  width: 345px;
  height: 74px;
  border-radius: 5px;
  /* background-color: yellow; */
  transition: all 1s;
}

.exp-container {
  width: 450px;
  height: 100px;
  /* background-color: aqua; */
  border-radius: 10px;
  position: absolute;
  top: 550px;
  left: -50px; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

/* 경험치 영역 끝 */

/* 미션 영역 */

.mission {
  width: 90%;
  height: 80px;
  border-radius: 10px;
  
}

.mission-container {
  width: 500px;
  height: 600px;
  border-radius: 10px;

  position: absolute;
  top: 100px;
  right: -30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
}

/* 미션 영역 끝 */

/* 카드 영역 */

.card-container {
  width: 350px;
  height: 350px;
  
  border-radius: 20px;

  position: absolute;
  top: 170px;
  left: 0px;

}
.card-character {
  position: relative;
}
.card-character > img {
  position: absolute;

  top: 120px;
  left: 45px;
  z-index: 1;

  cursor: pointer;
}
.coin {
  position: absolute;
  top: 120px;
  left: 150px;
  /* z-index: 5; */
}
.shadow {
  width: 150px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(70, 60, 60, 0.462);

  position: absolute;
  top: 270px;
  left: 100px;

  transition: all 0.5s;
  opacity: 1;
}
.shadow-remove {
  transition: all 0.2s;
  opacity: 0;
}

.normal {
  opacity: 1;
}
.level-up {
  opacity: 0.5;
}

.span1, .span2, .span3, .span4, .span5{
    display: block;
    width: 24px;
    height: 24px;
    background-color: transparent;
    border-radius: 50%;
    /*절대적 포지션: center*/
    position: absolute;
    
    transform: translate(-50%, -50%) scale(0);
    /*각 방향의 쉐도우 설정*/
    /*var함수로 쉐도우 컬러 설정*/
    scale: 0.5;
    z-index: 5;
    box-shadow: 0 -160px 0 yellow,
    0 160px 0 yellow,
    -160px 0 0 yellow,
    160px 0 0 yellow,
    -120px -120px 0 yellow,
    120px -120px 0 yellow,
    120px 120px 0 yellow,
    -120px 120px 0 yellow;
}
.span1 {
  top: 100px;
  left: 0px;
}
.span2 {
  top: 300px;
  left: 100px;
}
.span3 {
  top: 120px;
  right: 0px;
}
.span4 {
  top: 240px;
  right: 0px;
}
.span5 {
  top: 20px;
  left: 120px;
}
.card-character:hover > .span1{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 1s ;
}
.card-character:hover > .span2{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 0.8s ;
}
.card-character:hover > .span3{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 0.6s ;
}
.card-character:hover > .span4{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 0.4s ;
}
.card-character:hover > .span5{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 0.2s ;
}


.exp-gage-dark {
  border: 3px solid #D9D9D9;
}
.button-dark {
  color: #E0FFFF;
  border-color: #E0FFFF;
  background-color: #141A26;
}
.main-dark {
  background-color: #141A26;
}
.mission-dark {
  background-color: #0F4459;
  color: white;
  /* box-shadow: 0 10px 20px rgba(255, 255, 255, 0.19), 0 6px 6px #0F4459; */
}
.mission-container-dark {
  background-color: #141A26;
  border: 2px solid #A6A6A6;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.card-container-dark {
  background-color: #141A26;
  border: 2px solid #A6A6A6;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.exp-container-dark {
  background-color: #262626;
}

.exp-gage-light {
  border: 3px solid black;
}
.button-light {
  color: white;
  border-color: #45a0b4;
  background-color: #184D59;
}
.main-light {
  background-color: #B4D9CE;
}
.mission-light {
  background-color: #F2F2F2;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.mission-container-light {
  background-color: #659FA6;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.card-container-light {
  background-color: #659FA6;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.exp-container-light {
  background-color: #D9D9D9;
}
.dark {
  color: white;
}
@keyframes blink{
    0%{
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0.8;
    }
    80%{
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100%{
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0;
    }
}
</style>