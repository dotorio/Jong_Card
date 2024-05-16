import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
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

    
  ]
})

export default router
