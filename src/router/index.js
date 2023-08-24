import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "@/view/homePage.vue";
import registerVue from "@/view/registerPage.vue";
import loginPage from "@/view/loginPage.vue"
import adminPage from "@/view/adminPage.vue"


import adminProduct from "@/components/admin/adminProduct.vue"
import adminProductForm from "@/components/admin/adminForm.vue"
import headerVue from '@/components/layout/headerVue.vue'
import footerVue from '@/components/layout/footerVue.vue'

const routes =[
    { path: '/', components:{
        default:homePageVue,
        'header':headerVue,
        'footer':footerVue
    } },
    { path: '/register', component: registerVue },
    { path: '/login', component: loginPage },
    { 
        path: '/admin',
        name: "admin",
        beforeEnter:(to, from, next)=>{
            const getAdmin = JSON.parse(sessionStorage.getItem('user'))
            console.log(getAdmin);
            if(getAdmin){
              if(getAdmin.user.isAdmin){
                return next()
              }else{
                return next('/')
              }
              
            }else{
              return next('/')
            }
          },
        component: adminPage,
        children:[
            { path: "product", component: adminProduct, meta: { title: "Admin" } },
            { path: "add", component: adminProductForm, meta: { title: "Admin" } },
        ]
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router