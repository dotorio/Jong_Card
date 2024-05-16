<template>
  <div>
    <div class="article">
      <div class="title">
        <span>{{ article.title }}</span>
      </div>
      <div class="user">
        <span>{{ article.username }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  article: Object
})

const article = props.article
</script>

<style scoped>
.article {
  height: 50px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
}
.article .title {
  width: 70%;
  height: 50px;
  border-right: 2px solid black;
  text-align: center;
}
.article .user {
  width: 30%;
  height: 50px;
  text-align: center;
}
span {
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  margin-top: 15px;
}
</style>