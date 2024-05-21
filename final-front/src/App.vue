<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';
import { useCardStore } from './stores/card';
import { onMounted } from 'vue'
import { useMyPageStore } from './stores/mypage';
import { useArticleStore } from './stores/article';
import { useAccountStore } from './stores/account';

const store = useCardStore()
const accountStore = useAccountStore()
const articleStore = useArticleStore()
const myPageStore = useMyPageStore()
onMounted(() => {
  store.updateCardList()
  accountStore.getUserList()
})

</script>

<template>
  <NavMenu />
  <RouterView />
</template>

<style scoped>
* {
  font-family: 'NEXON Lv2 Gothic';
}



@font-face {
    font-family: 'NEXON Lv2 Gothic';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>
