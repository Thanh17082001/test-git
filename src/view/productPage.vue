<template>
  <div class="container">
    <h5 class="product-title">Sản phẩm của cửa hàng</h5>
    <div class="row">
        <div class="col-lg-2">
            <product-category @filter="filter" v-if="typeProduct=='product'"></product-category>
            <accessory-category @filter="filter" v-else></accessory-category>
        </div>
        <div class="col-lg-10">
            <!-- Sap xep -->
           <div class="d-flex">
                <div class="product-filter">
                    <span>Sắp xếp</span>
                    <select v-model="sortV" value="">
                        <option :value="{}">Không sắp xếp</option>
                        <option :value="{type:-1,field:'priceSale'}">Giá giảm dần</option >
                        <option :value="{type:1,field:'priceSale'}">Giá tăng dần</option >
                    </select>
                </div>
                <!-- loại sản phẩm -->
                <div class="product-filter ms-4">
                    <span>Sản phẩm</span>
                    <select v-model="typeProduct" value="">
                        <option value="accessory">Phụ kiện</option >
                        <option value="product">Máy</option >
                    </select>
                </div>
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
            <!-- phân trang -->
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
import accessoryService from '@/service/accessory.service'
import productCategory from '@/components/product/productCategory.vue'
import accessoryCategory from '@/components/product/accessoryCategory.vue'
export default {
    components:{
        productCard,
        productCategory,
        accessoryCategory
    },
    data(){
        return {
            products:[],
            pageNumber:1,
            pageSize:8,
            lengthProducts:0,
            isFilter:false,
            keyFilter:{},
            sortV:{},
            typeProduct:'product'
        }
    },
    watch:{
        sortV(){
            this.sort()
        },
        async typeProduct(){
            await this.getproduct()
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
                let length
                let response
                if(this.typeProduct=='product'){
                    length = await productService.getProducts();
                    response = await productService.getProducts(this.pageNumber, this.pageSize)
                }
                else{
                    length = await accessoryService.getAll();
                    response = await accessoryService.getAll(this.pageNumber, this.pageSize)
                }
                this.lengthProducts = Math.ceil(length.data.length / this.pageSize);
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
                let response
                if(this.typeProduct =='product'){
                    response = await productService.filterProduct(this.keyFilter.type, this.keyFilter.field, this.pageNumber, this.pageSize)
                }
                else{
                    response = await accessoryService.filterProduct(this.keyFilter.type, this.keyFilter.field, this.pageNumber, this.pageSize)
                }
                console.log(response);
                this.products=[]
                this.products= [...response.data]
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
        },
        
    },
    mounted(){
        this.getproduct()
    }
}
</script>

<style>

</style>