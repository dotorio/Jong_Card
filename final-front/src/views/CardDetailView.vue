<template>
  <div>
     <h1>
      <div class="container">
        <div class="row">
          <div class="col-4 img mt-5">
            <div class="card-left d-flex flex-column align-items-center" 
            v-if="cardBenefits">
              <span v-if="cardBenefits.category === 1" class="badge text-bg-primary">할인카드</span>
              <span v-if="cardBenefits.category === 2" class="badge text-bg-success">적립카드</span>
              <p class="cardName">{{ cardBenefits.cardName }}</p>
              <img :src="cardImg" alt="#" @click="contentDetail" class="main-img">
              <a :href="cardBenefits.site" class="site mt-4"
              >카드 홈페이지</a>
            </div>
          </div>
          <div class="col-7">
            <div class="row mt-3" @click="contentChange">
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.convenience_store, {active: activeBenefit.convenience_store}]" class="convenience_store" :disabled="option.convenience_store"
                ><img src="../assets/sort/convenience_store.svg" alt="#">
                편의점</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.telecom, {active: activeBenefit.telecom}]" class="telecom"
                :disabled="option.telecom">
                <img src="../assets/sort/telecom.svg" alt="#">
                통신요금</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.OTT, { active: activeBenefit.OTT}]" class="OTT"
                :disabled="option.OTT">
                <img src="../assets/sort/OTT.svg" alt="#">
                OTT</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.fuel, {active: activeBenefit.fuel}]" class="fuel"
                :disabled="option.fuel">
                <img src="../assets/sort/fuel.svg" alt="#">
                주유요금</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.cafe, {active: activeBenefit.cafe}]" class="cafe"
                :disabled="option.cafe">
                <img src="../assets/sort/cafe.svg" alt="#">
                카페</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.food, {active: activeBenefit.food}]" class="food"
                :disabled="option.food">
                <img src="../assets/sort/food.svg" alt="#">
                음식점</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.public_transport, {active: activeBenefit.public_transport}]" class="public_transport"
                :disabled="option.public_transport">
                <img src="../assets/sort/public_transport.svg" alt="#">
                대중교통</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.hospital, {active: activeBenefit.hospital}]" class="hospital"
                :disabled="option.hospital">
                <img src="../assets/sort/hospital.svg" alt="#">
                병원</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.movie, {active: activeBenefit.movie}]" class="movie"
                :disabled="option.movie">
                <img src="../assets/sort/movie.svg" alt="#">
                영화</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.online_shopping, {active: activeBenefit.online_shopping}]" class="online_shopping"
                :disabled="option.online_shopping">
                <img src="../assets/sort/online_shopping.svg" alt="#">
                온라인 쇼핑</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.offline_shopping, {active: activeBenefit.offline_shopping}]" class="offline_shopping"
                :disabled="option.offline_shopping">
                <img src="../assets/sort/offline_shopping.svg" alt="#">
                쇼핑</button>
              </div>
              <div class="col-xl-3 col-lg-4 col-6">
                <button :class="[option.delivery, {active: activeBenefit.delivery}]" class="delivery"
                :disabled="option.delivery">
                <img src="../assets/sort/delivery.svg" alt="#">
                배달</button>
              </div>
              <div class="content col-12" v-if="cardBenefits">
                <CardDetailItem class="animate__animated" :class="contentClass"
                :content="cardBenefits[currentBenefit]"
                :benefit="currentBenefit"
                :category="cardBenefits.category"
                :site="cardBenefits.site"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
     </h1>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CardDetailItem from '@/components/CardDetailItem.vue'

const route = useRoute()
const contentClass = ref('')
const cardImg = `/src/assets/cards/${route.params.card_id}.svg`
const cardBenefits = ref(null)

const option = ref({
  convenience_store: false,
  telecom: false,
  OTT: false,
  fuel: false,
  cafe: false,
  food: false,
  public_transport: false,
  hospital: false,
  movie: false,
  online_shopping: false,
  offline_shopping: false,
  delivery: false,
})
const activeBenefit = ref({
  detail: true,
  convenience_store: false,
  telecom: false,
  OTT: false,
  fuel: false,
  cafe: false,
  food: false,
  public_transport: false,
  hospital: false,
  movie: false,
  online_shopping: false,
  offline_shopping: false,
  delivery: false,
})
const currentBenefit = ref('detail')

onMounted(() => {
  axios({
    method: 'get',
    url: `http://127.0.0.1:8000/cards/${route.params.card_id}/card_detail/`
  })
  .then(res => {
    cardBenefits.value = res.data
    for (const element in res.data) {
      for (const temp in res.data[element]) {
        if (res.data[element][temp].length === 1) {
          option.value[element] = true
        }
      }
    }
    console.log(option.value)  
  })
  .catch(err => {
    console.log(err)
  })
})

const contentChange = function (event) {
  const clickBenefitStr = event.target.getAttribute('class')
  const benefit = clickBenefitStr.split(' ')[0]
  activeBenefit.value[currentBenefit.value] = false
  currentBenefit.value = benefit
  activeBenefit.value[benefit] = true
  contentClass.value = 'animate__fadeInRight'
  setTimeout(() => {
    contentClass.value = ''
  }, 1000)

}

const contentDetail = function (event) {
  const clickBenefitStr = event.target.getAttribute('class')
  const benefit = clickBenefitStr.split(' ')[0]
  activeBenefit.value[currentBenefit.value] = false
  currentBenefit.value = 'detail'
  activeBenefit.value['detail'] = true
  contentClass.value = 'animate__fadeInRight'
  setTimeout(() => {
    contentClass.value = ''
  }, 1000)
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  background-color: #B4D9D3;
  height: 720px;
  padding: 30px;
  border-radius: 10px;
}

.cardName {
  margin-top: 70px;
  font-size: 20px;
  font-weight: 700;
}
.site {
  display: inline-block;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  color: #184D59;
  left: 0px;
  bottom: -70px;
  padding-top: 15px;
  width: 120px;
  height: 50px;
  border: 2px solid #184D59;
  border-radius: 10px;
}
.badge {
  position: absolute;
  font-size: 20px;
}
.site:hover {
  transition: all 0.5s;
  color: #F0F9E8;
  border: 2px solid #F0F9E8;
}
.active {
  background-color: gray;
  color: white;
}
div > img {
  width: 50%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.img {
  text-align: center;
  position: relative;
}
button {
  width: 120px;
  margin: 10px;
  height: 35px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 5px;
  position: relative;
  padding-left: 20px;
}
.content {
  width: 80%;
  margin: 50px auto;
  /* border: 1px solid black; */
  height: 500px;
}
button > img {
  position: absolute;
  z-index: 1;
  left: -5px;
  top: -5px;
  scale: 1.2;
}
.main-img {
  cursor: pointer;

}
</style>