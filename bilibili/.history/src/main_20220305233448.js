import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(ElementPlus)
// app.component('el-button',ElButton);
app.mount('#app')