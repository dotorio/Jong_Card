<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <h1>메인 페이지</h1>


  <RouterLink :to="{ name: 'article' }">문의글</RouterLink>
</template>

<style scoped>

</style>
