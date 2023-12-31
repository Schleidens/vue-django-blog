import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.css";
const app = createApp(App)
import "bootstrap/dist/js/bootstrap.js";

app.use(createPinia())
app.use(router)

app.mount('#app')
