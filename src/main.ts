import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { lazyBg } from './directives/lazyBg'
import { magneticGlow } from './directives/magneticGlow'
import { initAnalytics } from './utils/analytics'
import './assets/styles/main.css'
import './assets/styles/premium.css'
import './assets/styles/polish.css'
import './assets/styles/mobile.css'
import './assets/fonts/fontello/fontello.css'

initAnalytics()

createApp(App).use(router).directive('lazybg', lazyBg).directive('glow', magneticGlow).mount('#app')
