<template>
    <div class="alert alert-success position-alert" role="alert" v-if="added">
        Thêm sản phẩm thành công
    </div>
    <div class="product-card">
        <div class="overlay-disable" v-if="product.inputQuantity===0"></div>
        <div class="product-sale">
            <span>30%</span>
            <span>Giảm</span>
        </div>
        <div class="product-quantity" v-if="product.inputQuantity==0">
            <span class="d-block" >Hết hàng</span>
        </div>
        <div class="product-overlay">
            <a href="" class="product-see-detail">
                <span >Xem chi tiết</span>
            </a>
            <button class="product-btn" v-if="product.inputQuantity !==0"   data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+product._id">Thêm vào giỏ hàng</button>
            <button class="product-btn" v-else>Sản phẩm đã hết</button>
            
        </div>
        <img :src="'http://localhost:3000/'+product.image" alt="">
        <div class="info-product">
            <span class="product-name">{{ product.name }}</span>
            <div class="product-price">
                <div>
                    <span class="" v-if="product.priceRental"><b>Giá thuê</b>: {{ formatCurency(product.priceRental) }}</span>
                    <span class=""><b>Giá bán</b>: {{ formatCurency(product.priceSale) }}</span>
                </div>
                <div>
                    <span class="product-quanlity"><b>Đã bán</b>: {{ product.soldQuantity }}</span>
                    <!-- <span class="product-quanlity"><b>Loại</b>: {{ product.type }}</span> -->
                </div>
            </div>
        </div>
        <!-- modal -->
        <div v-if="!!product" class="modal fade" :id="'staticBackdrop'+product._id" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-uppercase text-warning fw-600" id="staticBackdropLabel">Thêm sản phẩm vào giỏ hàng</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start fw-500">
                  <span class="text-start text-info fs-5 text-capitalize">Thêm sản phẩm: {{ product.name }}</span>
                  <div class="add-cart-quantity">
                    <label for="">Số lượng</label>
                        <input v-model="inputQuantity" type="number" name="" id="" placeholder="Nhập số lượng sản phẩm" @input="checkInputQuantity(product, inputQuantity)">
                        <span v-if="!!isValid" class="text-danger">{{isValid}}</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy bỏ</button>
                  <button type="button" :disabled="!!isValid" class="btn btn-success" @click="addproductToCart(product._id, inputQuantity)" data-bs-dismiss="modal">Thêm</button>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import format from '@/utils/format';
import cartService from '@/service/cart.service'
export default {
    data(){
        return{
            isValid:'',
            inputQuantity:1,
            added:false,
            total:0
        }
    },
    props:{
        product:{}
    },
    methods:{
        formatCurency(price){
            return format.formatCurrency(price)
        },
        async addproductToCart(id, quantityCart){
            const checkInputQuantity = this.checkInputQuantity(this.product, quantityCart)
            const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
            const cartItem = {
                id:id,
                quantityCart:quantityCart,
                typeProduct:this.product.fits? 'accessory':'product'
            }
            if(checkInputQuantity){
                // chưa đăng nhập
                if(Object.keys(user).length<=0){
                    const cartList=[]
                    if(!this.$cookies.isKey('cart')){
                        cartList.unshift(cartItem)
                        this.$cookies.set('cart', JSON.stringify(cartList))
                    }
    
                    else{
                        let productsInCart = this.$cookies.get('cart')
                        const indexInCart = this.isProductInCart(cartItem,productsInCart)
                        if( indexInCart === -1){
                            productsInCart.unshift(cartItem)
                            this.$cookies.set('cart', JSON.stringify(productsInCart))
                        }
                        else{
                            productsInCart[indexInCart].quantityCart+=cartItem.quantityCart
                            this.$cookies.set('cart', JSON.stringify(productsInCart))
                        }
                    }
                    this.added=true
                    setTimeout(()=>{
                        this.added=false
                    }, 1500)
                }
                // đã đăng nhập
                else{
                    try {
                        const data = {
                            userId:user._id,
                            product:cartItem
                        }
                        const response = await cartService.create(data)
                        if(response.data.status){
                            this.added=true
                            setTimeout(()=>{
                                this.added=false
                            }, 1500)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                
            }
        },
        isProductInCart(newItem, Arrayproduct) {
            let index = -1;
            for (let i = 0; i < Arrayproduct.length; i++) {
                if (Arrayproduct[i].id == newItem.id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        checkInputQuantity(product, inputQuantity){
            this.isValid=''
            if(inputQuantity<=0 || inputQuantity==''){
                this.isValid='Số lượng không hợp lệ'
            }
            else if(inputQuantity> product.inputQuantity){
                this.isValid='Số lượng trong kho không đủ'
            }
            else{
                this.isValid=''
            }

            return this.isValid == '' ? true : false
        },
       
    }
}
</script>

<style scoped>
@import url('/src/assets/css/product.css');
.add-cart-quantity{
    display: flex;
    flex-direction: column;
}
.add-cart-quantity input{
    outline: none;
    padding: 5px 10px;
    width: 50%;
}
.position-alert{
    position: fixed;
    top: 20px;
    right: 20px;
    width: 500px;
    z-index: 9999;
    background: rgb(80, 255, 80);
    color:#fff;
}
</style>