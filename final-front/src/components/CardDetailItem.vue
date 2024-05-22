<template>
  <div class="main"> 
    <p v-for="benefit in Object.keys(props.content)" class="my-4 mx-5">
      <span v-if="props.benefit === 'detail'">
        {{ benefit }} : {{ props.content[benefit] }}
      </span>
      <div v-else>
        <div class="d-flex align-items-center">
          <img :src="`/src/assets/card-detail/${benefit}.svg`" alt="#" class="me-3">  {{ benefit }} 
        </div>
        <div class="cost d-flex justify-content-between">
          <div class="before-cost d-flex align-items-center" v-if="props.category === 1">
            {{ props.content[benefit][0] }}원
          </div>
          <div class="d-flex align-items-center" v-else>
            {{ props.content[benefit][0] }}원
          </div>
          <div>
            <img src="../assets/card-detail/after.svg" alt="#">
          </div>
          <div class="after-cost d-flex align-items-center">
            {{ props.content[benefit][1] }}원
          </div>

        </div>
          
      </div>
    </p>
    <p>
    </p>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import {  } from 'vue-router';



const props = defineProps({
  content: Object,
  benefit: String,
  category: Number,
  site: String
})

console.log(props.site)

</script>

<style scoped>
.main {
  background-color: white;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  position: relative;
}
.before-cost {
  text-decoration-line: line-through;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
  font-size: 20px;
}
.cost {
  position: absolute;
  left: 270px;
  transform: translateY(-35px);
  width: 250px;
}
.after {
  position: absolute; 
  left: 370px;
  transform: translateY(-10px);
}
.after-cost {
  font-size: 20px;
}
</style>