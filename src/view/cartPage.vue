<template>
  <div class="cart container mb-5">
    <h3 class="text-uppercase fs-3 my-3 text-primary">Giỏ hàng</h3>
    <div class="row">
        <cartItem></cartItem>
    </div>
  </div>
</template>

<script>
import cartItem from '@/components/cart/cartItem.vue'
export default {
    components:{
        cartItem
    }
}
</script>

<style>
.cart-item-img img{
    width: 60px;
    height: 60px;
    aspect-ratio: 1/1;
}
.cart {
    min-height: 100%;
}
</style>