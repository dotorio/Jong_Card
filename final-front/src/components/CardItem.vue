<template>
  <div>
    <div class="card">
      <img :src="`src/assets/cards/${cardId}.svg`" alt="#">
      <p>{{ cardName }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardInfo: Object
})

const cardName = props.cardInfo.cardName
const cardId = props.cardInfo.id

</script>

<style scoped>

</style>