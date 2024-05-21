<template>
  <div>
     <h1>
      <div class="container">
        <div class="row">
          <div class="col-4 img mt-5">
            <img :src="cardImg" alt="#" @click="contentDetail" class="main-img">
          </div>
          <div class="col-8">
            <div class="row btn" @click="contentChange">
              <button :class="[option.convenience_store, {active: activeBenefit.convenience_store}]" class="convenience_store col-2" :disabled="option.convenience_store"
              ><img src="../assets/sort/convenience_store.svg" alt="#">
              편의점</button>
              <button :class="[option.telecom, {active: activeBenefit.telecom}]" class="telecom col-2"
              :disabled="option.telecom"
        
              ><img src="../assets/sort/telecom.svg" alt="#">
              통신요금</button>
              <button :class="[option.OTT, { active: activeBenefit.OTT}]" class="OTT col-2"
              :disabled="option.OTT"
        
              ><img src="../assets/sort/OTT.svg" alt="#">
              OTT</button>
              <button :class="[option.fuel, {active: activeBenefit.fuel}]" class="fuel col-2"
              :disabled="option.fuel"
        
              ><img src="../assets/sort/fuel.svg" alt="#">
              주유요금</button>
              <button :class="[option.cafe, {active: activeBenefit.cafe}]" class="cafe col-2"
              :disabled="option.cafe"
        
              ><img src="../assets/sort/cafe.svg" alt="#">
              카페</button>
              <button :class="[option.food, {active: activeBenefit.food}]" class="food col-2"
              :disabled="option.food"
        
              ><img src="../assets/sort/food.svg" alt="#">
              음식점</button>
              <button :class="[option.public_transport, {active: activeBenefit.public_transport}]" class="public_transport col-2"
              :disabled="option.public_transport"
        
              ><img src="../assets/sort/public_transport.svg" alt="#">
              대중교통</button>
              <button :class="[option.hospital, {active: activeBenefit.hospital}]" class="hospital col-2"
              :disabled="option.hospital"
        
              ><img src="../assets/sort/hospital.svg" alt="#">
              병원</button>
              <button :class="[option.movie, {active: activeBenefit.movie}]" class="movie col-2"
              :disabled="option.movie"
        
              ><img src="../assets/sort/movie.svg" alt="#">
              영화</button>
              <button :class="[option.online_shopping, {active: activeBenefit.online_shopping}]" class="online_shopping col-2"
              :disabled="option.online_shopping"
        
              ><img src="../assets/sort/online_shopping.svg" alt="#">
              온라인 쇼핑</button>
              <button :class="[option.offline_shopping, {active: activeBenefit.offline_shopping}]" class="offline_shopping col-2"
              :disabled="option.offline_shopping"
        
              ><img src="../assets/sort/offline_shopping.svg" alt="#">
              쇼핑</button>
              <button :class="[option.delivery, {active: activeBenefit.delivery}]" class="delivery col-2"
              :disabled="option.delivery"
        
              ><img src="../assets/sort/delivery.svg" alt="#">
              배달</button>
            </div>
            <div class="content" v-if="cardBenefits">
              <CardDetailItem class="animate__animated" :class="contentClass"
              :content="cardBenefits[currentBenefit]"
              :benefit="currentBenefit"
              :category="cardBenefits.category"
              />
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
    console.log(res.data)
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
  height: 620px;
  padding: 20px;
  border-radius: 10px;

}
.active {
  background-color: gray;
  color: white;
}
div > img {
  width: 50%;
  margin-top: 100px;
  margin-left: 40px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.img {
  text-align: center;
}
button {
  width: 120px;
  margin: 15px;
  height: 35px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 5px;
  position: relative;
  padding-left: 30px;
}
.content {
  width: 80%;
  margin: 20px auto;
  /* border: 1px solid black; */
  height: 500px;
}
button > img {
  position: absolute;
  z-index: 1;
  left: -15px;
  top: 0;
  scale: 1.2;
}
.main-img {
  cursor: pointer;
}
</style>