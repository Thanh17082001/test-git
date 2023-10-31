<template>
  <h3 class="text-uppercase text-primary mt-2" >Thanh toán đơn hàng</h3>
  <orderItem :typeOrder="typeOrder"></orderItem>
</template>

<script>
import orderItem from '@/components/order/orderItem.vue'
export default {
    components:{
        orderItem
    },
    props: ['typeOrder'],
}
</script>

<style>

</style>