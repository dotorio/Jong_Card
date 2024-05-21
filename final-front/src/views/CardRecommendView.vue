<template>
  <div>
    <Advertisement />

    <h1>카드 추천 <img src="../assets/sort/good.svg" alt="#"></h1>
    <div class="cards" v-if="cardList">
      <hr>
      <div class="container">
        <div class="sort-btn row ms-sm-2 ps-sm-4 ms-lg-5 ps-lg-4 ms-xl-5 ps-xl-5" @click="sortCard">
          <button :class="selectedOptions.convenience_store"
          class="col-4">
            <img src="../assets/sort/convenience_store.svg" alt="#">
            편의점</button>
          <button :class="selectedOptions.telecom"
          class="col-4">
            <img src="../assets/sort/telecom.svg" alt="#">
            통신요금</button>
          <button :class="selectedOptions.OTT"
          class="col-4">
            <img src="../assets/sort/OTT.svg" alt="#">
            OTT</button>
          <button :class="selectedOptions.fuel"
          class="col-4">
            <img src="../assets/sort/fuel.svg" alt="#">
            주유요금</button>
          <button :class="selectedOptions.cafe"
          class="col-4">
            <img src="../assets/sort/cafe.svg" alt="#">
            카페</button>
          <button :class="selectedOptions.food"
          class="col-4">
            <img src="../assets/sort/food.svg" alt="#">
            음식점</button>
          <button :class="selectedOptions.public_transport">
            <img src="../assets/sort/public_transport.svg" alt="#">
            대중교통</button>
          <button :class="selectedOptions.hospital"
          class="col-4">
            <img src="../assets/sort/hospital.svg" alt="#">
            병원</button>
          <button :class="selectedOptions.movie"
          class="col-4">
            <img src="../assets/sort/movie.svg" alt="#">
            영화</button>
          <button :class="selectedOptions.online_shopping"
          class="col-4">
            <img src="../assets/sort/online_shopping.svg" alt="#">
            온라인 쇼핑</button>
          <button :class="selectedOptions.offline_shopping"
          class="col-4">
            <img src="../assets/sort/offline_shopping.svg" alt="#">
            쇼핑</button>
          <button :class="selectedOptions.delivery"
          class="col-4">
            <img src="../assets/sort/delivery.svg" alt="#">
            배달</button>
        </div>
      </div>
      
      
      <div class="container ps-4 mt-4">
        <div class="row animate__animated" 
        :class="cardShow">
          <CardItem class="card col-xl-2 col-lg-3 col-md-4 col-6"
          v-for="card in newCardList" :key="card.id"
          :card-info="card"
          /> 
        </div>
      </div>
    </div>
    <div v-else>
      로딩중..
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCardStore } from '@/stores/card'
import CardItem from '@/components/CardItem.vue'
import Advertisement from '@/components/Advertisement.vue';

const store = useCardStore()
onMounted(() => {
  store.updateCardList()
  cardShow.value = 'animate__fadeInLeft'
  console.log(cardShow.value)
})

onUnmounted(() => {
  cardShow.value = ''
  console.log(cardShow.value)
})
// 전제 카드 리스트
const cardList = ref(null) 
// 정렬 기준을 선택할 때마다 새로 생길 리스트
const newCardList = ref(null)
const cardShow = ref('card-hidden')
const selectedOptions = ref({
  convenience_store: ['convenience_store'],
  telecom: ['telecom'],
  OTT: ['OTT'],
  fuel: ['fuel'],
  cafe: ['cafe'],
  food: ['food'],
  public_transport: ['public_transport'],
  hospital: ['hospital'],
  movie: ['movie'],
  online_shopping: ['online_shopping'],
  offline_shopping: ['offline_shopping'],
  delivery: ['delivery'],
})

// 초기 세팅
// cardList.value = store.cardList
cardList.value = JSON.parse(localStorage.getItem('cardList'))
newCardList.value = cardList.value
// 정렬 기준 별 포함/미포함(true/false) 리스트
const benefitList = store.benefitList

// 해당 정렬 기준이 선택되었는지를 나타내는 오브젝트
const selectBenefit = ref({
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
  delivery: false
})
// 정렬 기준 버튼이 클릭 됐을 때 실행
const sortCard = function(event) {
  cardShow.value = 'card-hidden'
  setTimeout(() => {
    cardShow.value = 'animate__fadeInLeft'
  }, 300)
  // 눌려진 버튼의 클래스를 가져옴 -> 정렬 기준
  const clickBenefitStr = event.target.getAttribute('class')
  const clickBenefit = clickBenefitStr.split(' ')[0]
  console.log(clickBenefit)
  // event.target.classList.toggle('active')
  // console.log(clickBenefit)
  // console.log(selectBenefit.value[clickBenefit])
  // 해당 정렬 기준이 기존과 반대가 되야함 (활성화 -> 비활성화 , 비활성화 -> 활성화)
  if (selectBenefit.value[clickBenefit]) {
    selectedOptions.value[clickBenefit].pop()
  } else {
    selectedOptions.value[clickBenefit].push('active')
  }
  selectBenefit.value[clickBenefit] = !selectBenefit.value[clickBenefit]

  // 최종적으로 정렬된 카드의 Boolean 값
  const isSelected = []

  // 처음에는 다 true
  cardList.value.forEach(e => {
    isSelected.push(true)
  })
  newCardList.value = []
  // console.log(benefitList)
  // 모든 정렬 기준을 순회
  // console.log(store.benefitList)
  Object.keys(selectBenefit.value).forEach(element => {
    // console.log(element)
    // 만약 정렬 기준이 활성화 되어있다면
    if (selectBenefit.value[element]) {
      // 모든 카드를 순회
      cardList.value.forEach(card => {
        // index 같은 것
        const id = card.id - 1
        // console.log(benefitList[element][id])
        // 만약 해당 정렬 기준을 포함하고 있지 않고, isSelected 값이 true라면 
        if (!store.benefitList[element][id] && isSelected[id]) {
          // 정렬된 카드에서 제외
          isSelected[id] = false
        }
      })
    }
  })
  // 위에 코드를 다 실행하면 정렬된 카드가 된다.
  // newCardList에 하나씩 추가
  cardList.value.forEach(card => {
    const id = card.id - 1
    if (isSelected[id]) {
      newCardList.value.push(card)
    }
  })
  // console.log(isSelected)
  
}
</script>
<style scoped>
h1 {
  margin: 30px 200px ;
}
.sort-btn {
  margin-left: 70px;  
}
.card {
  height: 300px;
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: white;
}
.card-hidden {
  opacity: 0;
}
button {
  margin: 20px;
  width: 120px;
  height: 40px;
  font-weight: 700;
  border: 2px solid black;
  border-radius: 5px;
  position: relative;
  padding-left: 20px;
}

button > img {
  position: absolute;
  left: -10px;
  top: 0;
}
.active {
  color: rgb(241, 214, 214);
  background-color: rgb(124, 112, 112);
}
.cards {
  height: 1000px;
}
</style>