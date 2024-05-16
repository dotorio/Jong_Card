import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
import ArticleView from '@/views/article/ArticleView.vue'
import ArticleWriteView from '@/views/article/ArticleWriteView.vue'
import ArticleDetailView from '@/views/article/ArticleDetailView.vue'
import ArticleUpdateView from '@/views/article/ArticleUpdateView.vue'
import CardRecommendView from '@/views/CardRecommendView.vue'

import { useAccountStore } from '@/stores/account'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (to, from) => {
        const accountStore = useAccountStore()
        if (accountStore.isLogin) {
          return { name: 'home'}
        }
      }
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
      beforeEnter: (to, from) => {
        const accountStore = useAccountStore()
        if (!accountStore.isLogin) {
          return { name: 'account'}
        }
      }
    },
    {
      path: '/article/write/:username',
      name: 'article-write',
      component: ArticleWriteView,
    },
    {
      path: '/article/update/:article_id',
      name: 'article-update',
      component: ArticleUpdateView,
    },
    {
      path: '/article/:article_id',
      name: 'article-detail',
      component: ArticleDetailView,
    },
    {
      path: '/card-recommend',
      name: 'card-recommend',
      component: CardRecommendView
    },

    
  ]
})

export default router
