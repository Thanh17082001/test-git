<template>
    
  <div class="overlay">
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
                    <span><i class="fa-solid fa-xmark"></i></span>
                </div>
                <h3 class="">Thanh toán không thành công</h3>
            </div>
        </div>
    <div class="payment-status">
        <div class="d-flex justify-content-end">
            <i @click="closeDetail" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
        </div>
        <h4>Chi tiết bảo hành</h4>

        <div class="row">
            <div class="col-lg-3">
                <div class="status-info">
                    <h5><i class="fa-solid fa-gear"></i> Thông tin đơn hàng</h5>
                    <hr>
                    <span class="mb-2"><strong class="me-2">Mã:</strong>{{ order._id }}</span>
                    <span><strong class="me-2">Ngày tạo:</strong> {{ order.createdAt }}</span>
                </div>
            </div>
            <div class="col-lg-3" >
                <div class="status-info text-start">
                    <h5><i class="fa-solid fa-credit-card"></i>Thông tin bảo hành</h5>
                    <hr>
                    <div class="scroll-address">
                        <span class=""><strong class="me-2">Sản phẩm bảo hành:</strong>{{ order.productId?.name}}</span>
                        <span class=""><strong class="me-2">Thời hạn bảo hành:</strong>{{ order.warrantyExpires?'Hết hạn':'Còn hạn' }}</span>
                        <span class=""><strong class="me-2" v-if="!order.warrantyExpires">Hạn cuối bảo hành ngày:</strong>{{order.Datedealine  }}</span>
                        <span class="" v-if="order.warrantyExpires"><strong class="me-2">Trạng thái thanh toán:</strong>{{ order.isPayment?'Đã thanh toán':'Chưa thanh toán' }}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="status-info text-start">
                    <h5><i class="fa-solid fa-truck"></i> Khách hàng</h5>
                    <hr>
                    <div class="scroll-address">
                        <span><strong class="me-2">Tên:</strong>{{ order.nameCustomer }}</span>
                        <span><strong class="me-2">Số điện thoại:</strong>{{ order.phone }}</span>
                        <span><strong class="me-2">Địa chỉ:</strong>{{ order.address }}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="status-info">
                    <h5><i class="fa-solid fa-note-sticky"></i> Ghi chú</h5>
                    <hr>
                    <textarea placeholder="Ghi chú đơn hàng" v-model="order.note"></textarea>
                    <button class="btn-note" @click="update(order._id, {note:order.note})"><i class="fa-solid fa-notes-medical"></i> Cập nhật</button>
                </div>
            </div>
        </div>

        <div class="status mt-1">
            <h5 class="mt-2 mb-4">Trạng thái đơn hàng</h5>
            <div class="status-progress" v-if="order.status ==='Đang xử lý'">
                <div class="status-progress-color" style="--left:70%; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:15% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
               
                <div class="progress-item" style="--left:70%">
                    <span style="--border-color:blue">2</span>
                    <span>Hoàn thành</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Hoàn thành'">
                <div class="status-progress-color" style="--left:0%; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:15% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:70%">
                    <span style="--border-color:#11e911">2</span>
                    <span>Hoàn thành</span>
                </div>
            </div>
            <div class="btn btn-warning mt-5 mb-1" v-if="order.status ==='Đang xử lý'" @click="update(order._id,{status:'Hoàn thành'})">Cập nhật</div>
            <button disabled class="btn btn-success mt-5 mb-1" v-else-if="order.status=='Hoàn thành'">Đã hoàn thành bảo hành</button>
        </div>

        <div class="row mt-1">
            <div class="col-lg-8">
                <div class="order-detail">
                    <h5>Danh sách sản phẩm</h5>
                    <table class="w-100 order-detail-td">
                        <thead>
                            <tr class="row gx-0">
                                <th class="col-1 text-center">STT</th>
                                <th class="col-4">Tên</th>
                                <th class="col-3">Giá</th>
                                <th class="col-2">Số lượng</th>
                                <th class="col-2">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody class="order-scroll">
                            <tr class="row gx-0" v-for="(product, index) in order.accessorys" :key="index">
                                <td class="col-1 text-center">{{ index+1 }}</td>
                                <td class="col-4">{{ product.nameProduct }}</td>
                                <td class="col-3">{{ formatPrice(product.priceSale )}}</td>
                                <td class="col-2">{{ product.quantity }}</td>
                                <td class="col-2">{{formatPrice(product.quantity * product.priceSale) }}</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="order-total">
                    <h5>Chi tiết thanh toán</h5>
                    <div class="row text-left">
                        <span class="col-lg-6 mb-2"><strong>Tổng cộng</strong></span>
                        <span class="col-lg-6 mb-2">{{ formatPrice(order.totalAmount) }}</span>
                        <span class="col-lg-6 mb-2"><strong>Số tiền phải thanh toán</strong></span>
                        <span class="col-lg-6 mb-2">{{ formatPrice(order.warrantyExpires ? order.totalAmount :order.pricePayed) }}</span>
                        <span class="col-lg-6 mb-2"><strong>Số tiền đã thanh toán</strong></span>
                        <span class="col-lg-6 mb-2">{{ formatPrice(order.pricePayed) }}</span>
                        <span class="col-lg-6 mb-2 text-success" v-if="order.pricePayed>0"><strong>Đã thanh toán</strong></span>
                        <span class="col-lg-12 mb-2 text-danger" v-if="!order.warrantyExpires"><strong>Sản phẩm còn trong thời gian bảo hành</strong></span>
                        <span class="col-lg-12 mb-2 text-danger" v-else><strong>Sản phẩm hết thời gian bảo hành</strong></span>
                    </div>
                    <div class="btn btn-info me-1" v-if="order.warrantyExpires && order.pricePayed<=0" @click="paymentByVnPay(order)">VNPay</div>
                    <div class="btn btn-danger me-1" v-if="order.warrantyExpires && order.pricePayed<=0" @click="paymentByMOMO(order)">MOMO</div>
                    <div class="btn btn-success" v-if="order.warrantyExpires && order.pricePayed<=0" @click="paymentByCOD(order)">COD</div>
                    <div class="btn btn-warning ms-1" @click="printPDF">In phiếu </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import warrantyService from '@/service/warranty.service'
import format from '@/utils/format'
import print from '@/utils/print'
import printTemplateWarranty from '@/utils/printTemplateWarranty'
export default {
    data(){
        return {
            order:{},
        }
    },
    props:['id', 'paymentSuccess'],
    emits:['closeDetail', 'openDetail','closeSuccess'],
    methods:{
        closeDetail(){
            this.$emit('closeDetail')
        },
        closeSuccess(){
            this.$emit('closeSuccess')
        },
        
        async getOrderById(){
            try {
                const response = await warrantyService.getById(this.id)
                this.order=response.data
                this.order.createdAt=format.formatDateNoTime(this.order.createdAt)
                this.order.Datedealine=format.formatDateNoTime(this.order.Datedealine)
                console.log(this.order);
            } catch (error) {
                console.log(error);
            }
        },
         formatPrice(price){
            return format.formatCurrency(price)
        },
        async update(id,data){
            try {
                const response =await warrantyService.update(id,data)
                if(response.data.status){
                    alert("Thay đổi thành công")
                    this.getOrderById()
                }
            } catch (error) {
                console.log(error);
            }
        },
       async paymentByVnPay(order){
            try {
                const data ={
                    totalAmount: order.totalAmount,
                    orderId:order._id
                }
                if(order.status=='Hủy đơn'){
                    alert('Đơn hàng đã bị hủy')
                    return ;
                }
                const payment = await warrantyService.paymentVNPAY('admin/warranty',data)
                window.location.href=payment.data
            } catch (error) {
                console.log(error);
            }
        },
        async paymentByMOMO(order){
            try {
                const data ={
                    totalAmount: order.totalAmount,
                    orderId:order._id
                }
                if(order.status=='Hủy đơn'){
                    alert('Đơn hàng đã bị hủy')
                    return ;
                }
                const payment = await warrantyService.paymentMOMO('admin/warranty',data)
                window.location.href=payment.data
            } catch (error) {
                console.log(error);
            }
        },
        async paymentByCOD(order){
            try {
                if(confirm(`Số tiền phải trả là :${order.totalAmount}`)){
                    const data ={
                        totalAmount:order.totalAmount,
                        paymentMethod:'Thanh toán tiền mặt',
                        pricePayed:order.totalAmount,
                        isPayment:true,
                        warrantyExpires:true
                    }
                    const response =await warrantyService.update(order._id,data)
                    if(response.data.status){
                        this.getOrderById()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async printPDF(){
            const printTemplate= printTemplateWarranty( this.order)
            print(printTemplate,'Hóa đơn' )
        },
        
    },
    mounted(){
        this.getOrderById()
    }
}
</script>

<style scoped>
thead{
        background: #0E8388;
    }
    tr{
        height: 50px;
        width: 100%;
    }
    th,td {
        border: 1px solid  #ccc;
        height: 100%;
        padding-left: 10px;
    }
    th{
        color: #fff;
    }
    th:nth-child(1){
        text-align: center;
    }
    .status{
        border: 1px solid #ccc;
    }
    .payment-status{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-39.5%,-50%);
        width: 80%;
        height: 97%;
        background: #fff;
        padding: 10px;
    }

    .order-detail-td td, .order-detail-td th{
        display: flex;
        align-items: center;
    }
    .payment-status i{
        cursor: pointer;
    }

    .status-info{
        width: 100%;
        border: 1px solid #ccc;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding:10px;
    }
    .status-info hr{
        width: 100%;
        margin: 5px 0;
    }
    .status-progress{
        width: 80%;
        height: 10px;
        background: blue;
        margin: auto;
        position: relative;
    }

    .progress-item{
        display: flex;
        flex-direction: column;
        width: 120px;
        align-items: center;
        position: absolute;
        top: -13px;
        left:var(--left);
    }

    .progress-item span:nth-child(1){
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border: 3px solid var(--border-color);
        border-radius: 50%;
        background: #fff;
    }
    .status-progress-color{
        position: absolute;
        top:0;
        left: 0;
        right: var(--left);
        bottom: 0;
        background: var(--colorB);

    }

    .order-detail{
        padding: 10px;
        border: 1px solid #ccc;
        height: 257px;
    }
    .order-total{
        border: 1px solid #ccc;
        height: 257px;
        padding: 10px;
    }
    .order-total span{
        text-align: left;
    }
    .status-info textarea{
        height: 60px;
        padding-left: 10px;
        outline: none;
        width: 100%;
    }
    .status-info h5{
        margin: 0;
    }
    .btn-note{
        outline: none;
        border: none;
        background: #0E8388;
        padding: 3px 10px;
        margin-top: 3px;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
    }
    .order-scroll{
        display: block;
        max-height:150px;
        overflow-y: scroll;
    }
    .order-scroll::-webkit-scrollbar{
        width: 0;
    }
    .scroll-address{
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }
    .scroll-address::-webkit-scrollbar{
        width: 0;
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
    z-index: 1000;
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