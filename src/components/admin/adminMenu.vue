<template>
    <section
        class="col-lg-2 sec__left"
        style="background: url('https://demos.creative-tim.com/vue-light-bootstrap-dashboard/static/img/sidebar-5.jpg')"
    >
        <div class="menu-user">
            <img :src="'http://localhost:3000' + user.avatar" alt="" class="menu-avt" />
            <h6 class="menu-name">{{ user.fullName }}</h6>
        </div>
        <ul class="sec-left__list accordion">
            <!-- <li class="sec-left__menu">
                <p>Menu</p>
            </li> -->
            <!-- <li class="sec-left__item">
                <router-link to="/" class="sec-left__link" active-class="active" exact>
                  <i class="fa-solid fa-house"></i>
                    Trang chủ
                </router-link>
            </li> -->
            <span class="menu-title">Thông tin Doanh nghiệp</span>
            <li class="sec-left__item">
                <router-link to="/admin/profile-company" active-class="active" class="sec-left__link">
                    <i class="fa-solid fa-building" id="icon5"></i>
                    Xem và chỉnh sửa
                </router-link>
            </li>

            <span
                class="menu-title"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                >Sản phẩm <i class="fa-solid fa-chevron-down ms-1"></i></span
            >
            <div class="collapse" id="collapseExample">
                <li class="sec-left__item">
                    <router-link to="/admin/product" class="sec-left__link" active-class="active">
                        <i class="fa-brands fa-product-hunt icon1" id="icon1"></i>
                        Sản phẩm
                    </router-link>
                </li>
                <li class="sec-left__item">
                    <router-link to="/admin/accessory" class="sec-left__link" active-class="active">
                        <i class="fa-brands fa-paypal" id="icon5"></i>
                        Phụ kiện
                    </router-link>
                </li>
                <li class="sec-left__item">
                    <router-link to="/admin/add" class="sec-left__link" active-class="active">
                        <i class="fa-solid fa-plus icon1" active-class="active" id="icon2"></i>
                        Thêm sản phẩm
                    </router-link>
                </li>
                <li class="sec-left__item">
                    <router-link to="/admin/entry-receipt" active-class="active" class="sec-left__link">
                        <i class="fa-solid fa-receipt" id="icon4"></i>
                        Phiếu nhập kho
                    </router-link>
                </li>
            </div>

            <span
                class="menu-title"
                data-bs-toggle="collapse"
                href="#collapseExample2"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample2"
                >Tài khoản <i class="fa-solid fa-chevron-down ms-1"></i> </span
            >
            <div class="collapse" id="collapseExample2">
                <li class="sec-left__item">
                    <router-link to="/admin/user" active-class="active" class="sec-left__link">
                        <i class="fa-solid fa-user" id="icon3"></i>
                        Tài khoản
                    </router-link>
                </li>
                <li class="sec-left__item">
                    <router-link to="/admin/staff" active-class="active" class="sec-left__link">
                        <i class="fa-solid fa-sitemap text-white"></i>
                        Nhân viên
                    </router-link>
                </li>
                <li class="sec-left__item" v-if="user.isAdmin">
                    <router-link to="/admin/role" active-class="active" class="sec-left__link">
                        <i class="fa-solid fa-fingerprint" id="icon2"></i>
                        Cấp quyền
                    </router-link>
                </li>
            </div>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: {},
        };
    },
    methods: {
        getUser() {
            try {
                const response = JSON.parse(sessionStorage.getItem('user'));
                this.user = {
                    ...response.user,
                };
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getUser();
    },
};
</script>

<style scoped>
@import '@/assets/css/admin.css';
span{
    font-size: 18px;
}
</style>
