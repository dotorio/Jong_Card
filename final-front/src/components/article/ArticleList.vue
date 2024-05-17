<template>
  <div>
    <ArticleItem 
    v-if="articleStore.currentPage === props.partId"
    v-for="article in props.articlePart.articleList" :key="article.id"
    :article="article"
    />
  </div>
</template>

<script setup>
import ArticleItem from '@/components/article/ArticleItem.vue'
import { useArticleStore } from '@/stores/article';
import { ref } from 'vue';
const props = defineProps(
  {
    articlePart: Object,
    partId:Number
  }
)
const articleStore = useArticleStore()




</script>

<style scoped>
.none {
  display: none;
}
</style>