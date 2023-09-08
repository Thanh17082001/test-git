<template>
  <div class="container">
    <h5 class="product-title">Sản phẩm của cửa hàng</h5>
    <div class="row">
        <div class="col-lg-2">
            <product-category @filter="filter"></product-category>
        </div>
        <div class="col-lg-10">
            <div class="row">
                <div class="my-5" v-if="products.length==0">
                    Chưa có
                </div>
                <div class="col-lg-3 mb-3" v-for="product in products" :key="product._id" >
                    <productCard :product="product"></productCard>
                </div>

            </div>
            <div class="product-pagination my-4">
            <ul class="pagination  ">
                <li>
                    <span @click="previousPage"><i class="fa-solid fa-angles-left"></i></span>
                </li>
                <li><span>...</span></li>
                <li v-for="index in lengthProducts" :key="index">
                    <span class="me-3" :class="{ active_page: pageNumber===index, }" @click="handlePage(index)">{{ index }}</span>
                </li>

                <li><span>...</span></li>
                <li>
                    <span @click="nextPage"><i class="fa-solid fa-angles-right"></i></span>
                </li>
            </ul>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
import productCard from '@/components/product/cardVue.vue'
import productService from '@/service/product.service'
import productCategory from '@/components/product/productCategory.vue'
export default {
    components:{
        productCard,
        productCategory
    },
    data(){
        return {
            products:[],
            pageNumber:1,
            pageSize:8,
            lengthProducts:0,
            isFilter:false,
            keyFilter:{}
        }
    },
    methods:{
        handlePage(index){
            this.pageNumber = index;
            !this.isFilter ? this.getproduct() : this.filterServer();
        },
        nextPage() {
            if (this.pageNumber >= this.lengthProducts) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                !this.isFilter? this.getproduct() :this.filterServer();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                !this.isFilter ? this.getproduct() :this.filterServer();
            }
        },
        async getproduct(){
            try {
                const length = await productService.getProducts();
                this.lengthProducts = Math.ceil(length.data.length / this.pageSize);
                const response = await productService.getProducts(this.pageNumber, this.pageSize)
                this.products= [...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        filter(data){
            this.isFilter=true
            this.keyFilter={...data}
            data.type ? this.filterServer(): this.getproduct()
        },
        async filterServer(){
            try {
                console.log(this.keyFilter);
                const response = await productService.sortProduct(this.keyFilter.type, this.keyFilter.field, this.pageNumber, this.pageSize)
                this.products=[]
                this.products= [...response.data]
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        
    },
    mounted(){
        this.getproduct()
    }
}
</script>

<style>

</style>