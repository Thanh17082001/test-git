<template>
    <div class="overlay" v-if="isLoading">
        <div class="loading-order">
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <div class="overlay" v-if="isConfirm">
        <form action="" class="form-confirm-order" @submit.prevent.stop="confirm()">
            <div class="d-flex justify-content-end">
                <i class="fa-solid fa-xmark fs-2 text-danger" @click="isConfirm=false"></i>
            </div>
            <h3 class="text-uppercase">Xác nhận đơn hàng</h3>
            <span class="text-warning fst-italic mb-3 d-block" v-if="!errorMes">Nhập mã 6 số được gửi tới email của bạn</span>
            <span class="text-danger fst-italic mb-3 d-block" v-if="errorMes">{{errorMes}}</span>
           <div class="spe-group">
                <input type="number" v-model="code" placeholder="Nhập mã gồm 6 số" required>
                <span class="text-danger text-start" v-if="validCode">{{validCode}}</span>
            </div>
            <button class="btn btn-success px-5 my-2">Xác nhận</button>
            <span class="d-block text-primary btn" @click="sendMail()">Gửi lại mã</span>
        </form>
    </div>
   <form class="container mb-5" @submit.prevent.stop="sendMail()">
        <div class="row">
            <div class="col-lg-5 me-5">
            <h4 class="text-start text-uppercase">Thông tin khách hàng</h4>
                <span class="text-start d-block mb-1 text-warning">Thông tin có dấu * là bắt buộc nhập</span>
                <div class="spe-group">
                    <label for="">Tên khách hàng <span class="text-danger">*</span></label>
                    <input v-model="customer.fullName" type="text" name="" id="" placeholder="Họ và tên" required>
                </div>
                <div class="spe-group">
                    <label for="">Số điện thoại <span class="text-danger">*</span></label>
                    <input v-model="customer.phone" type="text" name="" id="" placeholder="Số điện thoại" required>
                    <span v-if="!!valid.phone" :class="{ 'text-danger': !!valid.phone }">{{
                        valid.phone
                    }}</span>
                </div>
                <div class="spe-group">
                    <label for="">Email <span class="text-danger">*</span></label>
                    <input v-model="customer.email" type="email" name="" id="" placeholder="Địa chỉ email" required>
                    <span v-if="!!valid.email" :class="{ 'text-danger': !!valid.email }">{{
                        valid.email
                    }}</span>
                </div>
                <div class="spe-group">
                    <label for="">Địa chỉ <span class="text-danger">*</span></label>
                    <input v-model="customer.address" type="text" name="" id="" placeholder="Địa chỉ ghi rõ số nhà phường/xã, quận/huyện, tỉnh/thành phố" required>
                </div>
                
                <div class="spe-group">
                    <label for="">Ghi chú</label>
                   <textarea v-model="note" name="" id="" class="note" rows="5" placeholder="Ghi chú về đơn hàng ví dụ: chi tiết địa chỉ, đóng gói"></textarea>
                </div>
            </div>

            <!-- danh sách sản phẩm -->
            <div class="col-lg-6">
                <h4 class="text-start text-uppercase">Đơn hàng của bạn</h4>
                <div class="row text-start lable">
                    <div class="col-lg-8">sản phẩm</div>
                    <div class="col-lg-4 text-end">Tạm tính</div>
                </div>
                <div class="scroll">
                    <div class="row text-start content" v-for="item in orderData" :key="item._id">
                        <div class="col-lg-8">{{ item?.name +' x ' + item?.quantityCart}}  </div>
                        <div class="col-lg-4 text-end">{{ typeOrder=='Buy'? formatPrice(item?.priceSale *  item?.quantityCart): formatPrice(item?.priceRental *  item?.quantityCart)}}</div>
                    </div>
                    
                </div>
                <div class=" row" v-if="typeOrder=='Rental'">
                    <div class="spe-group">
                        <label for="">Số tháng thuê</label>
                        <input class="mt-1" v-model="quantityMonth" @keyup="(event)=>checkQuantityMonth(event)"  required type="number" placeholder="Nhập số tháng thuê" />
                    </div>
                    <div class="spe-group">
                        <label for="">Hình thức thanh toán</label>
                        <select v-model="payinfull" class="form-select" @change="totalProduct">
                            <option value="" class="form-option">--- Chọn cách thanh toán ---</option>
                            <option :value="true" class="form-option">Thanh toán toàn bộ</option>
                            <option :value="false" class="form-option">Thanh toán theo tháng</option>
                        </select>
                    </div>
                </div>
                <!-- tiền -->
                <div class="row text-start pay">
                    <div class="col-lg-8">Tổng tiền sản phẩm</div>
                    <div class="col-lg-4 text-end">{{ formatPrice(totalCostOfProducts) }}</div>
                </div>
                <div class="row text-start pay" v-if="(typeOrder =='Buy')">
                    <div class="col-lg-8">Phí vận chuyển 1%</div>
                    <div class="col-lg-4 text-end">{{ formatPrice(transportFee) }}</div>
                </div>
                <div class="row text-start pay">
                    <div class="col-lg-8">Tổng cộng</div>
                    <div class="col-lg-4 text-end">{{ formatPrice(totalAmount) }}</div>
                </div>
                <div class="row text-start pay" v-if="(typeOrder =='Rental')">
                    <div class="col-lg-8">Số tiền phải thanh toán</div>
                    <div class="col-lg-4 text-end">{{ formatPrice(pricePayed) }}</div>
                </div>
                
                
            </div>
            
        </div>
        <!-- hình thức thanh toán -->
        <div class="row mt-4">
            <h4 class="text-start text-uppercase">Phương thức thanh toán</h4>
            <div class="col-lg-4">
                <label for="payment" :class="{'payment-active': isClassCod, 'payment-error':choosePayent}" class="payment" @click=" paymentMeThod('COD')">
                        <img src="https://s3-ap-southeast-1.amazonaws.com/pharmacity-ecm-asm-dev/payment-method/cash.webp" alt="">
                        <div class="payment-content">
                            <span>Tiền mặt</span>
                            <span>Thanh toán khi nhận hàng</span>
                        </div>
                        <div class="payment-checkbox">
                            <span></span>
                        </div>
                </label>
            </div>
            <div class="col-lg-4">
                <label for="payment" :class="{'payment-active': isClassOnlVNPAY, 'payment-error':choosePayent}" class="payment"  @click=" paymentMeThod('VNPAY')">
                        <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" alt="">
                        <div class="payment-content">
                            <span>VNPay</span>
                            <span>Thanh toán qua ví VNPay</span>
                        </div>
                        <div class="payment-checkbox">
                            <span></span>
                        </div>
                </label>
            </div>
            <div class="col-lg-4">
                <label for="payment" :class="{'payment-active': isClassOnlMOMO, 'payment-error':choosePayent}" class="payment"  @click=" paymentMeThod('MOMO')">
                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="">
                        <div class="payment-content">
                            <span>MOMO</span>
                            <span>Quét mã QR momo</span>
                        </div>
                        <div class="payment-checkbox">
                            <span></span>
                        </div>
                </label>
            </div>
        </div>
        <div class="btn-container">
            <button class=" btn-order">Đặt hàng</button>
        </div>
   </form>
</template>

<script>
import format from '@/utils/format'
import customerService from '@/service/customer.service'
import orderService from '@/service/order.service'
import rentalService from '@/service/rental.service'
export default {
    data(){
        return{
            orderData:[],
            paymentMethod:'',
            isClassCod:false,
            isClassOnlVNPAY:false,
            isClassOnlMOMO:false,
            choosePayent:false,
            transportFee:0,
            totalCostOfProducts:0,
            totalAmount:0,
            valid:{}, 
            isSubmit:false,
            customer:{},
            note:'',
            payinfull:'',
            pricePayed:0, 
            quantityMonth:null,
            isConfirm:false,
            code:'',
            errorMes:'',
            validCode:'',
            isLoading:false
        }
    },
    watch:{
        quantityMonth(){2
            if(this.payinfull.toString() !=''){2
                this.totalProduct()
            }
        }
    },
    props: ['typeOrder'],
    methods:{
        formatPrice(price){
            return format.formatCurrency(price)
        },
        totalProduct(){
            this.totalAmount=0
            this.transportFee=0
            this.totalCostOfProducts=0
            this.orderData.forEach(product =>{
                if(product.priceSale && product.quantityCart)
                this.typeOrder =='Buy'?
                    this.totalCostOfProducts+=product.priceSale*product.quantityCart||0 :
                    this.totalCostOfProducts+=product.priceRental*product.quantityCart*this.quantityMonth||0
            })
            this.transportFee= this.typeOrder =='Buy'? Math.ceil(this.totalCostOfProducts* 0.01) : 0
            this.totalAmount=this.transportFee+this.totalCostOfProducts ||0
            if(this.payinfull){
                this.pricePayed=this.totalAmount
            }
            else if(this.payinfull ==false) {
                this.pricePayed= this.quantityMonth ? Math.ceil(this.totalAmount/this.quantityMonth) :0
            }
        },
        validateForm(infoCustomer) {
            const phoneRegex = /^[0-9]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!phoneRegex.test(infoCustomer.phone) || infoCustomer.phone.length < 10) {
                this.valid.phone = 'Số điện thoại không hợp lệ';
            } else {
                this.valid.phone = undefined;
            }

            if (!emailRegex.test(infoCustomer.email) || infoCustomer.email.length < 10) {
                this.valid.email = 'Email không hợp lệ';
            } else {
                this.valid.email = undefined;
            }

            let isValid = false;
            const arrayValid= Object.values(this.valid)
            for(let i=0;i<arrayValid.length;i++){
                if(arrayValid[i]===undefined){
                    isValid = true;
                } else {
                    isValid = false;
                    break
                }
            }
            return isValid;
        },
        async paymentMeThod( type){
            this.choosePayent=false
            if(type=='COD'){
                this.isClassCod=!this.isClassCod
                if(this.isClassCod){
                    this.paymentMethod='COD'
                    this.isClassOnlVNPAY=false
                    this.isClassOnlMOMO=false
                }
                else{
                    this.paymentMethod=''
                }
            }
            else if(type == 'VNPAY'){
                this.isClassOnlVNPAY=!this.isClassOnlVNPAY
                if(this.isClassOnlVNPAY){
                    this.paymentMethod='VNPAY'
                    this.isClassCod=false
                    this.isClassOnlMOMO=false
                }
                else{
                    this.paymentMethod=''
                }
            }
            else if(type == 'MOMO'){
                this.isClassOnlMOMO=!this.isClassOnlMOMO
                if(this.isClassOnlMOMO){
                    this.paymentMethod='MOMO'
                    this.isClassCod=false
                    this.isClassOnlVNPAY=false

                }
                else{
                    this.paymentMethod=''
                }
            }
        },
        async addRental(){
            try {
                const products=[]
                this.orderData.forEach(item =>{
                    products.unshift({
                        productId:item._id,
                        nameProduct:item.name,
                        priceRental:item.priceRental,
                        priceImport:item.priceImport,
                        quantity:item.quantityCart,
                    })
                })
                const userSession = JSON.parse(sessionStorage.getItem('user'))
                const user=userSession?.user ? userSession?.user :{}
                if(this.paymentMethod ==''){
                    this.isSubmit=false
                    this.choosePayent=true
                }
                else{
                    this.isSubmit=true
                }
                const validCus = this.validateForm(this.customer)
                let customerRes
                if(validCus){
                    customerRes = await customerService.create(this.customer)
                }
                else{
                    this.isSubmit=false
                    return;
                }
                const data={
                    createBy: Object.keys(user).length>0 ? user._id : null,
                    customerId:customerRes.data.result._id,
                    address:customerRes.data.result.address,
                    phone:customerRes.data.result.phone,
                    email:customerRes.data.result.email || '',
                    nameCustomer:customerRes.data.result.fullName,
                    products:[
                        ...products
                    ],
                    totalCostOfProducts:this.totalCostOfProducts,
                    paymentMethod:this.paymentMethod,
                    totalAmount:this.totalAmount,
                    priceMonth:Math.ceil(this.totalAmount/this.quantityMonth),
                    payInFull:this.payinfull,
                    note:this.note,
                    quantityMonth:this.quantityMonth,
                    IsOnlineOrder:true
                }
                if(this.isSubmit){
                    if(this.paymentMethod =='VNPAY'){
                        const response = await rentalService.create(data)
                        const resutl = response.data.data
                        if(response.data.status){
                            const payment = await rentalService.paymentVNPAY('cart',{totalAmount: resutl.totalAmount, orderId:resutl._id})
                            window.location.href=payment.data
                        }
                    }
                    else if(this.paymentMethod =='MOMO'){
                        const response = await rentalService.create(data)
                        const resutl = response.data.data
                        if(response.data.status){
                            const payment = await rentalService.paymentMOMO('cart',{totalAmount: resutl.totalAmount, orderId:resutl._id})
                            window.location.href=payment.data
                        }
                    }
                    else{
                        const response = await rentalService.create(data)
                        if(response.data.status){
                            this.products=[]
                            this.accessorys=[]
                            this.product={}
                            this.ordersProducts=[{
                                typeProduct:'',
                                idProduct:'',
                                quantity:0,
                                priceSale:0,
                            }],
                            this.customerId='',
                            this.isSubmit=true,
                            this.isClassCod=false
                            this.isClassOnl=false
                            this.note='',
                            this.customer={}
                            this.$router.push('/cart/?order=true')
                        }
                        else{
                            alert(response.data.mes)
                        }
                    }
                }
                else{
                    alert('Kiểm tra lại dữ liệu đã nhập')
                }
            } catch (error) {
                console.log(error);
            }
        },
        async sendMail(){
            try {
                const validCus = this.validateForm(this.customer)
                if(this.paymentMethod ==''){
                    this.isSubmit=false
                    this.choosePayent=true
                }
                else{
                    this.isSubmit=true
                }
                if(validCus && this.isSubmit){
                    this.isConfirm=false
                    this.isLoading=true
                    const response = await orderService.sendMail({email:this.customer.email})
                    this.isLoading=false
                    this.isConfirm=true
                    if(response.data.status){
                        this.isConfirm=true
                        this.code=''
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        validateCode(){
            if(this.code.length>=7){
                this.validCode='Mã chỉ gồm 6 ký tự'
                return false
            }
            else{
                return true
            }
        },
        async confirm(){
            try {
                const valid = this.validateCode()
                if(valid){
                    const  response = await orderService.confirm({code:this.code, email:this.customer.email})
                    if(response.data.status){
                        if(this.typeOrder=='Buy'){
                            await this.addOrder()
                        }
                        else{
                            await this.addRental()
                        } 
                    }
                    else{
                        this.errorMes=response.data.mes
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addOrder(){
            try {
                const products=[]
                this.orderData.forEach(item =>{
                    products.unshift({
                        productId:item._id,
                        nameProduct:item.name,
                        priceSale:item.priceSale,
                        priceImport:item.priceImport,
                        warrantyTime:item.warrantyTime,
                        typeProduct:item.typeProduct,
                        quantity:item.quantityCart,
                    })
                })
                const userSession = JSON.parse(sessionStorage.getItem('user'))
                const user=userSession?.user ? userSession?.user :{}
                if(this.paymentMethod ==''){
                    this.isSubmit=false
                    this.choosePayent=true
                }
                else{
                    this.isSubmit=true
                }
                const validCus = this.validateForm(this.customer)
                let customerRes
                if(validCus){
                    customerRes = await customerService.create(this.customer)
                }
                else{
                    this.isSubmit=false
                    return;
                }
                const data={
                    createBy: Object.keys(user).length>0 ? user._id : null,
                    customerId:customerRes.data.result._id,
                    address:customerRes.data.result.address,
                    phone:customerRes.data.result.phone,
                    email:customerRes.data.result.email || '',
                    nameCustomer:customerRes.data.result.fullName,
                    products:products,
                    totalCostOfProducts:this.totalCostOfProducts,
                    paymentMethod:this.paymentMethod,
                    transportFee: this.transportFee,
                    totalAmount:this.totalAmount,
                    note:this.note,
                    pricePayed:0, 
                    IsOnlineOrder:true
                }
                if(this.isSubmit){
                    if(this.paymentMethod =='VNPAY'){
                        const response = await orderService.create(data)
                        const resutl = response.data.data
                        if(response.data.status){
                            const payment = await orderService.paymentVNPAY('cart',{totalAmount: resutl.totalAmount, orderId:resutl._id})
                            window.location.href=payment.data
                        }
                    }
                    else if(this.paymentMethod =='MOMO'){
                        const response = await orderService.create(data)
                        const resutl = response.data.data
                        if(response.data.status){
                            const payment = await orderService.paymentMOMO('cart',{totalAmount: resutl.totalAmount, orderId:resutl._id})
                            window.location.href=payment.data
                        }
                    }
                    else{
                        const response = await orderService.create(data)
                        if(response.data.status){
                            this.products=[]
                            this.accessorys=[]
                            this.product={}
                            this.ordersProducts=[{
                                typeProduct:'',
                                idProduct:'',
                                quantity:0,
                                priceSale:0,
                            }],
                            this.customerId='',
                            this.isSubmit=true,
                            this.isClassCod=false
                            this.isClassOnl=false
                            this.note='',
                            this.customer={}
                            this.$router.push('/cart/?order=true')
                        }
                        else{
                            alert(response.data.mes)
                        }
                    }
                }
                else{
                    alert('Kiểm tra lại dữ liệu đã nhập')
                }
            } catch (error) {
                console.log(error);
            }
        },
        checkQuantityMonth(e){
            if(e.target.value <=0 ){
                e.target.style.borderColor='red'
                this.isSubmit=false
                
            }
            else{
                e.target.style.borderColor='#0E8388'
                this.isSubmit=true
            }
        },
    },
    mounted(){
        const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
        if(Object.keys(user).length>0){
            this.customer={
                fullName:user.fullName,
                email:user.email,
                phone:user.phoneNumber
            }
        }
        this.orderData=JSON.parse(localStorage.getItem('order'))
        this.totalProduct()
       
    }
    
}
</script>

<style scoped>
.note{
    width: 100%;
    height: 90px;
    outline: none;
    border-radius: 5px;
    padding-left: 10px;
}
.lable{
    font-size: 20px;
    text-transform: uppercase;
    border-bottom: 3px solid #ccc;
    padding: 10px 10px;
    margin-bottom: 10px;
}
.content, .pay{
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    padding: 10px 0px;
    margin-bottom: 10px;
}
.pay div:nth-child(1){
    font-weight: 600;
}
.scroll{
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}
.scroll::-webkit-scrollbar{
    width: 0px;
}
.payment{
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}
.payment-active{
    background: #f2f6fe;
    border-color: #0072bc;
}
.payment img{
    width: 40px;
    height: 40px;
}
.payment-content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
}
.payment-content span:nth-child(1){
    font-weight: 600;
    font-size: 18px;
}
.payment-checkbox span{
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    display: block;
    border-radius: 50%;
    position: relative;
    background: #ccc;

}
.payment-checkbox span::before{
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
}
.payment-active .payment-checkbox span{
    background: #0072bc;
}
.payment-error{
    border-color: red;
}
.btn-order{
    background: #7f54b3;
    color: #fff;
    padding: 10px 40px ;
    outline: none;
    border-radius: 5px;
    border: none;
}
.btn-container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    margin-top: 10px;
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
.form-confirm-order{
    position: relative;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    background: #fff;
    padding: 20px 25px;
    z-index: 9999;
}
.loading-order{
    position: relative;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    
}
.loading-order div{
    width: 80px;
    height: 80px;
}
</style>