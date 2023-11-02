<template>
  <h3 class="text-uppercase fs-3 my-3 text-primary">chi tiết sản phẩm</h3>
  <product-detail-item :product="product" :spes="spes" :typeProduct="typeProduct" :products="products"></product-detail-item>
</template>

<script>
import productService from '@/service/product.service';
import productDetailItem from '@/components/product/productDetailItem.vue';
import specificationsService from '@/service/specifications.service';
import accessoryService from '@/service/accessory.service';
export default {
    components:{
        productDetailItem
    },
    data(){
        return{
            product:{},
            spes:{}, 
            products:[],
            typeProduct:null
        }
    },
    props:['id'],
    watch:{
        id(){
            this.getproductById()
        }
    },
    methods:{
        async getproductById(){
            try {
                if(this.typeProduct=='product'){
                    const response = await productService.getProductById(this.id)
                    this.product=response.data
                    this.getSpeByid()
                    this.getProuctByBrandId()
                }
                else{
                    const response = await accessoryService.getById(this.id)
                    this.product=response.data
                    this.getRentalByBrandId()
                }
            } catch (error) {
                console.log(error);
            }
        }, 
        async getSpeByid(){
            try {
                if(this.typeProduct=='product'){
                    const response = await specificationsService.findByIdProduct(this.product?._id)
                    if(response.data.status){
                        this.spes=response.data.data || {}
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }, 
        async getProuctByBrandId(){
            try {
                const data={
                    condition:{
                        _id:{$ne:this.product?._id},
                        brandId:this.product?.brandId
                    },
                    sort:{
                        createdAt:-1,
                        inputQuantity:-1
                    },
                    pageNumber:1,
                    pageSize:4
                }
                const response = await productService.findCondition(data)
                this.products=response.data
                this.products.forEach(item=> item.typeProduct=this.typeProduct)

            } catch (error) {
                console.log(error);
            }
        },
        async getRentalByBrandId(){
            try {
                const data={
                    condition:{
                        _id:{$ne:this.product?._id},
                        brandId:this.product?.brandId
                    },
                    sort:{
                        createdAt:-1,
                        inputQuantity:-1
                    },
                    pageNumber:1,
                    pageSize:4
                }
                const response = await accessoryService.findCondition(data)
                this.products=response.data
                this.products.forEach(item=> item.typeProduct=this.typeProduct)

            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.typeProduct=this.$route.query.typeProduct
        this.getproductById()
    }
}
</script>

<style>

</style>