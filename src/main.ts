import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import router from './router'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

const toastOptions = {
  position: 'bottom-left',
  maxToasts: 3,
  newestOnTop: true,
  offset: '60px', // para que no tape el logo
}

app.use(router).use(pinia).component('Icon', Icon).use(Toast, toastOptions).mount('#app')
