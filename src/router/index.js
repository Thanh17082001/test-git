// CUSTOMER
import { createRouter, createWebHistory } from 'vue-router';
import homePageVue from '@/view/homePage.vue';
import registerVue from '@/view/registerPage.vue';
import loginPage from '@/view/loginPage.vue';
import adminPage from '@/view/adminPage.vue';
import productPage from '@/view/productPage.vue';
import cartPage from '@/view/cartPage.vue';
import orderPage from '@/view/orderPage.vue';
import orderHistoryPage from '@/view/orderHistoryPage.vue';
import orderDetailPage from '@/view/orderDetailPage.vue';
import productDetailPage from '@/view/productDetailPage.vue';
import warrantyPage from '@/view/warrantyPage.vue';
import introducePage from '@/view/introducePage.vue';
import newsPage from '@/view/newsPage.vue';
import newsDetailPage from '@/view/newsDetailPage.vue';
import contactPage from '@/view/contactPage.vue';
import servicePage from '@/view/servicePage.vue';
import changeInfoUserPage from '@/view/changeInfoUserPage.vue';

//ADMIN
import adminProduct from '@/components/admin/adminProduct.vue';
import adminProductForm from '@/components/admin/adminForm.vue';
import headerVue from '@/components/layout/headerVue.vue';
import footerVue from '@/components/layout/footerVue.vue';
import adminFormEdit from '@/components/admin/adminFormEdit.vue';
import EntryReceiptVue from '@/components/admin/EntryReceipt.vue';
import detailEntryReceiptVue from '@/components/admin/detailEntryReceipt.vue';
import adminUserVue from '@/components/admin/adminUser.vue';
import adminCompanyVue from '@/components/admin/adminCompany.vue';
import adminAllRole from '@/components/admin/adminAllRole.vue';
import adminStaffVue from '@/components/admin/adminStaff.vue';
import adminAccessoryVue from '@/components/admin/adminAccessory.vue';
import adminOrderVue from '@/components/admin/adminOrder.vue';
import adminOrderCreate from '@/components/admin/adminOrderCreate.vue';
import adminRentalVue from '@/components/admin/adminRental.vue';
import adminRentalCreate from '@/components/admin/adminRentalCreate.vue';
import adminNewsCreate from '@/components/admin/adminNewsCreate.vue';
import adminNews from '@/components/admin/adminNews.vue';
import adminService from '@/components/admin/adminService.vue';
import canlendar from '@/components/admin/adminCanledar.vue';
import adminWarrantySearch from '@/components/admin/adminSearchWarranty.vue';
import adminWarrantyVue from '@/components/admin/adminWarranty.vue';
import adminStatistical from '@/components/admin/adminStatistical.vue';
import adminComment from '@/components/admin/adminComment.vue';
const routes = [
    {
        path: '/',
        components: {
            default: homePageVue,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Trang chủ' },
    },
    {
        path: '/home',
        components: {
            default: homePageVue,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Trang chủ' },
    },
    {
        path: '/product',
        components: {
            default: productPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Sản phẩm' },
    },
    {
        path: '/product-detail/:id',
        name: 'product.detail',
        props: true,
        components: {
            default: productDetailPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Chi tiết sản phẩm' },
    },
    {
        path: '/cart',
        components: {
            default: cartPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Giỏ hàng' },
    },
    {
        path: '/order/:typeOrder',
        components: {
            default: orderPage,
            header: headerVue,
            footer: footerVue,
        },
        name: 'order',
        props: true,
        meta: { title: 'Đơn hàng' },
    },
    {
        path: '/order-history',
        components: {
            default: orderHistoryPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Lịch sử đơn hàng' },
    },
    {
        path: '/order-detail/:id',
        name: 'order.detail',
        components: {
            default: orderDetailPage,
            header: headerVue,
            footer: footerVue,
        },
        props: true,
        meta: { title: 'Đơn hàng' },
    },
    {
        path: '/warranty',
        components: {
            default: warrantyPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Bảo hành' },
    },
    {
        path: '/introduce',
        components: {
            default: introducePage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Giới thiệu' },
    },
    {
        path: '/news',
        components: {
            default: newsPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Tin tức' },
    },
    {
        path: '/news-detail/:id',
        name: 'news.detail',
        props: true,
        components: {
            default: newsDetailPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Tin tức' },
    },
    {
        path: '/contact',
        components: {
            default: contactPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Liên hệ' },
    },
    {
        path: '/service',
        components: {
            default: servicePage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Dịch vụ' },
    },
    {
        path: '/change-info',
        components: {
            default: changeInfoUserPage,
            header: headerVue,
            footer: footerVue,
        },
        meta: { title: 'Thông tin người dùng' },
    },

    // USER ROUTER
    { path: '/register', component: registerVue, meta: { title: 'Đăng ký' } },
    { path: '/login', component: loginPage, meta: { title: 'Đăng nhập' } },

    // ADMIN ROUTER
    {
        path: '/admin',
        name: 'admin',
        beforeEnter: (to, from, next) => {
            const getAdmin = JSON.parse(sessionStorage.getItem('user'));
            if (getAdmin) {
                if (getAdmin.user.isAdmin || getAdmin.user.roles.length > 0) {
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
            {
                path: 'product',
                component: adminProduct,
                meta: { title: 'Admin', roleId: '65090feb73b597759ef14538' }, // sản phẩm
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'entry-receipt',
                component: EntryReceiptVue,
                meta: { title: 'Admin', roleId: '6509100e73b597759ef1453b' }, // nhập kho
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'edit/:id',
                name: 'product.edit',
                props: true,
                component: adminFormEdit,
                meta: { title: 'Chỉnh sửa', roleId: '65090feb73b597759ef14538' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'entry-receipt-detail/:id',
                name: 'entry.detail',
                props: true,
                component: detailEntryReceiptVue,
                meta: { title: 'Chi tiết phiếu nhập', roleId: '6509100e73b597759ef1453b' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'user',
                component: adminUserVue,
                meta: { title: 'Admin', roleId: '6509102c73b597759ef1453e' }, // nhân viên
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'role',
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
                },
                component: adminAllRole,
                meta: { title: 'Admin' },
            },

            {
                path: 'staff',
                component: adminStaffVue,
                meta: { title: 'Admin', roleId: '6509102c73b597759ef1453e' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'accessory',
                component: adminAccessoryVue,
                meta: { title: 'Admin', roleId: '65090feb73b597759ef14538' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            // đơn hàng
            {
                path: 'order',
                component: adminOrderVue,
                meta: { title: 'Admin', roleId: '6577ff4865082875b1b4b2f3' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'order-create',
                component: adminOrderCreate,
                meta: { title: 'Admin', roleId: '6577ff4865082875b1b4b2f3' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'rental',
                component: adminRentalVue,
                meta: { title: 'Admin', roleId: '6577ff4865082875b1b4b2f3' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'rental-create',
                component: adminRentalCreate,
                meta: { title: 'Admin', roleId: '6577ff4865082875b1b4b2f3' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            // tin tức
            {
                path: 'news-create',
                component: adminNewsCreate,
                meta: { title: 'Admin', roleId: '657802a765082875b1b4b3fc' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'news',
                component: adminNews,
                meta: { title: 'Admin', roleId: '657802a765082875b1b4b3fc' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            // công việc
            {
                path: 'service',
                component: adminService,
                meta: { title: 'Admin', roleId: '6577ff6c65082875b1b4b2fb' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'task',
                component: canlendar,
                meta: { title: 'Admin', roleId: '6577ff6c65082875b1b4b2fb' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            //bảo hành
            {
                path: 'warranty-search',
                component: adminWarrantySearch,
                meta: { title: 'Admin', roleId: '6577ff5865082875b1b4b2f7' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            {
                path: 'warranty',
                component: adminWarrantyVue,
                meta: { title: 'Admin', roleId: '6577ff5865082875b1b4b2f7' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            //thống kê
            {
                path: 'statistical',
                component: adminStatistical,
                meta: { title: 'Admin', roleId: '6509103373b597759ef14541' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
            // đánh giá
            {
                path: 'comment',
                component: adminComment,
                meta: { title: 'Admin', roleId: '657802af65082875b1b4b400' },
                beforeEnter: (to, form, next) => {
                    beforeEnter(to, next);
                },
            },
        ],
    },
];

function checkRole(userRoles, roleId) {
    let isRole = false;
    userRoles.some((userRole) => {
        if (userRole.roleId == roleId) {
            isRole = true;
            return (isRole = true);
        } else {
            isRole = false;
        }
    });

    return isRole;
}

const beforeEnter = (to, next) => {
    const getUser = JSON.parse(sessionStorage.getItem('user'));
    const userRoles = getUser.user.roles;
    const roleId = to.meta.roleId;
    if (checkRole(userRoles, roleId) || getUser.user.isAdmin) {
        return next();
    } else {
        alert('Bạn không có quyền truy cập');
        return;
    }
};

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    document.title = to?.meta.title;
});

export default router;
