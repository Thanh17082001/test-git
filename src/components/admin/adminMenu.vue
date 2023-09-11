<template>
    <section
        class="col-lg-2 sec__left"
        style="background: url('https://demos.creative-tim.com/vue-light-bootstrap-dashboard/static/img/sidebar-5.jpg')"
    >
        <div class="menu-user">
            <img
                src="https://bookvexe.vn/wp-content/uploads/2023/04/chon-loc-25-avatar-facebook-mac-dinh-chat-nhat_1.jpg"
                alt=""
                class="menu-avt"
            />
            <span class="menu-name">Thiên Thanh</span>
        </div>
        <ul class="sec-left__list">
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
                <router-link to="/admin/home" active-class="active" class="sec-left__link">
                    <i class="fa-regular fa-newspaper" id="icon3"></i>
                    Xem và chỉnh sửa
                </router-link>
            </li>
        <span class="menu-title">sản phẩm</span>
            <li class="sec-left__item">
                <router-link to="/admin/product" class="sec-left__link" active-class="active">
                    <i class="fa-brands fa-product-hunt icon1" id="icon1"></i>
                    Sản phẩm
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
                    <i class="fa-regular fa-newspaper" id="icon3"></i>
                    Phiếu nhập kho
                </router-link>
            </li>
        <span class="menu-title">Tài khoản người dùng</span>
           
        </ul>
    </section>
</template>

<script>
export default {};
</script>

<style scoped>
@import '@/assets/css/admin.css';
</style>
