<template>
    <div class="product-category">
        <div class="category-title">
            <i class="fa-solid fa-bars"></i>
            <h5>Danh mục </h5>
        </div>
        <div class="category-group">
            <ul class="category-list">
                <li @click="filter()">Tất cả sản phẩm</li>
               
            </ul>
            <span>Theo công năng</span>
            <ul class="category-list">
                <li @click="filter(category._id,'categoryId')" v-for="category in categories" :key="category._id">{{ category.name }}</li>
            </ul>
            <span>Theo thương hiệu</span>
            <ul class="category-list">
                <li @click="filter(brand._id,'brandId')"  v-for="brand in brands" :key="brand._id">{{ brand.name }}</li>
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
        }
    },
    emits:['filter'],
    methods:{
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