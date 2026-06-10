import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { lazyBg } from './directives/lazyBg'
import './assets/styles/main.css'
import './assets/fonts/fontello/fontello.css'

createApp(App).use(router).directive('lazybg', lazyBg).mount('#app')
