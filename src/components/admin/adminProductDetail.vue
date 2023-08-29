<template>
    <div class="overlay" v-if="activeProductDetail">
            <div class="admin-card">
                <i class="fa-solid fa-xmark card-close" @click="closeProductDetail"></i>
                <div class="card-image">
                    <div v-if="activeImg" class="card-image-head"><span class="card-info-title">Ảnh sản phẩm</span></div>
                    <img  v-if="activeImg"  :src="'http://localhost:3000/'+product.image" alt="">
                    <div  v-if="!activeImg" class="card-specifications">
                        <i class="fa-solid fa-xmark card-close-speci" @click="activeImg=true"></i>
                        <span class="card-specifications-title" >Thông số kỹ thuật</span>
                        <div class="card-info-name">
                            <p>Tốc độ in: <span>Tosiba</span></p>
                            <p>Khay giấy <span>Máy văn phòng</span></p>
                            <p>Công nghệ: <span>Đã qua sử dụng</span></p>
                            <p>Màn hình: <span>Đã qua sử dụng</span></p>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <h3>{{ product.name }}</h3>
                    <span class="card-info-title">Thông tin sản phẩm</span>
                    <div class="card-info-name">
                        <p>Tên thương hiệu: <span>{{product.brandId? product.brandId.name : '' }}</span></p>
                        <p>Tên danh mục: <span>{{product.categoryId? product.categoryId.name : '' }}</span></p>
                        <p>Loại: <span>{{ product.type }}</span></p>
                    </div>
                    <div class="card-info-price">
                        <p>Giá nhập: <span>{{ product.priceImport }}</span></p>
                        <p>Số lượng nhập: <span>{{ product.inputQuantity }}</span></p>
                        <p>Giá bán: <span>{{ product.priceSale }}</span></p>
                        <p>Số lượng bán: <span>{{ product.soldQuantity }}</span></p>
                        <p>Giá cho thuê: <span>{{ product.priceRental }}</span></p>
                    </div>
                    <span class="card-info-title">Mô tả </span>
                    <div class="card-info-description">
                        {{ product.description }}
                    </div>

                    <div class="card-control mt-3">
                        <button class="btn btn-info me-3" @click="toggleImg">Thông số kỹ thuật</button>
                        <router-link :to="{name:'product.edit', params:{id:id}}" class="btn btn-warning" >Chỉnh Sửa</router-link> 
                    </div>
                </div>
              
            </div>
    </div>
</template>

<script>
import productService from '@/service/product.service';

export default {
    data(){
        return {
            activeImg:true,
            product:{},
            specificatios:{}
        }
    },
    watch:{
        activeProductDetail(){
            this.getProductDetail()
        }
    },
    props:{
        activeProductDetail:Boolean,
        id:String
    },
    emits:['closeProductDetail'],
    methods:{
        toggleImg(){
            this.activeImg=false
            console.log(this.id);
        },
        closeProductDetail(){
            this.$emit('closeProductDetail')
        },
        async getProductDetail(){
            try {
                const response = await productService.getProductDetail(this.id)
                if(response.status){
                    this.product=response.data
                }
                console.log(this.product);
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>

</style>