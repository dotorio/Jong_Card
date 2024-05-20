import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
import ArticleView from '@/views/article/ArticleView.vue'
import ArticleWriteView from '@/views/article/ArticleWriteView.vue'
import ArticleDetailView from '@/views/article/ArticleDetailView.vue'
import ArticleUpdateView from '@/views/article/ArticleUpdateView.vue'
import MyPageView from '@/views/MyPageView.vue'
import CardRecommendView from '@/views/CardRecommendView.vue'
import CardDetailView from '@/views/CardDetailView.vue'
import CardGrowView from '@/views/CardGrowView.vue'

import { useAccountStore } from '@/stores/account'
import { useCardStore } from '@/stores/card'

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
      
    },
    {
      path: '/article/write/:username',
      name: 'article-write',
      component: ArticleWriteView,
      beforeEnter: (to, from) => {
        const accountStore = useAccountStore()
        if (!accountStore.isLogin) {
          return { name: 'account'}
        }
      }
    },
    {
      path: '/article/update/:article_id',
      name: 'article-update',
      component: ArticleUpdateView,
      beforeEnter: (to, from) => {
        const accountStore = useAccountStore()
        if (!accountStore.isLogin) {
          return { name: 'account'}
        }
      }
    },
    {
      path: '/article/:article_id',
      name: 'article-detail',
      component: ArticleDetailView,
    },
    {
      path: '/card-recommend',
      name: 'card-recommend',
      component: CardRecommendView,
    },
    {
      path: '/card-grow/:username',
      name: 'card-grow',
      component: CardGrowView,
      beforeEnter: (to, from) => {
        const accountStore = useAccountStore()
        if (!accountStore.isLogin) {
          return { name: 'account'}
        }
      }
    },
    {
      path: '/:username/my-page',
      name: 'my-page',
      component: MyPageView,
      beforeEnter: (to, from) => {
        const accountStore = useAccountStore()
        if (!accountStore.isLogin) {
          return { name: 'account'}
        }
      }
    },
    {
      path: '/card-detail/:card_id',
      name: 'card-detail',
      component: CardDetailView,
    },

    
  ]
})

router.beforeEach((to, from) => {
  // console.log('카드')
  const cardStore = useCardStore()
  cardStore.updateCardList()
})

export default router
