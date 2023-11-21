<template>
    <div class="overlay">
        <form class="warranty-create" @submit.prevent.stop="addWarranty">
            <div class="d-flex justify-content-end">
                <i @click="closeCreate" class="fa-solid fa-xmark fs-2 text-danger me-1"></i>
            </div>
            <h5 class="fs-3 py-1 text-uppercase">Tạo Hóa đơn bảo hành</h5>
            <span class="text-danger fst-italic" v-if="isDealine">Bạn đã hết thơi gian bảo hành</span>
            <span class="text-primary fst-italic" v-else>Bạn còn thơi gian bảo hành</span>
            <div class="row gx-0">
                <div class="ms-3 mb-3 text-start">
                    <strong class="text-start">Khách hàng</strong>
                    <br />
                    <span class="text-start">
                        <strong>Tên: </strong>{{ info.nameCustomer }} <strong class="ms-4">Địa chỉ: </strong
                        >{{ info.address }} <strong class="ms-4">SĐT: </strong>{{ info.phone }}
                    </span>
                </div>
                <hr />
                <h5 class="text-uppercase text-warning">Thông tin sản phẩm bảo hành</h5>
                <table class="w-100">
                    <thead>
                        <tr class="row gx-0">
                            <th class="col">Tên sản phẩm</th>
                            <th class="col">Ngày mua</th>
                            <th class="col-1">Số tháng</th>
                            <th class="col">Ngày hết hạn bảo hành</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="row gx-0" v-for="(product) in info.products" :key="product._id">
                            <td class="col">{{ product.nameProduct }}</td>
                            <td class="col">{{ formatDate(info.createdAt) }}</td>
                            <td class="col-1">{{ product.warrantyTime }}</td>
                            <td class="col">{{ formatDate(dealineDate(info.createdAt, product.warrantyTime)) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- danh sách phụ kiệm thay -->
            <div class="row gx-0">
                <div class="scroll2 col-lg-8" >
                    <h6 class="text-uppercase">Danh sách sản phẩm</h6>
                    <div class="scroll" :class="{'height-scroll':!isDealine}">
                        <div class="row" v-for="(item, index) in infoAccessorys" :key="index">
                            <div class="group col-lg-4">
                                <div class="d-flex mb-1">
                                    <label for="" class="mt-0">Danh sách hàng <span class="required">*</span></label>
                                </div>
                                <select
                                    v-model="item.accessoryId"
                                    class="form-select"
                                    @change="getproductById(item.accessoryId, index)"
                                    required
                                >
                                    <option value="" class="form-option">--- Chọn ---</option>
                                    <option v-for="product in accessorys" :value="product._id" :key="product._id">
                                        {{ product.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="spe-group col-lg-4">
                                <label for="" class="mt-0 mb-0">Giá bán</label>
                                <span class="price">Giá: {{ item.priceSale }}</span>
                            </div>
                            <div class="spe-group col-lg-4">
                                <label for="" class="mt-0 mb-0">Số lượng<span class="text-danger ms-2">*</span></label>
                                <input
                                    v-model="item.quantity"
                                    @keyup="(event) => checkQuantity(event, item)"
                                    required
                                    type="number"
                                    placeholder="Nhập số lượng hàng"
                                />
                                <span v-if="!!mesValid && idValid==item.accessoryId" class="text-danger">{{ mesValid }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row control">
                        <div class="d-flex justify-content-center align-items-center mt-1">
                            <div class="group me-3">
                                <span class="btn btn-outline-success" @click="pushRow">Thêm dòng</span>
                            </div>
                            <div class="group">
                                <span class="btn btn-outline-danger" @click="popRow">Bớt dòng</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 scroll2">
                    <div class="group col-lg-12">
                        <div class="w-100">
                            <div class="d-flex">
                                <label for="" class="mt-0"><strong>Ghi chú</strong></label>
                            </div>
                            <textarea class="note" v-model="note" placeholder="Ghi chú..."></textarea>
                        </div>
                    </div>
                    <div class="row mb-1 text-start mt-2">
                        <span class="col-6"><strong>Tổng tiền:</strong></span>
                        <span class="col-6">{{formatCurrency(totalAmount)  }}</span>
                    </div>
                    <div class="row mb-1 text-start">
                        <span class="col-6"><strong>Số tiền phải thanh toán:</strong></span>
                        <span class="col-6">{{formatCurrency(pricePayed)  }}</span>
                    </div>
                    <span class="mb-1 d-block text-start fst-italic text-warning" v-if="!isDealine"
                        >Còn trong thời gian bảo hành</span
                    >
                    <span class="mb-1 d-block text-start fst-italic text-danger" v-if="isDealine"
                        >Hết thời gian bảo hành</span
                    >
                </div>
            </div>
            <!-- hình thức thanh toán -->
            <div class="row">
                <div class="row mt-4" v-if="isDealine">
                    <div class="col-lg-4">
                        <label
                            for="payment"
                            :class="{ 'payment-active': isClassCod, 'payment-error': choosePayent }"
                            class="payment"
                            @click="paymentMeThod('COD')"
                        >
                            <img
                                src="https://s3-ap-southeast-1.amazonaws.com/pharmacity-ecm-asm-dev/payment-method/cash.webp"
                                alt=""
                            />
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
                        <label
                            for="payment"
                            :class="{ 'payment-active': isClassOnlVNPAY, 'payment-error': choosePayent }"
                            class="payment"
                            @click="paymentMeThod('VNPAY')"
                        >
                            <img
                                src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png"
                                alt=""
                            />
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
                        <label
                            for="payment"
                            :class="{ 'payment-active': isClassOnlMOMO, 'payment-error': choosePayent }"
                            class="payment"
                            @click="paymentMeThod('MOMO')"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
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
            </div>
            <button class="btn btn-success mt-2 px-5">Tạo</button>
        </form>
    </div>
</template>

<script>
import format from '@/utils/format';
import accessoryService from '@/service/accessory.service';
import warrantyService from '@/service/warranty.service';
export default {
    data() {
        return {
            infoAccessorys: [{ accessoryId: '' }],
            accessorys: [],
            isClassCod: false,
            isClassOnlMOMO: false,
            isClassOnlVNPAY: false,
            paymentMethod: null,
            note: '',
            Datedealine: null,
            choosePayent: false,
            isDealine: true,
            totalAmount: 0,
            pricePayed: 0,
            isSubmit:false,
            mesValid:'',
            idValid:'',
        };
    },
    props: ['info'],
    emits:['closeCreate'],
    methods: {
        formatDate(date) {
            return format.formatDateNoTime(date);
        },
        formatCurrency(price) {
            return format.formatCurrency(price);
        },
        dealineDate(date, warrantyTime) {
            this.Datedealine = new Date(date);
            // console.log(warrantyTime);
            this.Datedealine.setMonth(this.Datedealine.getMonth() + warrantyTime);
            return this.Datedealine;
        },
        pushRow() {
            this.infoAccessorys.push({
                accessoryId: '',
                priceSale: 0,
            });
        },
        popRow() {
            if (this.infoAccessorys.length <= 1) {
                alert('Dòng cuối');
            } else {
                this.infoAccessorys.pop();
            }
        },
        getproductById(id, index) {
            this.accessorys.map((product) => {
                if (product._id === id) {
                    this.infoAccessorys[index].priceSale = product.priceSale;
                    this.infoAccessorys[index].priceImport = product.priceImport;
                    this.infoAccessorys[index].nameProduct = product.name;
                    this.infoAccessorys[index].inputQuantity=product.inputQuantity
                } else {
                    return;
                }
            });
        },
        async getAllAccessory() {
            try {
                const response = await accessoryService.getAll();
                this.accessorys = response.data;
                this.accessorys= this.accessorys.filter(item=>item.inputQuantity>0)
            } catch (error) {
                console.log(error);
            }
        },
        async paymentMeThod(type) {
            this.choosePayent = false;
            if (type == 'COD') {
                this.isClassCod = !this.isClassCod;
                if (this.isClassCod) {
                    this.paymentMethod = 'COD';
                    this.isClassOnlVNPAY = false;
                    this.isClassOnlMOMO = false;
                } else {
                    this.paymentMethod = '';
                }
            } else if (type == 'VNPAY') {
                this.isClassOnlVNPAY = !this.isClassOnlVNPAY;
                if (this.isClassOnlVNPAY) {
                    this.paymentMethod = 'VNPAY';
                    this.isClassCod = false;
                    this.isClassOnlMOMO = false;
                } else {
                    this.paymentMethod = '';
                }
            } else if (type == 'MOMO') {
                this.isClassOnlMOMO = !this.isClassOnlMOMO;
                if (this.isClassOnlMOMO) {
                    this.paymentMethod = 'MOMO';
                    this.isClassCod = false;
                    this.isClassOnlVNPAY = false;
                } else {
                    this.paymentMethod = '';
                }
            }
        },
        async dealine2() {
            const today = new Date();
            const check = this.daysUntilDue(today, this.Datedealine);
            console.log(check);
            if (check <= 0) {
                this.isDealine = true;
            } else {
                this.isDealine = false;
            }
        },
        daysUntilDue(today, dueDate) {
            const todayDate = new Date(today);
            const dueDateObj = new Date(dueDate);
            const daysDifference = Math.ceil((dueDateObj - todayDate) / (1000 * 60 * 60 * 24));
            return daysDifference;
        },
        total() {
            this.totalAmount=0
            this.infoAccessorys.forEach(item =>{
                this.totalAmount+=item.priceSale*item.quantity || 0
            })
            if(!this.isDealine){
                this.pricePayed=0
            }
            else{
                this.pricePayed=this.totalAmount 
            }
        },
        async addWarranty() {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'))
                const data ={
                    createBy:user ? user.user._id : null,
                    customerId:this.info.customerId,
                    productId:this.info.products[0].productId,
                    address:this.info.address,
                    phone:this.info.phone,
                    nameCustomer:this.info.nameCustomer,
                    accessorys:this.infoAccessorys,
                    totalAmount:this.totalAmount,
                    Datedealine:this.Datedealine
                }

                if(this.isSubmit){
                    if(this.isDealine){
                        if(this.paymentMethod =='VNPAY'){
                            const response = await warrantyService.create(data)
                            const resutl = response.data.data
                            if(response.data.status){
                                const payment = await warrantyService.paymentVNPAY('admin/warranty-search',{totalAmount: resutl.totalAmount, orderId:resutl._id})
                                window.location.href=payment.data
                            }
                        }
                        else if(this.paymentMethod =='MOMO'){
                            const response = await warrantyService.create(data)
                            const resutl = response.data.data
                            if(response.data.status){
                                const payment = await warrantyService.paymentMOMO('admin/warranty-search',{totalAmount: resutl.totalAmount, orderId:resutl._id})
                                window.location.href=payment.data
                            }
                        }
                        else{
                            data.paymentMethod='Thanh toán tiền mặt',
                            data.isPayment=true
                            data.warrantyExpires=true
                            const response = await warrantyService.create(data)
                            if(response.data.status){
                                this.infoAccessorys=[{ accessoryId: '' }]
                                this.totalAmount=0
                                alert('Tạo thành công')
                            }   
                        }
                        // thanh toán theo phương thức
                    }
                    else{
                        //khong phí
                        const response = await warrantyService.create(data)
                        if(response.data.status){
                            this.infoAccessorys=[{ accessoryId: '' }]
                            this.totalAmount=0
                            alert('Tạo thành công')
                        }
                    }
                    this.isClassCod=false
                    this.isClassOnlMOMO=false
                    this.isClassOnlVNPAY=false
                }
            } catch (error) {
                console.log(error);
            }
        },
        checkQuantity(e, product) {
            this.total()
            if (e.target.value <= 0) {
                e.target.style.borderColor = 'red';
                this.isSubmit = false;
                this.totalAmount = 0;
                this.mesValid='Số lượng phải lớn hơn 0'
                this.idValid=product.accessoryId
            }
            else if(e.target.value > product.inputQuantity){
                e.target.style.borderColor = 'red';
                this.isSubmit = false;
                this.totalAmount = 0;
                this.mesValid='Số lượng trong kho không đủ'
                this.idValid=product.accessoryId
            }
            else {
                e.target.style.borderColor = '#0E8388';
                this.isSubmit = true;
                this.mesValid=''
                this.idValid=''
            }
        },
        closeCreate(){
            this.infoAccessorys=[{ accessoryId: '' }]
            this.totalAmount=0
            this.$emit('closeCreate')
        }
    },
    mounted() {
        this.getAllAccessory();
        this.dealine2();
    },
};
</script>

<style scoped>
.warranty-create {
    width: 1250px;
    min-height: 95%;
    background: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    padding: 10px;
}
.spe-group .price {
    display: flex;
    height: 45px;
    align-items: center;
    width: 100%;
    border: 1px solid #0e8388;
    border-radius: 5px;
    padding-left: 10px;
    background: #ccc;
}
.spe-group input {
    height: 45px;
    border-color: #0e8388;
}
.scroll {
    height: 130px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    overflow-x: hidden;
}
.height-scroll{
    height: 160px;
}
.scroll::-webkit-scrollbar {
    width: 0;
}
.control {
    height: 40px;
}
.scroll2 {
    min-height: 230px;
    border: 1px solid #ccc;
    margin: 10px 0px;
    padding: 20px;
}
.note {
    background-color: #fff;
    margin: 0;
    width: 100%;
    outline: none;
    padding: 10px;
    border-radius: 5px;
    height: 70px;
}
.payment {
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}
.payment-active {
    background: #f2f6fe;
    border-color: #0072bc;
}
.payment img {
    width: 40px;
    height: 40px;
}
.payment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
}
.payment-content span:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
}
.payment-checkbox span {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    display: block;
    border-radius: 50%;
    position: relative;
    background: #ccc;
}
.payment-checkbox span::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
}
.payment-active .payment-checkbox span {
    background: #0072bc;
}
.payment-error {
    border-color: red;
}
</style>
