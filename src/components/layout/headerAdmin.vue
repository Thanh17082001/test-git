<template>
    <header class="header-admin pe-3">
        <div class="role-user">
            <!-- <span class="role-title ms-3" @click="activeRole = !activeRole">
                Quyền của bạn
                <i class="fa-solid fa-caret-down ms-2"></i>
            </span>
            <ul :class="{ active_role: activeRole, 'role-list': true }">
                <li>Chỉnh sửa sản phẩm</li>
                <li>Thêm sản phẩm</li>
                <li>Tạo phiếu nhập kho</li>
            </ul> -->
        </div>
        <!-- <div class="admin-search">
            <input v-model="searchVal" placeholder="Nhập từ khóa tìm kiếm" type="text" @input="onSearch" />
            <button class=""><i class="fa-solid fa-magnifying-glass"></i></button>
        </div> -->
        <div class="admin-action">
            <router-link to="/" class="back-home">
                Trở về trang người dùng
                <i class="ms-2 fa-solid fa-arrows-rotate"></i>
            </router-link>
            <span @click="logout" class="logout-admin">Đăng xuất</span>
        </div>
    </header>
</template>

<script>
import userService from '@/service/user.service';
import productService from '@/service/product.service';
export default {
    data() {
        return {
            activeRole: false,
            searchVal: '',
            idTimeOut: null,
        };
    },
    methods: {
        async logout() {
            try {
                await userService.logout();
                sessionStorage.removeItem('user');
                this.$store.commit('addToCart')
                this.$store.commit('changeInfo', {})
                this.$router.push('/login');
            } catch (error) {
                console.log(error);
            }
        },
        onSearch(){
          clearTimeout(this.idTimeOut);
          this.idTimeOut=setTimeout(this.search, 500)
        },
        async search(){
          try {
            console.log(this.searchVal);
            const response = await productService.search(this.searchVal, 1, 5)
            clearTimeout(this.idTimeOut);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
    },
};
</script>

<style></style>
