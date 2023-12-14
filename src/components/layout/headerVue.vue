<template>
    <header class="header-ui">
        <div class="top container">
            <div class="row">
                <div class="header-logo col-4">
                    <img src="http://localhost:3000/logo/logo.jpg" alt="" class="logo" />
                    <span>Thiên Thanh</span>
                    <p>Photocopy Company</p>
                </div>
                <div class="search col-4"  @blur="productsSearch = []" tabindex="0">
                    <input
                        @focus="onSearch"
                        v-model="searchVal"
                        type="text"
                        class="top-input"
                        placeholder="Tìm kiếm ..."
                        @input="onSearch"
                       
                    />
                    <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <div v-if="loading" class="spinner-border text-danger loading" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="delete-test" v-if="!loading && searchVal !== ''" @click="searchVal = ''">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </div>
                    <ul class="search-list" v-if="productsSearch.length !== 0 ">
                        <li @click="detailPage(product)" v-for="product in productsSearch" :key="product._id">{{ product.name }}</li>
                    </ul>
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
                    <li>
                        <router-link to="/" active-class="active-nav" exact
                            ><span class="not-active"></span>Trang chủ</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/introduce" class="nav__link me-2" active-class="active-nav"
                        ><span class="not-active"></span>Giới thiệu</router-link
                    >
                    </li>
                    <li>
                        <router-link to="/product" class="nav__link me-2" active-class="active-nav"
                            ><span class="not-active"></span>Sản phẩm</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/warranty" class="nav__link me-2" active-class="active-nav"
                            ><span class="not-active"></span>Bảo hành</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/service" class="nav__link me-2" active-class="active-nav"
                        ><span class="not-active"></span>Sửa chữa & Bảo trì</router-link
                    >
                    </li>
                    <li>
                        <router-link to="/contact" class="nav__link me-2" active-class="active-nav"
                            ><span class="not-active"></span>Liên hệ</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/news" class="nav__link me-2" active-class="active-nav"
                            ><span class="not-active"></span>Tin Tức</router-link
                        >
                    </li>
                </ul>

                <div class="header-user" v-if="Object.keys(test2).length>0">
                    <div class="logined" v-if="islogin && !!test2" @click="isActive = !isActive">
                        <img v-if=" test2.isGoogle" :src="test2.avatar" alt="" class="header-avt" />
                        <img v-if="!test2.isGoogle " :src="'http://localhost:3000/' + test2.avatar" alt="" class="header-avt" />
                        <span class="header-name">{{ test2.fullName }}</span>
                        <i class="fa-solid fa-sort-down"></i>
                        <ul class="user-drop-down" v-if="islogin && isActive">
                            <li @click="logout">Đăng xuất</li>
                            <li><router-link to="/change-info">Chỉnh sửa thông tin</router-link></li>
                            <li v-if="test2.isAdmin ||test2.roles.length>0"><router-link to="/admin">Quay lại trang Admin</router-link></li>
                        </ul>
                    </div>
                    <div class="login" v-else>
                        <span class="btn btn-login"><router-link to="/login"> Đăng nhập</router-link></span>
                        <span class="btn btn-login"><router-link to="/register"> Đăng ký</router-link></span>
                    </div>
                </div>
                <div class="header-user" v-if="Object.keys(test2).length<=0">
                    <div class="login">
                        <span class="btn btn-login"><router-link to="/login"> Đăng nhập</router-link></span>
                        <span class="btn btn-login"><router-link to="/register"> Đăng ký</router-link></span>
                    </div>
                </div>
                <router-link to="/cart" class="header-cart">
                    <div class="cart-icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>{{test()}}</span>
                    </div>
                    <span>Giỏ hàng</span>
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script>
import userService from '@/service/user.service';
import productService from '@/service/product.service';
export default {
    data() {
        return {
            infoUser: {},
            islogin: false,
            isActive: false,
            searchVal: '',
            productsSearch: [],
            loading: false,
        };
    },
    watch: {
        searchVal() {
            if (this.searchVal === '') {
                this.productsSearch = [];
            }
        }
        
    },
    computed:{
        test2(){
           return this.$store.getters.inforuser ;
        },
    },
    methods: {
        test(){
            return this.$store.getters.cartItemCount;
        },
        Checklogin() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user) {
                this.infoUser = user.user;
                this.islogin = true;
            } else {
                this.infoUser = '';
            }
            this.$store.commit('changeInfo', this.infoUser)
        },
        async getInfoUser() {
            try {
                const response = await userService.getInfo();
                const user = JSON.stringify(response.data);
                sessionStorage.setItem('user', user);
                this.$store.commit('changeInfo', response.data.user)
                this.Checklogin();
            } catch (error) {
                console.log(error);
            }
        },
        async logout() {
            try {
                await userService.logout();
                sessionStorage.removeItem('user');
                this.Checklogin();
                this.islogin = false;
                this.$store.commit('addToCart')
                this.$store.commit('changeInfo', {})
                this.$router.push('/')
            } catch (error) {
                console.log(error);
            }
        },
        onSearch() {
            clearTimeout(this.idTimeOut);
            this.productsSearch = [];
            this.idTimeOut = setTimeout(this.search, 500);
        },
        async search() {
            try {
                if (this.searchVal !== '') {
                    this.loading = true;
                    const response = await productService.search(this.searchVal);
                    this.loading = false;
                    this.productsSearch = [...response.data];
                    console.log(this.productsSearch);
                } else {
                    this.productsSearch = [];
                }
            } catch (error) {
                console.log(error);
            }
        },
        detailPage(product){
            this.$router.push({name:'product.detail', params:{id:product._id}, query:{typeProduct:product.typeProduct}})
        }
    },
    mounted() {
        this.getInfoUser();
        this.Checklogin();
    },
};
</script>

<style scoped>
@import url('/src/assets/css/layout.css');
</style>
