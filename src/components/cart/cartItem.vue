<template>
    <div class="overlay" v-if="orderSuccess" @click="closeSuccess">
        <div class="modal-success text-success">
            <div class="text-center success-icon">
                <span><i class="fa-solid fa-check"></i></span>
            </div>
            <h3 class="">Đặt hàng thành công</h3>
        </div>
    </div>
    <div class="overlay" v-if="paymentSuccess" @click="closeSuccess2">
        <div class="modal-success text-success">
            <div class="text-center success-icon">
                <span><i class="fa-solid fa-check"></i></span>
            </div>
            <h3 class="">Thanh toán thành công</h3>
        </div>
    </div>
    <div class="overlay" v-if="paymentSuccess ==false" @click="closeSuccess2">
        <div class="modal-success text-danger">
            <div class="text-center success-icon">
                <span><i class="fa-solid fa-check"></i></span>
            </div>
            <h3 class="">Thanh toán không thành công</h3>
        </div>
    </div>
    <div class="d-flex">
        <button @click="handelBuy()" class="btn btn-secondary me-3" :class="{'btn-danger': typeOrder=='Buy'}">Mua máy</button>
        <button @click="handelRental()" type="button" class="btn btn-secondary" :class="{'btn-danger': typeOrder=='Rental'}">Thuê máy</button>
    </div>
    <div class="d-flex">
        <span class="text-warning fst-italic">Chọn 1 trong 2 hình thức trên</span>
    </div>
    <div class="row">
        <div class="col-lg-9">
            <div class="cart-item">
                <table class="w-100">
                    <thead>
                        <tr class="row">
                            <th class="col-2">Hình ảnh</th>
                            <th class="col-3">Tên sản phẩm</th>
                            <th class="col">Đơn giá</th>
                            <th class="col-2">Số lượng</th>
                            <th class="col">Thành tiền</th>
                            <th class="col-1">Xóa</th>
                            <th class="col-1"><input v-if="cartList.length>0" class="cart-item-checkbox" type="checkbox" name="" id="" ref="checkAll" @click="checkAll"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cartItem in cartList" :key="cartItem._id" class="row">
                            <td class="col-2 cart-item-img"><img :src="'http://localhost:3000' + cartItem.image" alt=""></td>
                            <td class="col-3">{{ cartItem.name }}</td>
                            <td class="col">{{ typeOrder=='Buy'? formatPrice(cartItem?.priceSale): formatPrice(cartItem?.priceRental) }}</td>
                            <td class="col-2" :class="{'d-flex justify-content-center flex-column': cartItem.validInput}">
                                <div class="cart-item-quantity">
                                    <i class="fa-solid fa-minus" @click="reduceQuantity(cartItem._id)"></i>
                                    <span>{{ cartItem.quantityCart }}</span>
                                    <i class="fa-solid fa-plus" @click="increaseQuantity(cartItem._id)"></i>
                                </div>
                                <div v-if="cartItem.validInput">
                                    <span class="text-danger valid-input">{{ cartItem.validInput }}</span>
                                </div>
                            </td>
                            <td class="col text-danger">{{typeOrder=='Buy'? formatPrice(cartItem.quantityCart*cartItem.priceSale):formatPrice(cartItem.quantityCart*cartItem.priceRental) }}</td>
                            <td class="col-1 cart-item-delete"><i class="fa-solid fa-trash" @click="deleteCart(cartItem._id)"></i></td>
                            <td class="col-1 cart-item-delete"><input class="cart-item-checkbox" ref="checkProduct" type="checkbox" @click="(e)=>selectProduct(e, cartItem)"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="cart-pay">
                <h3 class="text-start text-uppercase">thanh toán</h3>
                <div class="row mt-5 text-start fs-5">
                    <span class="col-6">Tạm tính:</span>
                    <span class="col-6 text-danger">{{ formatPrice(total()) }}</span>
                </div>
               <div class="row mt-2">
                    <button class="col-lg-4 btn cart-btn-buy me-3 ms-1">Mua thêm</button>
                    <button class="col-lg-7 btn cart-btn-order" @click="order">Đặt hàng</button>
               </div>
            </div>
        </div>
    </div>
    <div class="d-flex mt-3">
        <router-link to="/order-history" class="btn btn-info">Xem các đơn hàng đã mua</router-link>
    </div>
</template>

<script>
import productService from '@/service/product.service'
import accessoryService from '@/service/accessory.service'
import cartService from '@/service/cart.service'
import format from '@/utils/format'
export default {
    data(){
        return {
            cartList:[],
            totalAmount:0,
            productsOrder:[],
            orderSuccess:false,
            paymentSuccess:null,
            typeOrder:'Buy'
        }
    },
    methods:{
        closeSuccess(){
            this.$router.push('/cart')
            this.orderSuccess=false
        },
        isOrderSuccess() {
            const params = new URLSearchParams(window.location.search);
            if(params.get('order') === 'true'){
                this.orderSuccess= true
            }
            else if(params.get('order') === 'false'){
                this.orderSuccess= false
            }
        },
        closeSuccess2(){
            this.$router.push('/cart')
            this.paymentSuccess=null
        },
        isPaymentSuccess() {
            const params = new URLSearchParams(window.location.search);
            if(params.get('success') === 'true'){
                this.paymentSuccess= true
            }
            else if(params.get('success') === 'false'){
                this.paymentSuccess= false
            }
        },
        async getItemToCart(){
            this.cartList=[]
            const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
            // chưa đăng nhập
            if(Object.keys(user).length<=0){
                if(this.$cookies.isKey('cart')){
                    const carts = this.$cookies.get('cart')
                    carts.forEach(async cart => {
                        let response
                        if(cart.typeProduct=='accessory'){
                            response= await accessoryService.getById(cart.id)
                        }
                        else{
                            response = await productService.getProductById(cart.id)
                        }
                        if(response.data.inputQuantity < cart.quantityCart){
                            this.cartList.push({
                                quantityCart:cart.quantityCart,
                                typeProduct:cart.typeProduct,
                                ...response.data,
                                validInput:`Số lượng trong kho không đủ (${response.data.inputQuantity})`
                            })
                        }
                        else{
                            this.cartList.push({
                                quantityCart:cart.quantityCart,
                                typeProduct:cart.typeProduct,
                                ...response.data,
                            })
                        }
                        
                    });
                }
            }

            // đã đăng nhập
            else{
                const response = await cartService.getByUserId(user._id)
                const carts = response.data?.products || []
                carts.forEach(async cart => {
                        let response
                        if(cart.typeProduct=='accessory'){
                            response= await accessoryService.getById(cart.id)
                        }
                        else{
                            response = await productService.getProductById(cart.id)
                        }
                        if(response.data.inputQuantity < cart.quantityCart){
                            this.cartList.push({
                                quantityCart:cart.quantityCart,
                                typeProduct:cart.typeProduct,
                                ...response.data,
                                validInput:`Số lượng trong kho không đủ (${response.data.inputQuantity})`
                            })
                        }
                        else{
                            this.cartList.push({
                                quantityCart:cart.quantityCart,
                                typeProduct:cart.typeProduct,
                                ...response.data,
                            })
                        }
                        
                    });
            }
            
        },
        async changeItemCarrt(index, value){
            this.cartList[index]=value
        },
        formatPrice(price){
            return format.formatCurrency(price)
        },
        async deleteCart(id){
            const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
            if(Object.keys(user).length<=0){
                const carts = this.$cookies.get('cart')
                const index = carts.findIndex(item => item.id === id);
                const index2 = this.cartList.findIndex(item => item._id === id)
                if (index !== -1) {
                    carts.splice(index, 1); 
                }
                this.$cookies.set('cart', JSON.stringify(carts))
                if (index2 !== -1) {
                    this.cartList.splice(index2, 1); 
                }
                this.$store.commit('addToCart')
            }
            else{
                const response = await cartService.getByUserId(user._id)
                const carts = response.data?.products || []
                const index = carts.findIndex(item => item.id === id);
                const index2 = this.cartList.findIndex(item => item._id === id)
                if (index !== -1) {
                    carts.splice(index, 1); 
                }
                const update = await cartService.update(user._id, {products:carts})
                this.$store.commit('addToCart', carts)
                if (index2 !== -1 && update.data.status) {
                    this.cartList.splice(index2, 1); 
                }
            }
            const index =this.productsOrder.findIndex(item => item._id == id)
            this.productsOrder.splice(index,1)
            if(this.cartList.length<=0){
                this.$refs.checkAll.checked=false
            }
        },
        async increaseQuantity(id){
            const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
            if(Object.keys(user).length<=0){
                const carts = this.$cookies.get('cart')
                const index = carts.findIndex(item => item.id === id);
                const index2 = this.cartList.findIndex(item => item._id === id)
                carts[index].quantityCart+=1
                if(this.cartList[index2].inputQuantity< carts[index].quantityCart){
                    this.cartList[index2].validInput=`Số lượng trong kho không đủ (${this.cartList[index2].inputQuantity})`
                }
                this.$cookies.set('cart', JSON.stringify(carts))
                this.cartList[index2].quantityCart=carts[index].quantityCart
            }
            else{
                const response = await cartService.getByUserId(user._id)
                const carts = response.data?.products || []
                const index = carts.findIndex(item => item.id === id);
                const index2 = this.cartList.findIndex(item => item._id === id)
                carts[index].quantityCart+=1
                if(this.cartList[index2].inputQuantity< carts[index].quantityCart){
                    this.cartList[index2].validInput=`Số lượng trong kho không đủ (${this.cartList[index2].inputQuantity})`
                }
                const update = await cartService.update(user._id, {products:carts})
                if(update.data.status){
                    this.cartList[index2].quantityCart=carts[index].quantityCart
                }
            }
        },
        async reduceQuantity(id){
            const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
            if(Object.keys(user).length<=0){
                const carts = this.$cookies.get('cart')
                const index = carts.findIndex(item => item.id === id);
                const index2 = this.cartList.findIndex(item => item._id === id)
                carts[index].quantityCart-=1
                if(carts[index].quantityCart<=0){
                    await this.deleteCart(id)
                    return
                }
                else if(this.cartList[index2].inputQuantity>= carts[index].quantityCart){
                    this.cartList[index2].validInput=''
                }
                this.$cookies.set('cart', JSON.stringify(carts))
                this.cartList[index2].quantityCart=carts[index].quantityCart
            }
            else{
                const response = await cartService.getByUserId(user._id)
                const carts = response.data?.products || []
                const index = carts.findIndex(item => item.id === id);
                const index2 = this.cartList.findIndex(item => item._id === id)
                carts[index].quantityCart-=1
                if(carts[index].quantityCart<=0){
                    await this.deleteCart(id)
                    return;
                }
                else if(this.cartList[index2].inputQuantity>= carts[index].quantityCart){
                    this.cartList[index2].validInput=''
                }
                const update = await cartService.update(user._id, {products:carts})
                if(update.data.status){
                    this.cartList[index2].quantityCart=carts[index].quantityCart
                }
            }
        },
        total(){
            let sum=0
            if( this.typeOrder=='Buy'){
                this.productsOrder?.forEach(item =>{
                    sum+=item.quantityCart*item.priceSale
                })
            }
            else{
                this.productsOrder?.forEach(item =>{
                    sum+=item.quantityCart*item.priceRental
                })
            }
             return sum
        },
        selectProduct(e, info){
            const checkProducts =this.$refs.checkProduct
            if(checkProducts.every(item => item.checked==true)){
                this.$refs.checkAll.checked=true
            }
            else{
                this.$refs.checkAll.checked=false
            }
            if(e.target.checked){
                this.productsOrder.push(info)
            }
            else{
                const index =this.productsOrder.findIndex(item => item._id == info._id)
                this.productsOrder.splice(index,1)
            }
        },
        checkAll(){
           const checkProducts =this.$refs.checkProduct
           if( this.$refs.checkAll.checked){
            checkProducts.forEach(item => item.checked=true)
            this.cartList.forEach(item => this.productsOrder.push(item))
           }
           else{
            checkProducts.forEach(item => item.checked=false)
            this.productsOrder=[]
           }
        },
        order(){
            if(this.productsOrder.length<=0){
                alert('Bạn chưa chọn sản phẩm nào')
                return;
            }
            const valid = this.productsOrder.some(item => item.quantityCart > item.inputQuantity)
            if(!valid){
                localStorage.setItem('order', JSON.stringify(this.productsOrder))
                this.$router.push({name:'order', params:{typeOrder: this.typeOrder.toString()}});
            }
            else{
                alert('Bạn đang chọn sản phẩm không đủ số lượng')
            }
        },
        handelRental(){
            this.cartList=this.cartList.filter(item => item.typeProduct !='accessory')
            this.typeOrder='Rental'
        },
        async handelBuy(){
            await this.getItemToCart()
            this.typeOrder='Buy'
        }
    },
    mounted(){
        this.getItemToCart()
        this.isPaymentSuccess()
        this.isOrderSuccess()
    },
}
</script>

<style scoped>
.cart-item{
    padding: 10px 20px;
    border-radius: 10px;
    background: #f0f2f5;
}
table{
    min-height: 180px;
    text-align: left;
    
}
 thead{
    height: 60px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    width: 100%;
}
tr{
    width: 100%;
}
th{
    font-weight: 900;
    display: flex;
    align-items: center;
}
td{
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 550;
    letter-spacing: 0;
}
.scroll-cart {
    display: block;
    max-height: 400px;
    overflow-y: auto;
}
tbody tr{
    height: 100px;
}
.cart-item-input{
    width: 100%;
    outline: none;
    border: 1px solid #ccc;
    padding: 5px 10px;
}
.cart-item-quantity{
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.cart-item-quantity i{
    flex: 1;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #ccc;
    cursor: pointer;
    color: blue;
}
.cart-item-quantity span{
    display: block;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

}
.cart-item-delete i{
    font-size: 25px;
    color: red;
    cursor: pointer;
}
.cart-item-checkbox{
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.cart-pay{
    padding: 20px;
    border-radius: 10px;
    background: #f0f2f5;
    min-height: 180px;
}
.cart-btn-order{
    background: #feaa48;
    color:#fff;
}
.cart-btn-buy{
    border: 1px solid blue;
    color:blue;
}
.valid-input{
    font-size: 9.5px;
    font-weight: 600;
    color:red;
    font-style: italic;
}
.modal-success{
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: 200px;
    background: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.success-icon{
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.success-icon span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    border: 1px solid;
    border-radius: 50%;
}
.success-icon span i{
    font-size: 50px;
}
</style>