<template>
  <div class="container">
   <div class="banner">
        <img v-for="(linkImg, index) in linkImgs" :key="index" :src="linkImg" alt="" class="banner-img"  :class="{ activeImg: index === currentIndex }">
        <span class="banner-pag previous-img" @click="previousBanner"><i class="fa-solid fa-chevron-left"></i></span>
        <span class="banner-pag next-img" @click="nextBanner"><i class="fa-solid fa-chevron-right"></i></span>
        <div class="banner-list-icon">
            <span @click="currentIndex=index" v-for="(linkImg, index) in linkImgs" :key="linkImg"  :class="{ 'active-banner': index === currentIndex }"></span>
            
        </div>
   </div>

   <div class="content">
        <div class="home-new-product">
            <div class="home-title row">
                <h3 class="col-8">Sản phẩm mới nhất</h3>
                <div class="home-see-more col">
                    <a href="">Xem thêm <i class="fa-solid fa-angles-right"></i></a>
                </div>
            </div>

            <div class="row flex-nowrap mt-5">
                <div  class="col-sm-6 col-6 col-lg-3 col-md-4 mt-3" v-for="product in productsNew" :key="product._id">
                    <productCard  :product="product"></productCard>
                </div>
            </div>
        </div>

        <div class="home-new-product">
            <div class="home-title row">
                <h3 class="col-8">Sản phẩm mới nhất</h3>
                <div class="home-see-more col">
                    <a href="">Xem thêm <i class="fa-solid fa-angles-right"></i></a>
                </div>
            </div>

            <div class="row flex-nowrap mt-5">
                <div  class="col-sm-6 col-6 col-lg-3 col-md-4" v-for="product in productsNew" :key="product._id">
                    <productCard  :product="product"></productCard>
                </div>
            </div>
        </div>

        <div class="home-new-product mt-4">
            <div class="home-title row">
                <h3 class="col-8">tin tức</h3>
                <div class="home-see-more col">
                    <a href="">Xem thêm <i class="fa-solid fa-angles-right"></i></a>
                </div>
            </div>

            <div class="news row flex-nowrap mt-5">
                <div class="row flex-nowrap mt-5">
                <div  class="col-sm-6 col-6 col-lg col-md-4" v-for="index in 3" :key="index">
                    <newsCard  ></newsCard>
                </div>
            </div>
            </div>
        </div>
   </div>
  </div>
</template>

<script>
import userService from '@/service/user.service'
import productService from '@/service/product.service'
import productCard from '@/components/product/cardVue.vue'
import newsCard from '@/components/news/newsCard.vue'
export default {
    components:{
        productCard,
        newsCard
    },
     data(){
        return{
            name:'',
            linkImgs:
                [
                    'https://giavan.com.vn/wp-content/uploads/2019/01/banner-toshiba-gia-van.jpg',
                    'https://mayphototantien.com/wp-content/uploads/2021/06/DICH-VU-THUE-MAY-PTCP-TT-1400x569.jpg',
                    'https://mayphototantien.com/wp-content/uploads/2021/06/may-photocopy-ricoh-mp-4055-ha-noi-900x900-5-1400x569.jpg'
                ],
            currentIndex:0,
            productsNew:[]
        }
     },
     methods:{
        startSlideshow() {
            this.slideshowInterval = setInterval(() => {
                this.nextBanner();
            }, 3000); // Đặt thời gian tự động chuyển đổi slide ở đây (đơn vị là mili giây, 3000 mili giây = 3 giây)
        },
        nextBanner(){
            if(this.currentIndex >=this.linkImgs.length-1){
                this.currentIndex=0
            }
            else{
                this.currentIndex+=1
            }
        },
        previousBanner(){
            if(this.currentIndex <=0){
                this.currentIndex=this.linkImgs.length-1
            }
            else{
                this.currentIndex-=1
            }

        },
        getItem(){
            const user = JSON.parse(sessionStorage.getItem('user'))
            if(user){
                this.name=user.user.fullName
            }else{
                this.name=''
            }
        },
        async logout(){
            try {
                await userService.logout()
                sessionStorage.removeItem('user')
                this.getItem()
            } catch (error) {
                console.log(error);
            }
        },
        async getInfoUser(){
            try {
                const response = await userService.getInfo()
                const user = JSON.stringify(response.data);
                sessionStorage.setItem('user', user);
                this.getItem()
            } catch (error) {
                console.log(error);
            }
        },
        async getProductsNew(){
            try {
                const response = await productService.filterProduct(-1, 'createdAt', 1, 4)
                this.productsNew=[...response.data]
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
     },
     mounted(){
        this.getItem()
        this.getInfoUser()
        this.getProductsNew()
     },
     created(){
        this.startSlideshow()
     }
     
     
}
</script>

<style>
@import url('/src/assets/css/hompage.css');
</style>