import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';

const app = createApp(App)

app.use(VueCookies, { expires: '7d'}) 
app.use(router) 
app.mount('#app')
