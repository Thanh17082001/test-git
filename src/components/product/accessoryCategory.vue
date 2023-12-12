<template>
    <div class="product-category">
        <div class="category-title">
            <i class="fa-solid fa-bars"></i>
            <h5>Danh mục </h5>
        </div>
        <div class="category-group">
            <ul class="category-list active-list">
                <li @click="filter()">Tất cả phụ kiện</li>
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
                <li @click="filter(typeItem._id,'typeId')"  v-for="typeItem in types" :key="typeItem._id">{{ typeItem.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import brandService from '@/service/brand.service';
import categoryService from '@/service/category.service';
import typeAccService from '@/service/typeAcc.service';
export default {
    data(){
        return{
            brands:[],
            categories:[],
            types:[],
            activeBrand:true,
            activeType:false
        }
    },
    emits:['filter'],
    methods:{
        handeleShowList(name){
            if(name=='brand'){
                    this.activeCategory=false
                    this.activeBrand=!this.activeBrand
                    this.activeType=false
            }
            else if(name == 'type'){
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
        async getTypes(){
            try {
                const response=await typeAccService.getAll()
                this.types=[...response.data]
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
        this.getTypes()
    }
}
</script>

<style>

</style>