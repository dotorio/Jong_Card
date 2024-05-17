
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
const pinia = createPinia()


pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(pinia)

app.mount('#app')
