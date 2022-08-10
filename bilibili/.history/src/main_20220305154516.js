import { createApp } from 'vue'
import {ElButton} from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(ElButton)
app.mount('#app')