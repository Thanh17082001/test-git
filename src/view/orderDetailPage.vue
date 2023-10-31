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
                <span><i class="fa-solid fa-xmark"></i></span>
            </div>
            <h3 class="">Thanh toán không thành công</h3>
        </div>
    </div>
    
    <div class="order-detail mb-5 container">
        <h3 class=" text-uppercase text-primary mt-2">Chi tiết đơn hàng</h3>
        <!-- trạng thái đơn hàng -->
        <div class="d-flex">
            <router-link to="/order-history" class="back-history">
                <i class="fa-solid fa-chevron-left"></i> <span>Trở lại</span>
            </router-link>
        </div>
        <hr>
            <!-- trạng thái mua -->
        <div class="status mt-1" v-if="typeOrder =='Buy'">
            <h4 class="mt-2 mb-4 text-uppecase">Trạng thái</h4>
            <div class="status-progress" v-if="order.status ==='Hủy đơn'">
                <div class="status-progress-color" style="--left:0%; --colorB:red"></div>
                <div class="progress-item" style="--left:8% ">
                    <span style="--border-color:red">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:43% ">
                    <span style="--border-color:red">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:80%">
                    <span style="--border-color:red">3</span>
                    <span>Đã giao hàng</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Đang xử lý'">
                <div class="status-progress-color" style="--left:83%; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:8% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:43% ">
                    <span style="--border-color:blue">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:80%">
                    <span style="--border-color:blue">3</span>
                    <span>Đã giao hàng</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Đang vận chuyển'">
                <div class="status-progress-color" style="--left:48%; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:8% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:43% ">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:80%">
                    <span style="--border-color:blue">3</span>
                    <span>Đã giao hàng</span>
                </div>
            </div>
            <div class="status-progress" v-if="order.status ==='Đã giao hàng'">
                <div class="status-progress-color" style="--left:0%; --colorB:#11e911"></div>
                <div class="progress-item" style="--left:8% ">
                    <span style="--border-color:#11e911">1</span>
                    <span>Đang xử lý</span>
                </div>
                <div class="progress-item" style="--left:43% ">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang vận chuyển</span>
                </div>
                <div class="progress-item" style="--left:80%">
                    <span style="--border-color:#11e911">3</span>
                    <span>Đã giao hàng</span>
                </div>
            </div>
        </div>
            <!-- trạng thái thuê -->
            <div class="status mt-1" v-if="typeOrder =='Rental'">
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
            </div>
        <hr>
        <!-- Chi tiết đơn hàng -->
        <div class="row text-start">
            <h4 class="col-lg-6">Thông tin khách hàng</h4>
            <h4 class="col-lg-6">Thông tin Đơn hàng</h4>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="row text-start">
                    <div class="col-lg-4"> <strong>Tên:</strong> </div>
                    <div class="col-lg-6"><span>{{ order.nameCustomer }}</span></div>
                    <div class="col-lg-4"><strong>Địa chỉ:</strong></div>
                    <div class="col-lg-6"><span>{{ order.address }}</span></div>
                    <div class="col-lg-4"><strong>Số điện thoại:</strong></div>
                    <div class="col-lg-6"> <span>{{order.phone}}</span></div>
                    <div class="col-lg-4"><strong>Email:</strong></div>
                    <div class="col-lg-6"><span>{{ order.email }}</span></div>
                </div>  
            </div>
            <div class="col-lg-6">
                <div class="row text-start">
                    <div class="col-lg-4"> <strong>Mã số:</strong> </div>
                    <div class="col-lg-6"><span>{{order._id}}</span></div>
                    <div class="col-lg-4"><strong>Ngày mua:</strong></div>
                    <div class="col-lg-6"><span>{{order.createdAt}}</span></div>
                    <div class="col-lg-4" v-if="typeOrder=='Rental'"><strong>Ngày thanh toán tiếp theo:</strong></div>
                    <div class="col-lg-6" v-if="typeOrder=='Rental'"><span>{{ order.payInFull ? 'Đã thanh toán toàn bộ' : order.totalAmount>order.pricePayed ? order.datePay :'Thanh toán hoàn tất' }}</span></div>
                    <div class="col-lg-4"><strong>Hính thức thanh toán:</strong></div>
                    <div class="col-lg-6"> <span>{{order.paymentMethod}}</span></div>
                    <div class="col-lg-4"><strong>Hình thức mua hàng:</strong></div>
                    <div class="col-lg-6"><span>{{order.IsOnlineOrder ? "Online" : 'Mua tại cửa hàng'}}</span></div>
                </div>  
            </div>
        </div>
        <hr>
        <!-- danh sách sản phẩm -->
        <div>
            <h4 class="mt-4">Danh sách sản phẩm</h4>
        </div>
        <table class="table">
            <thead>
                <tr class="row text-start">
                    <th class="col-2 text-center">Ảnh</th>
                    <th class="col">Tên</th>
                    <th class="col-2">Giá</th>
                    <th class="col-1">Số lượng</th>
                    <th class="col-1">loại</th>
                </tr>
            </thead>
            <tbody>
                <tr class="row text-start" v-for="(product, index) in order.products" :key="index">
                    <td class="col-2 img text-center"><img :src="'http://localhost:3000' + product.productId.image" alt=""></td>
                    <td class="col">{{product.nameProduct}}</td>
                    <td class="col-2"> {{typeOrder=='Buy'? formatPrice(product.priceSale): formatPrice(product.priceRental) }}</td>
                    <td class="col-1">{{ product.quantity }}</td>
                    <td class="col-1" v-if="typeOrder =='Buy'">{{product.typeProduct=='product'? 'Máy': 'Phụ kiện'}}</td>
                    <td class="col-1" v-if="typeOrder =='Rental'">Máy</td>
                </tr>
            </tbody>
        </table>
        <!-- tiền  -->
        <div class="d-flex justify-content-end"> 
            <div class="total text-start"> 
                <h3 class="">Chi tiết thanh toán</h3>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <div class="total">
                <div class="row text-start">
                        <div class="col col-lg-6 mt-1"> <strong>Tổng tiền hàng:</strong> </div>
                        <div class="col col-lg-6 mt-1"><span>{{formatPrice(order.totalCostOfProducts)  }}</span></div>
                        <div class="col col-lg-6 mt-1" v-if="typeOrder =='Buy'"><strong>Phí vận chuyển</strong></div>
                        <div class="col col-lg-6 mt-1" v-if="typeOrder =='Buy'"><span>{{ formatPrice(order.transportFee) }}</span></div>
                        <div class="col col-lg-6 mt-1" v-if="typeOrder =='Rental'"><strong>Số tháng thuê:</strong></div>
                        <div class="col col-lg-6 mt-1" v-if="typeOrder =='Rental'"> <span>{{(order.quantityMonth)}}</span></div>
                        <div class="col col-lg-6 mt-1"><strong>Tổng cộng:</strong></div>
                        <div class="col col-lg-6 mt-1"> <span>{{formatPrice(order.totalAmount)}}</span></div>
                        <div class="col col-lg-6 mt-1"><strong>Số tiền đã thanh toán:</strong></div>
                        <div class="col col-lg-6 mt-1"><span>{{ formatPrice(order.pricePayed) }}</span></div>
                        <div class="col col-lg-6 mt-1" v-if="typeOrder =='Buy' && order.isPayment"><span class="text-success fs-5 fw-800 d-block">Đã thanh toán</span></div>
                        <span class="col-lg-6 mt-1"  v-if="typeOrder =='Rental'"><strong>Số tiền phải thanh toán</strong></span>
                        <span class="col-lg-6 mt-1" v-if="typeOrder =='Rental'">{{order.payInFull ?  formatPrice(order.totalAmount): order.totalAmount>order.pricePayed ? formatPrice( order.priceMonth) : 'Thanh toán hoàn tất'}}</span>
                </div>
                <div class="row mt-2" v-if="typeOrder =='Buy'">
                    <div class="col btn btn-info me-1" v-if="!order.isPayment && order.status == 'Đang xử lý'" @click="paymentByVnPay(order)">VNPay</div>
                    <div class="col btn btn-danger me-1" v-if="!order.isPayment && order.status == 'Đang xử lý'" @click="paymentByMOMO(order)">MOMO</div>
                </div>
                <div class="row mt-2" v-if="typeOrder =='Rental'">
                    <div class="col btn btn-info me-1" v-if="order.totalAmount> order.pricePayed && order.status !='Hủy đơn'" @click="paymentByVnPay(order)">VNPay</div>
                    <div class="col btn btn-danger me-1" v-if="order.totalAmount> order.pricePayed && order.status !='Hủy đơn'" @click="paymentByMOMO(order)">MOMO</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderService from '@/service/order.service';
import format from '@/utils/format';
import rentalService from '@/service/rental.service';
export default {
    data(){
        return{
            order:{},
            paymentSuccess:null,
            typeOrder:''
        }
    },
    props:{
        id:String
    },
    methods:{
        closeSuccess(){
            const params = new URLSearchParams(window.location.search);
            this.$router.push(`/order-detail/${this.order._id}?typeOrder=${params.get('typeOrder')}`)
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
        async getOrderById(){
            try {
                if(this.typeOrder ==='Buy'){
                    const response = await orderService.getById(this.id)
                    this.order = response.data
                    this.order.createdAt = format.formatDate(this.order.createdAt)
                }
                else{
                    const response = await rentalService.getById(this.id)
                    console.log(response);
                    this.order = response.data
                    this.order.createdAt = format.formatDate(this.order.createdAt)
                    this.order.datePay = format.formatDateNoTime(this.order.datePay)
                }
            } catch (error) {
                console.log(error);
            }
        },
        formatDate(date){
            return format.formatDate(date)
        },
        formatPrice(price){
            return format.formatCurrency(price)
        },
        async paymentByVnPay(order){
            try {
                const data ={
                    totalAmount: this.typeOrder=='Buy'? order.totalAmount : order.priceMonth,
                    orderId:order._id
                }
                if(order.status=='Hủy đơn'){
                    alert('Đơn hàng đã bị hủy')
                    return ;
                }
                if(this.typeOrder=='Buy'){
                    const payment = await orderService.paymentVNPAY(`order-detail/${order._id}/?typeOrder=${this.typeOrder}`,data)
                    window.location.href=payment.data
                }
                else{
                    const payment = await rentalService.paymentVNPAY(`order-detail/${order._id}/?typeOrder=${this.typeOrder}`,data)
                    window.location.href=payment.data
                }
            } catch (error) {
                console.log(error);
            }
        },
        async paymentByMOMO(order){
            try {
                const data ={
                    totalAmount:  this.typeOrder=='Buy' ? order.totalAmount : order.priceMonth,
                    orderId:order._id
                }
                console.log(data);
                if(order.status=='Hủy đơn'){
                    alert('Đơn hàng đã bị hủy')
                    return ;
                }
                if(this.typeOrder =='Buy'){
                    if(data.totalAmount > 50000000){
                        alert('Số tiền thanh toán với momo phải bé hơn 50 triệu')
                        return;
                    }
                    const payment = await orderService.paymentMOMO(`order-detail/${order._id}/?typeOrder=${this.typeOrder}`,data)
                    window.location.href=payment.data
                }
                else if(this.typeOrder =='Rental'){
                    const payment = await rentalService.paymentMOMO(`order-detail/${order._id}/?typeOrder=${this.typeOrder}`,data)
                    window.location.href=payment.data
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted(){
        this.typeOrder=this.$route.query.typeOrder;
        console.log(this.typeOrder);
        this.getOrderById()
        this.isPaymentSuccess()
    }
}
</script>

<style scoped>
.order-detail{
    min-height: 300px;
}
.status{
    height: 130px;
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
    width: 100%;
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
.back-history{
    width: 80px;
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    text-transform: uppercase;
}
.img img{
    width: 100px;
    aspect-ratio: 1/1;
}
.total{
    width: 350px;
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