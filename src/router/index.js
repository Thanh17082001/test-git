import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "@/view/homePage.vue";
import registerVue from "@/view/registerPage.vue";
import loginPage from "@/view/loginPage.vue"
const routes =[
    { path: '/', component: homePageVue },
    { path: '/register', component: registerVue },
    { path: '/login', component: loginPage },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router