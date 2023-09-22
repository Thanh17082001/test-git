<template>
    <div class="overlay" >
            <div class="admin-card">
                <i class="fa-solid fa-xmark card-close" @click="closeProductDetail"></i>
                <div class="card-image">
                    <div  class="card-image-head"><span class="card-info-title">Ảnh phụ kiện</span></div>
                    <img   :src="'http://localhost:3000/'+accessory.image" alt="">
                </div>
                <div class="card-info">
                    <h3>{{ accessory.name }}</h3>
                    <span class="card-info-title">Thông tin phụ kiện</span>
                    <div class="card-info-price">
                        <p>Giá nhập: <span>{{ accessory.priceImport }}</span></p>
                        <p>Số lượng nhập: <span>{{ accessory.inputQuantity }}</span></p>
                        <p>Giá bán: <span>{{ accessory.priceSale }}</span></p>
                        <p>Số lượng bán: <span>{{ accessory.soldQuantity }}</span></p>
                        <p>Ngày tạo: <span>{{ accessory.createdAt }}</span></p>
                        <p>Ngày sửa: <span>{{ accessory.updatedAt }}</span></p>
                    </div>
                    <span class="card-info-title mt-3">Phù hợp với các sản phẩm</span>
                    <div class="card-info-price info-acc">
                        <span class="text-left mb-2" v-for="(fit, index) in accessory.fits" :key="fit._id"><b class="text-black">Tên sản phẩm {{ index+1 }}</b>: <span>{{ fit.product.name }}</span></span>
                    </div>
                    <span class="card-info-title mt-3">Mô tả </span>
                    <div class="card-info-description">
                        {{ accessory.description }}
                    </div>
                </div>
              
            </div>
    </div>
</template>

<script>
import format from '@/utils/format';
import accessoryService from '@/service/accessory.service';
export default {
    data(){
        return {
            accessory:{},
        }
    },
    watch:{
        activeProductDetail(){
            this.getProductDetail()
            this.getSpeByIdProduct()
        }
    },
    props:{
        idAcc:String
    },
    emits:['closeDetail'],
    methods:{
        closeProductDetail(){
            this.$emit('closeDetail')
        },
        async getAccessoryDetail(){
            try {
                const response = await accessoryService.getById(this.idAcc)
                this.accessory={
                    ...response.data
                }
                console.log(this.accessory.fits);
                this.accessory.createdAt = format.formatDate(this.accessory.createdAt)
                this.accessory.updatedAt = format.formatDate(this.accessory.updatedAt)
                
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted(){
        this.getAccessoryDetail()
    }
}
</script>

<style scoped> 
.info-acc span{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100%;
    text-align: left;
}

.info-acc{
    height: 130px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-right: 20px;
}
</style>