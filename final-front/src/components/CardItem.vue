<template>
  <div>
    <div class="card">
      <img :src="`src/assets/cards/${cardId}.svg`" alt="#">
      
      <label for="check" class="like" @click="likeCard">
        <input type="button" value="하트" :disabled="isLogin"
        :class="{ check: check }">
        <svg t="1689815540548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2271"><path d="M742.4 101.12A249.6 249.6 0 0 0 512 256a249.6 249.6 0 0 0-230.72-154.88C143.68 101.12 32 238.4 32 376.32c0 301.44 416 546.56 480 546.56s480-245.12 480-546.56c0-137.92-111.68-275.2-249.6-275.2z" 
          fill="#231F20" p-id="2272" class="heart"></path></svg>
        <span></span>
      </label>

      <p :class="cardClass" class="card-name">{{ cardName }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import { useCardStore } from '@/stores/card';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const props = defineProps({
  cardInfo: Object
})
const cardStore = useCardStore()


const cardName = props.cardInfo.cardName
const cardId = props.cardInfo.id


const cardClass = ref([
  `card-${props.cardInfo.id}`])
const accountStore = useAccountStore()

const isLogin = ref(false)
const check = ref(false)

setTimeout(() => {
  if (accountStore.isLogin){
    cardStore.userLikeCards.forEach(element => {
      // console.log(element)
      if (element.id === cardId) {
        check.value = true
      }
    });
  }
}, 500)

if(!accountStore.userName) {
  isLogin.value = true
}


const likeCard = function () {
  if (accountStore.isLogin) {
    check.value = !check.value
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/cards/${accountStore.userName}/${props.cardInfo.id}/likes_card_toggle/`
    })
    .then(res => {
      const action = res.data.action
      const card = res.data.card
      console.log(card)
    }) 
    .catch(err => {
      console.log(err)
    })
  }
}
 

</script>

<style scoped>
* {
  border-color: white;
}
.like {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 20px;
  top: 0;
  scale: 0.14;
  --c: #f8415c;
  z-index: 1;
}

svg{
    width: 200px;
    /*상대포지션*/
    position: relative;
    z-index: 10;
}

.heart{
    /*색 보충*/
    fill: #eee;
    /*stroke속성은 선, 문자, 원소등의 테두리에대해서 디자인 가능*/
    stroke: red;
    /*선의 넓이*/
    stroke-width: 40px;
    /*선을 점선으로 설정, 점선의 길이 설정*/
    stroke-dasharray: 3000;
    /*displacement of line*/
    stroke-dashoffset: 3000;
    /*끝점은 둥글게*/
    stroke-linecap: round;
}

span{
    display: block;
    width: 24px;
    height: 24px;
    background-color: transparent;
    border-radius: 50%;
    /*절대적 포지션: center*/
    position: absolute;
    top: 92px;
    left: 90px;
    transform: translate(-50%, -50%) scale(0);
    /*각 방향의 쉐도우 설정*/
    /*var함수로 쉐도우 컬러 설정*/
    box-shadow: 0 -160px 0 var(--c),
    0 160px 0 var(--c),
    -160px 0 0 var(--c),
    160px 0 0 var(--c),
    -120px -120px 0 var(--c),
    120px -120px 0 var(--c),
    120px 120px 0 var(--c),
    -120px 120px 0 var(--c);
}

/*checkbox를 클릭할 경우 애니메이션 실행*/
.check + svg .heart {
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: drawHeart 0.5s linear forwards;
}

.check ~ span{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 0.6s ;
}

.check + svg{
     /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: beat 1s linear forwards;;
}
label{
    /*마우스 heart로 이동시 마우스 커서변동*/
    cursor: pointer;
}
.card-name {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
/*애니메이션 효과 설정*/
/*heart 애니메이션*/
@keyframes drawHeart{
    0%{
        stroke-dashoffset: 2600;
    }
    80%{
        fill: #eee;
        stroke-dashoffset: 0;
    }
    100%{
        fill: var(--c);
        stroke-dashoffset: 0;
    }

}
/*점 애니메이션*/
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

/*두근두근 애니메이션*/
@keyframes beat {
    0%{
        transform: scale(1);
    }
    70%{
        transform: scale(1);
    }
    80%{
        transform: scale(1.2);
    }
    100%{
        transform: scale(1);
    }
}
</style>