<template>
  <div>
    <main>
      <button @click="growStore.upGage">경험치 증가!</button>
      <div class="card-container">
        <img :src="growStore.coinImg" alt="" 
        class="coin animate__animated"
        :class="coin">
        <div class="card-character">
          <img :src="growStore.cardImg" alt=""
          class="animate__animated"
          :class="card" @click="activeBounce">
          <div :class="shadow">
          </div>
        </div>
      </div>
      <div class="exp-container">
        <div class="exp-rel">
          <div class="exp-gage">
            <div
            :class="[expGage, growStore.cardGageBar]" @click="gageUp">
            </div>
          </div>
          <div class="exp-text">
            {{ growStore.cardGage }} %
          </div>
        </div>
      </div>
      <div class="mission-container">
        <div class="mission" @click="missionStore1.missionClear">
          <MissionItem1/> 
          <div class="star" :class="growStore.star1">
            <img src="../assets/card-grow/star.svg" alt="">
          </div> 
        </div>
        <div class="mission" @click="missionStore2.missionClear">
          <MissionItem2/>
          <div class="star" :class="growStore.star2">
            <img src="../assets/card-grow/star.svg" alt="">
          </div>  
        </div>
        <div class="mission">
          <MissionItem3/>
          <div class="star animate__animated" :class="growStore.star3">
            <img src="../assets/card-grow/star.svg" alt="">
          </div> 
        </div>
        <MissionItem4 class="mission"/> 
        <MissionItem5 class="mission"/> 
      </div>
      <!-- 모달 팝업 -->
      <div class="modal animate__animated" :class="growStore.modalOn">
        <div class="modal-popup">
          <p>레벨업 하였습니다!</p>
          <img :src="growStore.cardImg" alt="">
          <button class="close-btn" @click="growStore.closeModal">확인</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MissionItem1 from '@/components/mission/MissionItem1.vue'
import MissionItem2 from '@/components/mission/MissionItem2.vue'
import MissionItem3 from '@/components/mission/MissionItem3.vue'
import MissionItem4 from '@/components/mission/MissionItem4.vue'
import MissionItem5 from '@/components/mission/MissionItem5.vue'
import { useMissionStore2 } from '@/stores/mission-2'
import { useMissionStore3 } from '@/stores/mission-3'
import { useCardGrowStore } from '@/stores/cardgrow'
import { RouterLink } from 'vue-router'



const card = ref(null)
const shadow = ref('shadow')
const coin = ref(null)

const missionStore2 = useMissionStore2()
const missionStore3 = useMissionStore3()
const growStore = useCardGrowStore()

const expGage = ref(null)

onMounted(() => {
  growStore.moveStar1()
  growStore.upGage()
})

// const gageUp = function() {
//   expGage.value = 'exp-gage-100'
// }


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

.star {
  margin-top: 10px;
  opacity: 0;
}
.star-move-1 {
  transition: all 2s;
  opacity: 1;
  transform: translate(-250px, 400px); 
}
.star-move-2 {
  transition: all 2s;
  opacity: 1;
  transform: translate(-250px, 290px); 
}
.star-move-3 {
  transition: all 2s;
  opacity: 1;
  transform: translate(-250px, 180px); 
}
/* 경험치 별 영역 끝 */


main > button {
  width: 100px;
  height: 50px;
  position: absolute;
  top: 620px;
  left: 220px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  border-radius: 10px;
  border-color: rgb(102, 110, 250);
  background-color: rgb(155, 170, 255);
}
main {
  height: 100vh;
  background-color: navy;

  position: relative;
}
/* 모달 영역 */
.modal {
  width: 500px;
  height: 500px;
  border-radius: 20px;
  background-color: rgb(80, 206, 252);
  /* z-index: 10; */
  display: none;
  top: 100px;
  left: 200px;
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
  color: white;
  border-radius: 10px;
  border-color: rgb(102, 110, 250);
  background-color: rgb(155, 170, 255);
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
  top: 30px;

  font-size: 20px;
  font-weight: 700;
}
.exp-gage {
  width: 350px;
  height: 80px;
  border: 1px solid black;
  border-radius: 5px;

  margin-top: 10px;
  margin-left: 10px;
}
.exp-gage-0 {
  width: 0px;
  height: 80px;
  transition: all 1s;
}
.exp-gage-25 {
  width: 85px;
  height: 80px;
  border-radius: 5px 0 0 5px;
  background-color: yellow;
  transition: all 1s;
}
.exp-gage-50 {
  width: 175px;
  height: 80px;
  border-radius: 5px 0 0 5px;
  background-color: yellow;
  transition: all 1s;
}
.exp-gage-75 {
  width: 260px;
  height: 80px;
  border-radius: 5px 0 0 5px;
  background-color: yellow;
  transition: all 1s;
}
.exp-gage-100 {
  width: 350px;
  height: 80px;
  border-radius: 5px;
  background-color: yellow;
  transition: all 1s;
}

.exp-container {
  width: 450px;
  height: 100px;
  background-color: aqua;
  border-radius: 10px;

  position: absolute;
  top: 500px;
  left: 40px
}

/* 경험치 영역 끝 */

/* 미션 영역 */

.mission {
  width: 90%;
  height: 80px;
  border-radius: 10px;
  background-color: aqua;
}

.mission-container {
  width: 500px;
  height: 600px;
  background-color: rgb(99, 99, 194);
  border-radius: 10px;

  position: absolute;
  top: 70px;
  left: 550px;

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
  background-color: rgb(99, 99, 194);
  border-radius: 20px;

  position: absolute;
  top: 120px;
  left: 100px;

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
</style>