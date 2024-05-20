<template>
  <div class="main"> 
    <p v-for="benefit in Object.keys(props.content)" class="m-5 ">
      <span v-if="props.benefit === 'detail'">
        {{ benefit }}: {{ props.content[benefit] }}
      </span>
      <span v-else>
        <div class="container">
          <div class="row">
            <div class="col-4">
              {{ benefit }}: 
            </div>
            <div class="col-3">
              <span class="before-cost">
                {{ props.content[benefit][0] }}
              </span>
            </div>
            <div class="col-2">
              <img src="../assets/sort/after.svg" alt="#">
            </div>
            <div class="col-3">
              <span class="after-cost">
                {{ props.content[benefit][1] }}
              </span>
            </div>
          </div>
        </div>
      </span>
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
  benefit: String
})



</script>

<style scoped>
.main {
  background-color: white;
  padding: 10px;
  font-size: 35px;
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.before-cost {
  text-decoration-line: line-through;
  text-decoration-color: red;
  text-decoration-thickness: 5px;
}


</style>