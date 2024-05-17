<template>
  <div>
    <h1>카드 추천</h1>
    <div class="cards" v-if="cardList">
      <hr>
      <div class="sort-btn" @click="sortCard">
        <button :class="selectedOptions.convenience_store">편의점</button>
        <button :class="selectedOptions.telecom">통신요금</button>
        <button :class="selectedOptions.OTT">OTT</button>
        <button :class="selectedOptions.fuel">주유요금</button>
        <button :class="selectedOptions.cafe">카페</button>
        <button :class="selectedOptions.food">음식점</button>
        <button :class="selectedOptions.public_transport">대중교통</button>
        <button :class="selectedOptions.hospital">병원</button>
        <button :class="selectedOptions.movie">영화</button>
        <button :class="selectedOptions.online_shopping">온라인 쇼핑</button>
        <button :class="selectedOptions.offline_shopping">쇼핑</button>
        <button :class="selectedOptions.delivery">배달</button>
      </div>
      <div class="container">
        <CardItem class="card"
        v-for="card in newCardList" :key="card.id"
        :card-info="card"
        /> 
      </div>
    </div>
    <div v-else>
      로딩중..
    </div>
    <!-- <div v-if="benefitList">
      {{ benefitList }}
    </div> -->
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCardStore } from '@/stores/card'
import CardItem from '@/components/CardItem.vue'

const store = useCardStore()

// 전제 카드 리스트
const cardList = ref(null) 
// 정렬 기준을 선택할 때마다 새로 생길 리스트
const newCardList = ref(null)

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
  // 눌려진 버튼의 클래스를 가져옴 -> 정렬 기준
  const clickBenefitStr = event.target.getAttribute('class')
  const clickBenefit = clickBenefitStr.split(' ')[0]
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
.container {
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  height: 300px;
  border: 1px solid black;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  margin: 20px;
  width: 100px;
  height: 40px;
  font-weight: 700;
  border-radius: 5px;
}
.active {
  color: rgb(214, 199, 199);
  background-color: rgb(90, 82, 82);
}

</style>