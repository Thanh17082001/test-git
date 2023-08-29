<template >
  <header class="header-admin">
    <div class="role-user" @click="activeRole=!activeRole">
        <span class="role-title">
            Quyền của bạn
            <i class="fa-solid fa-caret-down ms-2"></i>
        </span>
        <ul :class="{ active_role:activeRole, 'role-list':true}">
            <li>Chỉnh sửa sản phẩm</li>
            <li>Thêm sản phẩm</li>
            <li>Tạo phiếu nhập kho</li>
        </ul>
    </div>
    <div class="admin-search">
      <input placeholder="Nhập từ khóa tìm kiếm" type="text">
      <button class=""><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
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
import userService from '@/service/user.service'
export default {
  data(){
    return {
      activeRole: false
    }
  },
  methods:{
    async logout(){
            try {
                await userService.logout()
                sessionStorage.removeItem('user')
                this.$router.push('/login')
            } catch (error) {
                console.log(error);
            }
        },
  }
}
</script>

<style>

</style>