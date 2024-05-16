<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';

</script>

<template>
  <nav>
    <NavMenu />
  </nav>
  <RouterView />
</template>

<style scoped>




@font-face {
    font-family: 'NEXON Lv2 Gothic';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>
