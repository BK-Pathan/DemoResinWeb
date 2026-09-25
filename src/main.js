import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import Clarity from '@microsoft/clarity'

const projectId = 'ymr0h8qund'

Clarity.init(projectId)

const app = createApp(App)

app.use(router)

app.mount('#app')