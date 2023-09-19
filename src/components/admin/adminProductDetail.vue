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
                        <div v-if="existSpe" class="card-info-name">
                            <p>Tốc độ in: <span>{{ infoSpe.speed }}</span></p>
                            <p>Khay giấy <span>{{ infoSpe.paperTray }}</span></p>
                            <p>Kích thước giấy <span>{{ infoSpe.paperSize }}</span></p>
                            <p>Công nghệ: <span>{{ infoSpe.connectionTechnology }}</span></p>
                            <p>Màn hình: <span>{{ infoSpe.screen }}</span></p>
                        </div>
                        <div class="div" v-else>
                            <span>Chưa thêm thông số kỹ thuật</span>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <h3>{{ product.name }}</h3>
                    <span class="card-info-title">Thông tin sản phẩm</span>
                    <div class="card-info-name">
                        <p>Tên thương hiệu: <span>{{product.brandId? product.brandId.name : '' }}</span></p>
                        <p>Tên danh mục: <span>{{product.categoryId? product.categoryId.name : '' }}</span></p>
                        <p>Loại: <span>{{ product.typeId? product.typeId.name : '' }}</span></p>
                    </div>
                    <div class="card-info-price">
                        <p>Giá nhập: <span>{{ product.priceImport }}</span></p>
                        <p>Số lượng nhập: <span>{{ product.inputQuantity }}</span></p>
                        <p>Giá bán: <span>{{ product.priceSale }}</span></p>
                        <p>Số lượng bán: <span>{{ product.soldQuantity }}</span></p>
                        <p>Giá cho thuê: <span>{{ product.priceRental }}</span></p>
                        <p>Ngày tạo: <span>{{ product.createdAt }}</span></p>
                        <p>Ngày sửa: <span>{{ product.updatedAt }}</span></p>
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
import specificationsService from '@/service/specifications.service';
import format from '@/utils/format';
export default {
    data(){
        return {
            activeImg:true,
            product:{},
            specificatios:{},
            infoSpe:{},
            existSpe:true
        }
    },
    watch:{
        activeProductDetail(){
            this.getProductDetail()
            this.getSpeByIdProduct()
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
                    this.product.priceImport=format.formatCurrency(this.product.priceImport)
                    this.product.priceRental=format.formatCurrency(this.product.priceRental)
                    this.product.priceSale=format.formatCurrency(this.product.priceSale)
                    this.product.createdAt=format.formatDate(this.product.createdAt)
                    this.product.updatedAt=format.formatDate(this.product.updatedAt)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getSpeByIdProduct(){
            try {
                const response = await specificationsService.findByIdProduct(this.id)
                if(response.data.status){
                    this.infoSpe={
                        ...response.data.data
                    }
                    this.existSpe=true

                }
                else{
                    this.existSpe=false
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>

</style>