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
        <h4>Chi tiết đơn hàng</h4>

        <div class="row">
            <div class="col-lg-3">
                <div class="status-info">
                    <h5><i class="fa-solid fa-gear"></i> Thông tin đơn hàng</h5>
                    <hr>
                    <span class="mb-1"><strong class="me-2">Mã:</strong>{{ order._id }}</span>
                    <span class="mb-1"><strong class="me-2">Ngày thuê:</strong> {{ order.createdAt }}</span>
                    <span class="text-start" v-if="order.totalAmount > order.pricePayed"><strong class="me-2" >Ngày thanh toán tiếp:</strong> {{ order.payInFull ? 'Đã thanh toán toàn bộ' : order.datePay }}</span>
                    <span class="text-start"  v-else><strong class="me-2">Ngày thanh toán tiếp:</strong> {{ order.payInFull ? 'Đã thanh toán toàn bộ' : 'Thanh toán hoàn tất' }}</span>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="status-info text-start">
                    <h5><i class="fa-solid fa-credit-card"></i> Thanh toán</h5>
                    <hr>
                    <span class="mb-2"><strong class="me-2">Hình thức thanh toán:</strong>{{ order.paymentMethod }}</span>
                    <span><strong class="me-2">Trạng thái thanh toán:</strong>{{ order.isPayment  }}</span>
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
                        <span><strong class="me-2">Email:</strong>{{ order.email }}</span>
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
            <div class="status-progress" v-if="order.status ==='Hủy đơn'">
                <div class="status-progress-color"  style="--left:0%; --colorB:red"></div>
                <div class="progress-item" style="--left:2% ">
                    <span style="--border-color:red">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:23% ">
                    <span style="--border-color:red">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:43%">
                    <span style="--border-color:red">3</span>
                    <span>Đã giao hàng</span>
                </div>
                <div class="progress-item" style="--left:63%">
                    <span style="--border-color:red">4</span>
                    <span>Đang sử dụng</span>
                </div>
                <div class="progress-item" style="--left:85%">
                    <span style="--border-color:red">5</span>
                    <span>Dừng thuê</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Đang xử lý'">
                <div class="status-progress-color" style="--left:89% ; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:2% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:23% ">
                    <span style="--border-color:blue">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:43%">
                    <span style="--border-color:blue">3</span>
                    <span>Đã giao hàng</span>
                </div>
                <div class="progress-item" style="--left:63%">
                    <span style="--border-color:blue">4</span>
                    <span>Đang sử dụng</span>
                </div>
                <div class="progress-item" style="--left:85%">
                    <span style="--border-color:blue">5</span>
                    <span>Dừng thuê</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Đang vận chuyển'">
                <div class="status-progress-color" style="--left:68% ; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:2% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:23% ">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:43%">
                    <span style="--border-color:blue">3</span>
                    <span>Đã giao hàng</span>
                </div>
                <div class="progress-item" style="--left:63%">
                    <span style="--border-color:blue">4</span>
                    <span>Đang sử dụng</span>
                </div>
                <div class="progress-item" style="--left:85%">
                    <span style="--border-color:blue">5</span>
                    <span>Dừng thuê</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Đã giao hàng'">
                <div class="status-progress-color" style="--left:48% ; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:2% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:23% ">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:43%">
                    <span style="--border-color:#11e911">3</span>
                    <span>Đã giao hàng</span>
                </div>
                <div class="progress-item" style="--left:63%">
                    <span style="--border-color:blue">4</span>
                    <span>Đang sử dụng</span>
                </div>
                <div class="progress-item" style="--left:85%">
                    <span style="--border-color:blue">5</span>
                    <span>Dừng thuê</span>
                </div>
            </div>

            <div class="status-progress" v-if="order.status ==='Đang sử dụng'">
                <div class="status-progress-color" style="--left:27% ; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:2% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:23% ">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:43%">
                    <span style="--border-color:#11e911">3</span>
                    <span>Đã giao hàng</span>
                </div>
                <div class="progress-item" style="--left:63%">
                    <span style="--border-color:#11e911">4</span>
                    <span>Đang sử dụng</span>
                </div>
                <div class="progress-item" style="--left:85%">
                    <span style="--border-color: blue">5</span>
                    <span>Dừng thuê</span>
                </div>
            </div>

            <div class="status-progress" v-if="order.status ==='Dừng thuê'">
                <div class="status-progress-color" style="--left:0% ; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:2% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:23% ">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:43%">
                    <span style="--border-color:#11e911">3</span>
                    <span>Đã giao hàng</span>
                </div>
                <div class="progress-item" style="--left:63%">
                    <span style="--border-color:#11e911">4</span>
                    <span>Đang sử dụng</span>
                </div>
                <div class="progress-item" style="--left:85%">
                    <span style="--border-color:#11e911">5</span>
                    <span>Dừng thuê</span>
                </div>
            </div>

            <div class="btn btn-danger mt-5 me-2 mb-1" v-if="order.status ==='Đang xử lý' && order.isPayment==false" @click="update(order._id,{status:'Hủy đơn'})">Hủy đơn hàng</div>
            <div class="btn btn-warning mt-5 mb-1" v-if="order.status ==='Đang xử lý'" @click="update(order._id,{status:'Đang vận chuyển'})">Cập nhật</div>
            <div class="btn btn-warning mt-5 mb-1" v-else-if="order.status ==='Đang vận chuyển'" @click="update(order._id,{status:'Đã giao hàng'})">Cập nhật</div>
            <div class="btn btn-warning mt-5 mb-1" v-else-if="order.status ==='Đã giao hàng'" @click="update(order._id,{status:'Đang sử dụng'})">Cập nhật</div>
            <div class="btn btn-warning mt-5 mb-1" v-else-if="order.status ==='Đang sử dụng'" @click="update(order._id,{status:'Dừng thuê',products:order.products})">Cập nhật</div>
            <button disabled class="btn btn-success mt-5 mb-1" v-else-if="order.status=='Dừng thuê'">Hoàn thành</button>
            <button disabled class="btn btn-danger mt-5 mb-1" v-else-if="order.status=='Hủy đơn'">Đơn hàng bị hủy</button>
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
                                <th class="col-3">Giá thuê</th>
                                <th class="col-2">Số lượng</th>
                                <th class="col-2">Loại</th>
                            </tr>
                        </thead>
                        <tbody class="order-scroll">
                            <tr class="row gx-0" v-for="(product, index) in order.products" :key="index">
                                <td class="col-1 text-center">{{ index+1 }}</td>
                                <td class="col-4">{{ product.nameProduct }}</td>
                                <td class="col-3">{{ product.priceRental }}</td>
                                <td class="col-2">{{ product.quantity }}</td>
                                <td class="col-2">{{ 'Máy' }}</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="order-total">
                    <h5>Chi tiết thanh toán</h5>
                    <div class="row text-left">
                        <span class="col-lg-6 mb-2"><strong>Tổng tiền hàng:</strong></span>
                        <span class="col-lg-6 mb-2">{{ order.totalCostOfProducts }}</span>
                        <span class="col-lg-6 mb-2"><strong>Số tháng thuê</strong></span>
                        <span class="col-lg-6 mb-2">{{order.quantityMonth}}</span>
                        <span class="col-lg-6 mb-2"><strong>Tổng cộng</strong></span>
                        <span class="col-lg-6 mb-2">{{ formatPrice(order.totalAmount) }}</span>
                        <span class="col-lg-6 mb-2"><strong>Số tiền đã thanh toán</strong></span>
                        <span class="col-lg-6 mb-2">{{formatPrice(order.pricePayed ) }}</span>
                        <span class="col-lg-6 mb-2" ><strong>Số tiền phải thanh toán</strong></span>
                        <span class="col-lg-6 mb-2">{{order.payInFull ? formatPrice(order.totalAmount): formatPrice( order.priceMonth)}}</span>
                       
                        
                    </div>
                    <div class="btn btn-info me-1" v-if="order.totalAmount> order.pricePayed && order.status !='Hủy đơn'" @click="paymentByVnPay(order)">VNPay</div>
                    <div class="btn btn-danger me-1" v-if="order.totalAmount> order.pricePayed && order.status !='Hủy đơn'" @click="paymentByMOMO(order)">MOMO</div>
                    <div class="btn btn-success" v-if="order.totalAmount> order.pricePayed && order.status !='Hủy đơn'" @click="paymentByCOD(order)">COD</div>
                    <div class="btn btn-warning ms-1" @click="printPDF">In phiếu </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import format from '@/utils/format'
import print from '@/utils/print'
import printTemlateRental from '@/utils/printTemplateRental'
import rentalService from '@/service/rental.service'
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
                const response = await rentalService.getById(this.id)
                this.order=response.data
                this.order.createdAt = format.formatDate(this.order.createdAt)
                this.order.datePay = format.formatDateNoTime(this.order.datePay)
                this.order.totalCostOfProducts= format.formatCurrency( this.order.totalCostOfProducts)
                this.order.VAT= format.formatCurrency( this.order.VAT)
                this.order.products.forEach(product =>{
                    product.priceRental=format.formatCurrency(product.priceRental)
                })
            } catch (error) {
                console.log(error);
            }
        },
         formatPrice(price){
            return format.formatCurrency(price)
        },
        async update(id,data){
            try {
                const response =await rentalService.update(id,data)
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
                    totalAmount: order.payInFull? order.totalAmount: order.priceMonth,
                    orderId:order._id
                }
                if(order.status=='Hủy đơn'){
                    alert('Đơn hàng đã bị hủy')
                    return ;
                }
                const payment = await rentalService.paymentVNPAY('admin/rental',data)
                window.location.href=payment.data
            } catch (error) {
                console.log(error);
            }
        },
        async paymentByMOMO(order){
            try {
                const data ={
                    totalAmount: order.payInFull? order.totalAmount: order.priceMonth,
                    orderId:order._id
                }
                if(order.status=='Hủy đơn'){
                    alert('Đơn hàng đã bị hủy')
                    return ;
                }
                if(data.totalAmount > 50000000){
                        alert('Số tiền thanh toán với momo phải bé hơn 50 triệu')
                        return;
                    }
                const payment = await rentalService.paymentMOMO('admin/rental',data)
                window.location.href=payment.data
            } catch (error) {
                console.log(error);
            }
        },
        async paymentByCOD(order){
            try {
                if(confirm(`Thanh toán tiền mặt với số tiền ${order.payInFull? this.formatPrice(order.totalAmount) :this.formatPrice(order.priceMonth)}`)){
                   const response = await rentalService.updateByCod(order._id)
                   if(response.data.status){
                    alert('Thanh toán thành công')
                    this.getOrderById()
                   }
                   else{
                        alert('Thanh toán thất bại')
                   }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async printPDF(){
            
            const printTemplate= printTemlateRental(this.order)
            print(printTemplate,'Phiếu đơn hàng thuê' )
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