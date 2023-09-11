<template>
    <div class="product-category">
        <div class="category-title">
            <i class="fa-solid fa-bars"></i>
            <h5>Danh mục </h5>
        </div>
        <div class="category-group">
            <ul class="category-list active-list">
                <li @click="filter()">Tất cả sản phẩm</li>
            </ul>
            <span @click="handeleShowList('category')">
                Theo công năng 
                <i class="fa-solid fa-chevron-up ms-2" v-if="activeCategory"></i>
                <i class="fa-solid fa-chevron-down ms-2" v-else></i>
            </span>
            <ul class="category-list" :class="{'active-list':activeCategory}">
                <li @click="filter(category._id,'categoryId')" v-for="category in categories" :key="category._id">{{ category.name }}</li>
            </ul>
            <span @click="handeleShowList('brand')">
                Theo thương hiệu
                <i class="fa-solid fa-chevron-up ms-2" v-if="activeBrand"></i>
                <i class="fa-solid fa-chevron-down ms-2" v-else></i>
            </span>
            <ul class="category-list" :class="{'active-list':activeBrand}">
                <li @click="filter(brand._id,'brandId')"  v-for="brand in brands" :key="brand._id">{{ brand.name }}</li>
            </ul>
            <span @click="handeleShowList('type')">
                Theo loại
                <i class="fa-solid fa-chevron-up ms-2" v-if="activeType"></i>
                <i class="fa-solid fa-chevron-down ms-2" v-else></i>
            </span>
            <ul class="category-list" :class="{'active-list':activeType}">
                <li @click="filter('Mới','type')">Sản phẩm mới</li>
                <li @click="filter('Đã qua sử dụng','type')">Sản phẩm đã qua sử dụng</li>
            </ul>
        </div>
    </div>
</template>

<script>
import brandService from '@/service/brand.service';
import categoryService from '@/service/category.service';
export default {
    data(){
        return{
            brands:[],
            categories:[],
            activeCategory:true,
            activeBrand:false,
            activeType:false
        }
    },
    emits:['filter'],
    methods:{
        handeleShowList(name){

            if(name=='category'){
                this.activeCategory=!this.activeCategory
                this.activeBrand=false
                this.activeType=false
            }
            else if(name=='brand'){
                    this.activeCategory=false
                    this.activeBrand=!this.activeBrand
                    this.activeType=false
            }
            else{
                this.activeCategory=false
                this.activeBrand=false
                this.activeType=!this.activeType
            }
        },
        async getBrand(){
            try {
                const response=await brandService.getAll()
                this.brands=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        async getCategories(){
            try {
                const response=await categoryService.getAll()
                this.categories=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        filter(type, field){
            this.$emit('filter',{type,field})
        }
    },
    mounted(){
        this.getBrand()
        this.getCategories()
    }
}
</script>

<style>

</style>