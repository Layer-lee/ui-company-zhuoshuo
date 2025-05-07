// src/main.js

// 公共icon资源
import '@/assets/css/global.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQq, faWeixin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'

// 路由
import router from './router'

// 项目文件
import '@/assets/css/global.css'
import App from './App.vue'
import { useImagePreview } from './stores/imagePreview'

// 添加需要的图标到库
library.add(faWeixin, faQq)

const app = createApp(App)

// 全局注册组件
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(useImagePreview)
// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
