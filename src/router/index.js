import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "@/view/homePage.vue";
import registerVue from "@/view/registerPage.vue";
import loginPage from "@/view/loginPage.vue"
import adminPage from "@/view/adminPage.vue"


import adminProduct from "@/components/admin/adminProduct.vue"
import adminProductForm from "@/components/admin/adminForm.vue"
import headerVue from '@/components/layout/headerVue.vue'
import footerVue from '@/components/layout/footerVue.vue'
import adminFormEdit from '@/components/admin/adminFormEdit.vue'
import EntryReceiptVue from "@/components/admin/EntryReceipt.vue";
import detailEntryReceiptVue from "@/components/admin/detailEntryReceipt.vue";

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
          { path: "add", component: adminProductForm, meta: { title: "Admin" } },
          { path: "product", component: adminProduct, meta: { title: "Admin" } },
          { path: "entry-receipt", component: EntryReceiptVue, meta: { title: "Admin" } },
          {path:"edit/:id",name:"product.edit", props: true, component:adminFormEdit,meta:{title:'Chỉnh sửa'}},
          {path:"entry-receipt-detail/:id", name:"entry.detail", props:true, component:detailEntryReceiptVue, meta:{title:'Chi tiết phiếu nhập'}}
        ]
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router