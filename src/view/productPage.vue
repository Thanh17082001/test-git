<template>
  <div class="container">
    <h5 class="product-title">Sản phẩm của cửa hàng</h5>
    <div class="row">
        <div class="col-lg-2">
            <product-category @filter="filter"></product-category>
        </div>
        <div class="col-lg-10">
            <!-- Sap xep -->
            <div class="product-filter">
                <span>Sắp xếp</span>
                <select v-model="sortV" value="">
                    <option :value="{}">Không sắp xếp</option>
                    <option :value="{type:-1,field:'priceSale'}">Giá giảm dần</option >
                    <option :value="{type:1,field:'priceSale'}">Giá tăng dần</option >
                </select>
            </div>
            <!-- Danh sach san pham -->
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
            keyFilter:{},
            sortV:{}
        }
    },
    watch:{
        sortV(){
            this.sort()
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
            if(data.type){
                this.isFilter=true
                this.keyFilter={...data}
                this.filterServer()
            }
           else{
            this.keyFilter={}
            this.isFilter=false 
            this.getproduct()
           }
        },
        async filterServer(){
            try {
                console.log(this.keyFilter);
                const response = await productService.filterProduct(this.keyFilter.type, this.keyFilter.field, this.pageNumber, this.pageSize)
                this.products=[]
                this.products= [...response.data]
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
        sort() {
                const {type, field}= this.sortV
                  this.products.sort((a, b) => {
                      if (type == 1) {
                          return parseFloat(a[field]) - parseFloat(b[field]);
                      } else if (type == -1) {
                          return parseFloat(b[field]) - parseInt(a[field]);
                      }else if(field=='type'){
                        this.products.filter(product=>product.type==type)
                      }
                      else{
                        this.getproduct()
                      }
                  });
                  console.log(this.products);
        },
        
    },
    mounted(){
        this.getproduct()
    }
}
</script>

<style>

</style>