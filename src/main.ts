import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { lazyBg } from './directives/lazyBg'
import { magneticGlow } from './directives/magneticGlow'
import './assets/styles/main.css'
import './assets/fonts/fontello/fontello.css'

createApp(App).use(router).directive('lazybg', lazyBg).directive('glow', magneticGlow).mount('#app')
