import { createRouter, createWebHashHistory } from "vue-router";
import registerVue from "@/view/registerVue.vue";
const routes =[
    { path: '/', component: registerVue },
    { path: '/register', component: registerVue },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router