<template>
    <header class="hearder">
        <div class="top container">
            <div class="row">
                <div class="header-logo col-4">
                    <img src="http://localhost:3000/logo/logo.jpg" alt="" class="logo" />
                    <span>Thiên Thanh</span>
                    <p>Photocopy Company</p>
                </div>
                <div class="search col-4">
                    <input type="text" class="top-input" placeholder="Tìm kiếm ..." />
                    <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div class="top-tact col-4">
                    <img src="http://localhost:3000/head/phone-logo.png" alt="" />
                    <div>
                        <span><b>Gọi ngay: </b> 09880980098</span>
                        <span><b>Email: </b>Nguyenthienthanh17082001@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
        <nav class="header-nav">
            <div class="container header-content">
                <ul class="header-list">
                    <li><a href="" class="active-nav">Trang chủ</a></li>
                    <li><a href="">Giới thiệu</a></li>
                    <li><a href="">Sản phẩm</a></li>
                    <li><a href="">Bảo hành</a></li>
                    <li><a href="">Sữa chưa và bảo trì</a></li>
                    <li><a href="">Liên hệ</a></li>
                    <li><a href="">Tin tức</a></li>
                </ul>

                <div class="header-user">
                    <div class="logined" v-if="!!islogin" @click="isActive = !isActive">
                        <img
                            src="https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg"
                            alt=""
                            class="header-avt"
                        />
                        <span class="header-name">{{ infoUser.fullName }}</span>
                        <i class="fa-solid fa-sort-down"></i>
                        <ul class="user-drop-down" v-if="islogin && isActive">
                            <li @click="logout">Đăng xuất</li>
                            <li>Chỉnh sửa thông tin</li>
                            <li v-if="infoUser.isAdmin"><router-link to="/admin">Quay lại trang Admin</router-link></li>
                        </ul>
                    </div>
                    <div class="login" v-else>
                        <span class="btn btn-login"><router-link to="/login"> Đăng nhập</router-link></span>
                        <span class="btn btn-login"><router-link to="/register"> Đăng ký</router-link></span>
                    </div>
                </div>
                <div class="header-cart">
                    <div class="cart-icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>1</span>
                    </div>
                    <span>Giỏ hàng</span>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import userService from '@/service/user.service';
export default {
    data() {
        return {
            infoUser: {},
            islogin: false,
            isActive: false,
        };
    },
    methods: {
        Checklogin() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user) {
                this.infoUser = user.user;
                this.islogin = true;
            } else {
                this.infoUser = '';
            }
        },
        async getInfoUser() {
            try {
                const response = await userService.getInfo();
                const user = JSON.stringify(response.data);
                sessionStorage.setItem('user', user);
                this.Checklogin();
            } catch (error) {
                console.log(error);
            }
        },
        async logout(){
            try {
                await userService.logout()
                sessionStorage.removeItem('user')
                this.Checklogin()
                this.islogin=false
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.Checklogin();
        this.getInfoUser();
    },
};
</script>

<style scoped>
.header {
    max-height: 190px;
}
.top {
    height: 120px;
}
.header-logo {
    position: relative;
}
.header-logo img {
    position: absolute;
    left: 0;
    top: 10px;
    height: 110px;
    aspect-ratio: 4/3;
    border-radius: 10px;
    border: 1px solid #0e8388;
}
.header-logo span {
    position: absolute;
    top: 15px;
    right: 77px;
    display: inline-block;
    font-size: 30px;
    color: #0e8388;
    text-transform: uppercase;
}
.header-logo p {
    position: absolute;
    top: 50px;
    right: 54px;
    display: inline-block;
    font-size: 25px;
    color: red;
    margin: 0;
}
.top-tact {
    display: flex;
}
.top-tact img {
    margin-top: 10px;
    height: 110px;
    aspect-ratio: 4/3;
}
.top-tact span {
    display: block;
    text-align: left;
    margin-bottom: 10px;
    font-size: 15px;
}
.top-tact div {
    height: 100px;
    margin: 20px 0 0 10px;
}
.search {
    height: 120px;
    display: flex;
    align-items: center;
}
.search {
    position: relative;
}
.search input {
    width: 80%;
    border: 1px solid #111;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 10px 0 10px 20px;
    outline: none;
    caret-color: #0e8388;
}
.search input::placeholder {
    color: #0e8388;
    font-size: 18px;
    font-weight: 550;
    fill: #0e8388;
}
.search-btn {
    position: absolute;
    top: 37.5px;
    right: 36px;
    border: 1px solid #111;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 45.6px;
    outline: none;
    background: #fff;
    width: 60px;
    padding: 0 10px;
    transition: all linear 0.3s;
}

.search-btn:hover {
    background: #0e8388;
    color: #fff;
}

.header-nav {
    margin-top: 10px;
    height: 50px;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
}
.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.header-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 900px;
    justify-content: space-around;
    align-items: center;
}
.header-list a {
    display: block;
    text-decoration: none;
    font-size: 20px;
    color: #111;
    font-weight: 600;
    transition: all linear 0.1s;
}
.header-list a:hover {
    color: red;
}
.header-list .active-nav {
    color: red !important;
}
.header-cart {
    width: 120px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    transition: all linear 0.3s;
}
.header-cart:hover .cart-icon,
.header-cart:hover span {
    color: #0e8388;
    cursor: pointer;
}
.cart-icon {
    position: relative;
}
.header-cart:hover .cart-icon span {
    color: #fff;
    background: #0e8388;
}
.cart-icon span {
    position: absolute;
    top: -18px;
    right: -15px;
    width: 30px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    color: #111;
    background: rgb(240, 82, 82);
}

.logined {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}
.user-drop-down {
    position: absolute;
    top: 44px;
    right: 15px;
    display: flex;
    flex-direction: column;
    width: 200px;
    background: #d8d8d8;
    box-shadow: 1px 0px 10px #ccc;
    list-style: none;
    padding: 10px 10px 10px 20px;
    text-align: left;
    border-radius: 10px;
}
.user-drop-down::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 11px;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #d8d8d8;
}
.user-drop-down li {
    padding: 10px 0;
    cursor: pointer;
    transition: all linear 0.3s;
    color: #111;
}
.user-drop-down li  a{
  padding: 10px 0;
    cursor: pointer;
    transition: all linear 0.3s;
    text-decoration: none;
    color:#111
}
.user-drop-down li:hover {
    color: red;
}
.login {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.logined span {
    display: block;
    font-size: 18px;
    margin-left: 10px;
}
.logined i {
    margin-left: 8px;
    font-size: 20px;
    margin-bottom: 10px;
}
.header-user {
    width: 240px;
    height: 100%;
}
.header-avt {
    width: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
}
.btn-login {
    border: 1px solid #0e8388;
    transition: all ease-in-out 0.3s;
    margin-right: 10px;
    
}
.btn-login a{
  text-decoration: none;
    color: #111;
}
.btn-login:hover {
    background: #0e8388;
    color: #fff;
}
</style>
