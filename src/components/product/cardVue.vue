<template>
    <div class="product-card">
        <div class="product-sale">
            <span>30%</span>
            <span>Giảm</span>
        </div>
        <div class="product-quantity">
            <span class="d-block">100</span>
            <span>Đã bán</span>
        </div>
        <div class="product-overlay">
            <a href="" class="product-see-detail">
                <span href="">Xem chi tiết</span>
            </a>
            <button class="product-btn">Thêm vào giỏ hàng</button>
        </div>
        <img :src="'http://localhost:3000/'+product.image" alt="">
        <div class="info-product">
            <span class="product-name">{{ product.name }}</span>
            <div class="product-price">
                <div>
                    <span class=""><b>Giá thuê</b>: {{ formatCurency(product.priceRental) }}</span>
                    <span class=""><b>Giá bán</b>: {{ formatCurency(product.priceSale) }}</span>
                </div>
                <!-- <div>
                    <span class="product-quanlity"><b>Đã bán</b>: 10</span>
                    <span><b>Loại</b>: {{ product.type }}</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import format from '@/utils/format';
export default {
    data(){
        return{

        }
    },
    props:{
        product:{}
    },
    methods:{
        formatCurency(price){
            return format.formatCurrency(price)
        }
    }
}
</script>

<style>
@import url('/src/assets/css/product.css');
</style>