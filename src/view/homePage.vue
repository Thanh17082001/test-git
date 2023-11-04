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
                <h3 class="col-8">Sản phẩm bán chạy nhất</h3>
                <div class="home-see-more col">
                    <a href="">Xem thêm <i class="fa-solid fa-angles-right"></i></a>
                </div>
            </div>

            <div class="row flex-nowrap mt-5">
                <div  class="col-sm-6 col-6 col-lg-3 col-md-4" v-for="product in productsBestSeller" :key="product._id">
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
                <div  class="col-sm-6 col-6 col-lg-3 col-md-4" v-for="item in news" :key="item._id">
                    <newsCard :news="item"></newsCard>
                </div>
            </div>
            </div>
        </div>
   </div>
  </div>
</template>

<script>
import productService from '@/service/product.service'
import productCard from '@/components/product/cardVue.vue'
import newsCard from '@/components/news/newsCard.vue'
import newsService from '@/service/news.service';
import format from '@/utils/format';
export default {
    components:{
        productCard,
        newsCard
    },
     data(){
        return{
            linkImgs:
                [
                    'https://giavan.com.vn/wp-content/uploads/2019/01/banner-toshiba-gia-van.jpg',
                    'https://mayphototantien.com/wp-content/uploads/2021/06/DICH-VU-THUE-MAY-PTCP-TT-1400x569.jpg',
                    'https://mayphototantien.com/wp-content/uploads/2021/06/may-photocopy-ricoh-mp-4055-ha-noi-900x900-5-1400x569.jpg'
                ],
            currentIndex:0,
            productsNew:[],
            productsBestSeller:[],
            news:[],
            pageNumber:1,
            pageSize:4,
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
        async getProductsNew(){
            try {
                const response = await productService.filterProduct(-1, 'createdAt', 1, 4)
                this.productsNew=[...response.data]
                this.productsNew.forEach(item=>item.typeProduct='product')
            } catch (error) {
                console.log(error);
            }
        },
        async getProductsBestSeller(){
            try {
                const data={
                    pageNumber:this.pageNumber,
                    pageSize:this.pageSize,
                    sort:{
                        'soldQuantity':-1
                    }
                }
                const response = await productService.findCondition(data)
                console.log(response);
                this.productsBestSeller=[...response.data]
                this.productsBestSeller.forEach(item=>item.typeProduct='product')
            } catch (error) {
                console.log(error);
            }
        },
        async getAllNews(){
            try {
                const length = await newsService.getAll()
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await newsService.getAll(this.pageNumber,this.pageSize)
                this.news=[
                    ...response.data
                ]
                this.news.map(order =>{
                    order.createdAt = format.formatDateNoTime(order.createdAt)
                }) 
            } catch (error) {
                console.log(error);
            }
        },
     },
     mounted(){
        this.getProductsNew()
        this.getProductsBestSeller()
        this.getAllNews()
     },
     created(){
        this.startSlideshow()
     }
     
     
}
</script>

<style>
@import url('/src/assets/css/hompage.css');
</style>