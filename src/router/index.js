import { createRouter, createWebHistory } from 'vue-router';
import homePageVue from '@/view/homePage.vue';
import registerVue from '@/view/registerPage.vue';
import loginPage from '@/view/loginPage.vue';
import adminPage from '@/view/adminPage.vue';
import productPage from '@/view/productPage.vue';

import adminProduct from '@/components/admin/adminProduct.vue';
import adminProductForm from '@/components/admin/adminForm.vue';
import headerVue from '@/components/layout/headerVue.vue';
import footerVue from '@/components/layout/footerVue.vue';
import adminFormEdit from '@/components/admin/adminFormEdit.vue';
import EntryReceiptVue from '@/components/admin/EntryReceipt.vue';
import detailEntryReceiptVue from '@/components/admin/detailEntryReceipt.vue';
import adminUserVue from '@/components/admin/adminUser.vue';
import adminCompanyVue from '@/components/admin/adminCompany.vue';
import adminAllRole from '@/components/admin/adminAllRole.vue'
const routes = [
    {
        path: '/',
        components: {
            default: homePageVue,
            header: headerVue,
            footer: footerVue,
        },
    },
    {
      path: '/home',
      components: {
          default: homePageVue,
          header: headerVue,
          footer: footerVue,
      },
    },
    {
      path: '/product',
        components: {
            default: productPage,
            header: headerVue,
            footer: footerVue,
        },
    },
    { path: '/register', component: registerVue },
    { path: '/login', component: loginPage },
    {
        path: '/admin',
        name: 'admin',
        beforeEnter: (to, from, next) => {
            const getAdmin = JSON.parse(sessionStorage.getItem('user'));
            if (getAdmin) {
                if (getAdmin.user.isAdmin || getAdmin.user.roles.length>0) {
                    return next();
                } else {
                    return next('/');
                }
            } else {
                return next('/');
            }
        },
        component: adminPage,
        children: [
            { path: 'profile-company', component: adminCompanyVue, meta: { title: 'Admin' } },
            { path: 'add', component: adminProductForm, meta: { title: 'Admin' } },
            { path: 'product', component: adminProduct,
                 meta: { title: 'Admin', roleId:'65090feb73b597759ef14538' },
                beforeEnter:(to,form,next)=>{
                    beforeEnter(to,next)
                }
            },
            { path: 'entry-receipt', component: EntryReceiptVue, meta: { title: 'Admin', roleId:'6509100e73b597759ef1453b' },
            beforeEnter:(to,form,next)=>{
                beforeEnter(to,next)
            } },
            {
                path: 'edit/:id',
                name: 'product.edit',
                props: true,
                component: adminFormEdit,
                meta: { title: 'Chỉnh sửa' },
            },
            {
                path: 'entry-receipt-detail/:id',
                name: 'entry.detail',
                props: true,
                component: detailEntryReceiptVue,
                meta: { title: 'Chi tiết phiếu nhập' },
            },
            {path:'user',component: adminUserVue, meta:{title:'Admin'}},
            {
                path:'role',
                beforeEnter: (to, from, next) => {
                    const getAdmin = JSON.parse(sessionStorage.getItem('user'));
                    if (getAdmin) {
                        if (getAdmin.user.isAdmin) {
                            return next();
                        } else {
                            return next('/admin');
                        }
                    } else {
                        return next('/admin');
                    }
                }
                ,component: adminAllRole, meta:{title:'Admin'}
            },
        ],
    },
];

function checkRole(userRoles, roleId){
    let isRole=false
    userRoles.some(userRole =>{
        if(userRole.roleId==roleId){
            isRole=true
            return isRole=true;
        }
        else{
            isRole=false
        }
    })

    return isRole
}

const beforeEnter=(to,next)=>{
    const getUser = JSON.parse(sessionStorage.getItem('user'));
    const userRoles = getUser.user.roles
    const roleId=to.meta.roleId
    if(checkRole(userRoles, roleId) || getUser.user.isAdmin){
        return next()
    }
    else{
        alert('Bạn không có quyền truy cập')
        return next('/admin')
    }
}


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
