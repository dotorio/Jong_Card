<template>
  <div>
    {{ card }}
  </div>
</template>

<script setup>

import { ref } from 'vue';

const props = defineProps({
  card : Object
})



</script>

<style scoped>

</style>