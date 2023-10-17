<template>
    <div class="overlay" v-if="paymentSuccess" @click="closeSuccess">
        <div class="modal-success text-success">
            <div class="text-center success-icon">
                <span><i class="fa-solid fa-check"></i></span>
            </div>
            <h3 class="">Thanh toán thành công</h3>
        </div>
    </div>
    <div class="overlay" v-if="paymentSuccess ==false" @click="closeSuccess">
        <div class="modal-success text-danger">
            <div class="text-center success-icon">
                <span><i class="fa-solid fa-check"></i></span>
            </div>
            <h3 class="">Thanh toán không thành công</h3>
        </div>
    </div>
  <div class="search-warranty">
    <div class="search-box">
        <div class="search-input text-start">
           
            <i v-if="textSearch!=''" class="fa-solid fa-xmark position1" @click="clearTextInput"></i>
            <input ref="warrantyInput"  v-model="textSearch" type="text" placeholder="Nhập mã hóa đơn của bạn...">
            <span class="text-danger mt-1 d-block" v-if="validInput">Độ dài mã hõa đơn không hợp lệ</span>
        </div>
        <button @click="SeachOrder">Tìm kiếm</button>
    </div>
        <div v-if="loading" class="spinner-border text-info mt-5" role="status">
            <span class="visually-hidden">Loading...</span>
       </div>
    <div v-if="Object.keys(order).length>0" class="search-content-warranty">
        <h5 class="title">Thông tin phiếu mua hàng</h5>
        
        <div class="row">
            <div class="col-lg-6">
                <div class="status-info text-start">
                    <h5 class="mb-0 text-center">Thông tin Đơn hàng</h5>
                    <div class="scroll-address">
                        <span><strong class="me-2">Mã đơn hàng:</strong>{{ order._id }}</span>
                        <span><strong class="me-2">Ngày tạo:</strong>{{ order.createdAt }}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="status-info text-start">
                    <h5 class="mb-0 text-center">Thông tin khách hàng</h5>
                    <div class="scroll-address">
                        <span><strong class="me-2">Tên:</strong>{{ order.nameCustomer }}</span>
                        <span><strong class="me-2">Số điện thoại:</strong>{{ order.phone }}</span>
                        <span><strong class="me-2">Địa chỉ:</strong>{{ order.address }}</span>
                    </div>
                </div>
            </div>
        </div>
        <h5 class="mt-3">Danh sách sản phẩm</h5>
        <table class="table">
            <thead>
                <tr class="">
                    <th class="col-1 text-center">STT</th >
                    <th class="col">Tên sản phẩm</th >
                    <th class="col">Ngày mua</th >
                    <th class="col">Số tháng</th >
                    <th class="col">Hết hạn bảo hành</th >
                    <th class="col">Hành động</th >
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="(product, index) in order.products" :key="product._id">
                    <td class="col-1 text-center">{{index+1}}</td>
                    <td class="col">{{ product.nameProduct }}</td >
                    <td class="col">{{formatDate(order.createdAt)}}</td >
                    <td class="col text-center">{{ product.warrantyTime}}</td >
                    <td class="col">{{formatDate(dealineDate(order.createdAt,product.warrantyTime))}}</td >
                    <td class="col"><span class="btn btn-primary" @click="warranty(product)">Bảo hành</span></td >
                </tr>
            </tbody>
        </table>
    </div>
  </div>
  <warranty-create v-if="activeCreate" :info="info" @close-create="activeCreate=false"></warranty-create>
</template>

<script>
import orderService from '@/service/order.service';
import rentalService from '@/service/rental.service';
import format from '@/utils/format';
import WarrantyCreate from './adminWarrantyCreate.vue';
export default {
    components:{
        WarrantyCreate
    },
    data(){
        return {
            textSearch:'',
            validInput:false,
            loading:false,
            order:{},
            activeCreate:false,
            info:{},
            paymentSuccess:null
        }
    },
    methods:{
        isPaymentSuccess() {
            const params = new URLSearchParams(window.location.search);
            if(params.get('success') === 'true'){
                this.paymentSuccess= true
            }
            else if(params.get('success') === 'false'){
                this.paymentSuccess= false
            }
        },
        closeSuccess(){
            this.$router.push('/admin/warranty-search')
            this.paymentSuccess=null
        },
        async SeachOrder(){
            try {
                if(this.textSearch!='' && this.textSearch.length>=24){
                    this.$refs.warrantyInput.style.borderColor='#ccc'
                    this.validInput=false
                    this.loading=true
                    this.order={}
                    const order =await orderService.getById(this.textSearch)
                    const order2 =await rentalService.getById(this.textSearch)
                    this.loading=false
                    if(Object.keys(order.data).length>0){
                        this.order=order.data
                        this.order.products =this.order.products.filter(product => product.typeProduct =='product')
                    }
                    else if(Object.keys(order2.data).length>0){
                        this.order=order.data
                    }
                }
                else{
                    this.validInput=true
                    this.$refs.warrantyInput.style.borderColor='red'

                }
            } catch (error) {
                console.log(error);
            }
            
        },
        clearTextInput(){
            this.textSearch=''
            this.$refs.warrantyInput.focus()
            this.validInput=false
            this.$refs.warrantyInput.style.borderColor='#ccc'
        },
        formatDate(date){
            return format.formatDateNoTime(date)
        },
        formatCurrency(price){
            return format.formatCurrency(price)
        },
        dealineDate(date, warrantyTime){
            const dealine = new Date(date)
            dealine.setMonth(dealine.getMonth()+warrantyTime)
            return dealine
        },
        warranty(product){
            const b=this.order
            b.products=b.products.filter(product2 => product2.idProduct === product.idProduct)
            this.info=b
            this.activeCreate=true
        }
    },
    mounted(){
        this.isPaymentSuccess()
    }
}
</script>

<style scoped>
    .search-warranty{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .search-box{
        width: 600px;
        height: 45px;
        display: flex;
    }
    .search-box .search-input {
        width: 80%;
        height: 100%;
        position: relative;
    }
     .position1{
        position: absolute;
        right: 10px;
        top:10px;
        font-size: 10px;
        width: 25px;
        height: 25px;
        color: red;
    }
    .search-content-warranty{
        width: 800px;
        min-height: 100px;
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 40px;
    }
    .search-content-warranty .title{
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .position1{
        font-size: 25px;
        cursor: pointer;
    }
    .search-input  input{
        width: 100%;
        height: 100%;
        outline: none;
        padding-left: 10px;
        border: 1px solid #ccc;
    }
    .search-box button{
        border: 1px solid #ccc;
        background: transparent;
        margin-left: 10px;
        padding: 0 10px;
        transition: all linear 0.2s;
        font-weight: 600;
    }
    .search-box button:hover{
        background: #6A9C89;
        color: #fff;
        border-color: #fff;
    }
    .scroll-address{
        display: flex;
        flex-direction: column;
    }
    .scroll-address span{
        display: block;
        margin-top: 5px;
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