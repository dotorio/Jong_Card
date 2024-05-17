<template>
  <div>
    <div class="card">
      <form action="" @submit.prevent="likeCard">
        <img :src="`src/assets/cards/${cardId}.svg`" alt="#">
        <input type="submit" value="하트"
        :disabled="isLogin">
      </form>

      <p :class="cardClass">{{ cardName }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
  cardInfo: Object
})

const cardName = props.cardInfo.cardName
const cardId = props.cardInfo.id
const check = ref([`${props.cardInfo.id}`])
const cardClass = ref([
  `card-${props.cardInfo.id}`])
const accountStore = useAccountStore()

const isLogin = ref(false)


if(!accountStore.userName) {
  console.log('asdads')
  isLogin.value = true
}


const likeCard = function () {
  axios({
    method: 'post',
    url: `http://127.0.0.1:8000/cards/${accountStore.userName}/${props.cardInfo.id}/likes_card_toggle/`
  })
  .then(res => {
    console.log('좋아요 성공')
  }) 
  .catch(err => {
    console.log(err)
  })
}
 

</script>

<style scoped>
.like {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 20px;
  top: 0;
  scale: 0.14;
  --c: #ff6b81;
}

svg{
    width: 200px;
    /*상대포지션*/
    position: relative;
    z-index: 10;
}

#heart{
    /*색 보충*/
    fill: #eee;

    /*stroke속성은 선, 문자, 원소등의 테두리에대해서 디자인 가능*/
    stroke: var(--c);
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
    top: 90px;
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
.check + svg #heart {
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: drawHeart 1s linear forwards;
}

.check ~ span{
    /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: blink 0.5s ease-in-out forwards;
    /*애니메이션 딜레이*/
    animation-delay: 0.8s ;
}

.check + svg{
     /*애니메이션실행: 애니메이션이름, 실행시간, 선형 마지막 정지한 프레임*/
    animation: beat 1s linear forwards;;
}
label{
    /*마우스 heart로 이동시 마우스 커서변동*/
    cursor: pointer;
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