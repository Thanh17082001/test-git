import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';
import { createStore } from 'vuex'
import cartService from './service/cart.service'
const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
var products
if(Object.keys(user).length>0){
    const cart = await cartService.getByUserId(user._id)
     products= cart.data.products ||[]
}
const store = createStore({
    state: {
        cart: Object.keys(user).length>0 ? products : VueCookies.isKey('cart')? VueCookies.get('cart') : [],
      },
      mutations: {
        addToCart(state, products) {
            state.cart=VueCookies.isKey('cart')? VueCookies.get('cart') : []
            if(products?.length>0){
                state.cart=products
            }
        },
      },
      getters: {
        cartItemCount: state => state.cart.length ||0,
      },
  })

const app = createApp(App)

app.use(VueCookies, { expires: '7d'}) 
app.use(router) 
app.use(store) 
app.mount('#app')
