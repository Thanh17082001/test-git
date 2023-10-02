<template>
    <div class="admin-add-order">
        <h3>Các đơn hàng</h3>
        <div class="d-flex justify-content-end align-items-center my-3">
            <div class="input-admin-filter">
                <form class="filter-admin-date" @submit.prevent.stop="filterDate">
                    <select name="" id="" v-model="dateFilter.day" required>
                        <option value="0">Ngày</option>
                        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                    <select name="" id="" v-model="dateFilter.month" required>
                        <option value="0">Tháng</option>
                        <option v-for="month in 12" :value="month" :key="month">Tháng {{ month }}</option>
                    </select>
                    <select name="" id="" v-model="dateFilter.year" required>
                        <option value="0">Năm</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select name="" id="" v-model="dateFilter.field" required>
                        <option value="">Chọn kiểu</option>
                        <option value="0">Tất cả</option>
                        <option value="createdAt">Ngày tạo</option>
                        <option value="updatedAt">Ngày sửa</option>
                    </select>
                    <button>Lọc</button>
                </form>
                <div class="admin-export">
                    <div class="btn btn-success" @click="exportToExcel">
                        <i class="fa-solid fa-file-excel"></i> Excel
                    </div>
                    <div class="btn btn-warning" @click="exportToPDF"><i class="fa-solid fa-file-pdf"></i> Pdf</div>
                </div>
            </div>
        </div>

        <div class="order-status d-flex mb-3">
            <span @click="sort('Đang xử lý','status')" class="order-status-item me-3" style="--color:#1e90ff">Đang xử lý <span>{{ orders.filter(order => order.status =='Đang xử lý').length }}</span></span>
            <span @click="sort('Đang vận chuyển','status')" class="order-status-item me-3" style="--color:red">Đang vận chuyển <span>{{ orders.filter(order => order.status =='Đang vận chuyển').length }}</span></span>
            <span @click="sort('Đã giao hàng','status')" class="order-status-item me-3" style="--color:green">Đã giao hàng <span>{{ orders.filter(order => order.status =='Đã giao hàng').length }}</span></span>
            <span @click="sort('Đang sử dụng','status')" class="order-status-item me-3" style="--color:#E9B824">Đang sử dụng <span>{{ orders.filter(order => order.status =='Đang sử dụng').length }}</span></span>
            <span @click="sort('Dừng thuê','status')" class="order-status-item me-3" style="--color:#61677A">Dừng thuê <span>{{ orders.filter(order => order.status =='Dừng thuê').length }}</span></span>

        </div>
        <div class="isSort" :class="{ 'isSort-active': isSort }">
            <span @click="offSort">Đang lọc</span>
        </div>
        <table class="w-100">
             <thead>
                <tr>
                    <th class="col-1">STT</th>
                    <th class="col-2">
                        <div class="admin-table-title">
                            <p>Mã số đơn hàng</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('_id')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Tên khách hàng</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'fullName')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'fullName')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('fullName')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Trạng thái</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('status')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Hình thức</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(false, 'IsOnlineOrder')">Tại cửa hàng</li>
                                    <li @click="sort(true, 'IsOnlineOrder')">Online</li>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Cách thức <br>thanh toán</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort('COD', 'paymentMethod')">COD</li>
                                    <li @click="sort('Online', 'paymentMethod')">Online</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('paymentMethod')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Thanh toán</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(false, 'isPayment')">Chưa thanh toán</li>
                                    <li @click="sort(true, 'isPayment')">Đã thanh toán  </li>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">Ngày tạo</th>
                    <th class="col text-center">Hành động</th>
                </tr>
             </thead>
             <tbody>
                <tr v-for="(order,index) in orders" :key="order._id">
                    <td class="col-1 text-center">{{ index+1 }}</td>
                    <td class="col-2">{{ order._id }}</td>
                    <td class="col">{{ order.customerId?.fullName }}</td>
                    <td class="col">{{ order.status }}</td>
                    <td class="col">{{ order.IsOnlineOrder ? ' Trực tuyến' : 'Tại của hàng' }}</td>
                    <td class="col">{{ order.paymentMethod }}</td>
                    <td class="col text-center p-0 fs-4 text-success" v-if="order.isPayment "><i class="fa-solid fa-check"></i></td>
                    <td class="col text-center p-0 fs-4 text-danger" v-else><i class="fa-solid fa-xmark"></i></td>
                    <td class="col">{{ order.createdAt }}</td>
                    <td class="col text-center">
                        <span class="btn btn-outline-info" @click="openDetail(order._id)"><i class="fa-solid fa-circle-info"></i></span>
                        <span class="btn btn-outline-warning ms-3" @click="printPDF(order._id)"><i class="fa-solid fa-print"></i></span>
                    </td>
                </tr>
             </tbody>   
        </table>
        <!--order detail -->
        <adminRentalDetail v-if="activeDetail" :id="id" :paymentSuccess="paymentSuccess" @close-detail="closeDetail" @close-success="closeSuccess"></adminRentalDetail>
        <!-- pagination -->
        <div class="product-pagination mt-5">
            <ul class="pagination">
                <li>
                    <span @click="previousPage"><i class="fa-solid fa-angles-left"></i></span>
                </li>
                <li><span>...</span></li>
                <li v-for="index in lengthPage" :key="index">
                    <span :class="{ active_page: activePage === index }" @click="handlePage(index)">{{ index }}</span>
                </li>

                <li><span>...</span></li>
                <li>
                    <span @click="nextPage"><i class="fa-solid fa-angles-right"></i></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import format from '@/utils/format';
import adminRentalDetail from './adminRentalDetail.vue';
import exportToExcel from '@/utils/exportToExcel';
import templateRental from '@/utils/templateRental'
import productService from '@/service/product.service';
import print from '@/utils/print'
import printTemlateRental from '@/utils/printTemplateRental'
import rentalService from '@/service/rental.service'
export default {
    components:{
        adminRentalDetail
    },
    data(){
        return{
            orders:[],
            pageNumber:1,
            pageSize:8,
            lengthPage:1,
            activePage:1,
            years:[],
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            filterInput:'',
            isSort:false,
            activeDetail:false,
            paymentSuccess:null,
            id:''
        }
    },
    methods:{
        isPaymentSuccess() {
            const params = new URLSearchParams(window.location.search);
            if(params.get('success') === 'true'){
                this.id=params.get('id')
                this.activeDetail=true
                this.paymentSuccess= true
            }
            else if(params.get('success') === 'false'){
                this.id=params.get('id')
                this.activeDetail=true
                this.paymentSuccess= false
            }
        },
        closeSuccess(){
            this.$router.push('/admin/rental')
            this.paymentSuccess=null
        },
        openDetail(id){
            this.activeDetail=true
            this.id=id
        },
        closeDetail(){
            this.activeDetail=false
            this.getAll()
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getAll();
            this.isSort = false;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getAll();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAll();
            }
        },
        async getAll(){
            const length = await rentalService.getAll()
            this.lengthPage = Math.ceil(length.data.length / this.pageSize);
            const response = await rentalService.getAll(this.pageNumber,this.pageSize)
            this.orders=[
                ...response.data
            ]
            this.orders.map(order =>{
                order.createdAt = format.formatDateNoTime(order.createdAt)
            })
        },
        offSort() {
            this.isSort = false;
            this.getAll();
            this.filterInput = '';
            this.dateFilter= {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            }
        },
        async sort(type, field) {
            this.type = type;
            this.field = field;
            this.isSort = true;
            if (field === 'fullName') {
                this.orders.sort((a, b) => {
                    if (type == 1) {
                        return a.customerId[field].localeCompare(b.customerId[field]);
                    } else if (type == -1) {
                        return b.customerId[field].localeCompare(a.customerId[field]);
                    }
                });
            }
            else{
                await this.getAll();
                this.orders = this.orders.filter((order) => order[field] == type);
            }
            
        },
        handleFitter(name) {
            if(this.idTimeOut==null){
                this.isSort=false
            }
            clearTimeout(this.idTimeOut);
            this.getAll();
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 500);
        },
        filter(name) {
            if(this.filterInput !=''){
                this.isSort = true;
                const regex = new RegExp(this.filterInput.trim(), 'i');
                let abc=[]
                if(name === 'fullName'){
                     abc = this.orders.filter((order) => {
                        return regex.test(order.customerId[name]);
                    });
                }
                else{
                    abc = this.orders.filter((order) => {
                        return regex.test(order[name]);
                    });
                }
                this.orders = abc;
            }
            else{
                this.isSort = false;
                this.getAll()
            }
        },
        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await rentalService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.orders = [...response.data];
            console.log(this.orders)
            this.orders.map(order =>{
                order.createdAt = format.formatDateNoTime(order.createdAt)
            })
        },
        exportToExcel() {
            const data=[]
            this.orders.map(order=>{
                data.push({
                    'Mã': order._id,
                    'Tên khách hàng':order.customerId.fullName,
                    'Số điện thoại':order.customerId.phone,
                    'Địa chỉ':order.customerId.address,
                    'Hình thức mua hàng': order.IsOnlineOrder ? 'Online' : 'Tại cửa hàng',
                    'Trạng thái đơn hàng':order.status,
                    'Hình thức thanh toán':order.paymentMethod,
                    'Trạng thái thanh toán':order.isPayment ? 'Đã thanh toán' :'Chưa thanh toán',
                    'Tổng giá':format.formatCurrency(order.totalAmount),
                    'Ngày tạo':order.createdAt
                })
            })
            exportToExcel(data, 'donthue');
        },
        async exportToPDF(){
            const data= templateRental(this.orders)
            const response = await productService.exportPDF({ data: data });
            const blob = new Blob([ response.data], {
                type: 'application/pdf',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', 'DonThue.pdf');
            document.body.appendChild(link);
            link.click();
        },
        async printPDF(id){
            const response = await rentalService.getById(id)
            const order= response.data
            order.createdAt = format.formatDate(order.createdAt)
                order.totalCostOfProducts= format.formatCurrency( order.totalCostOfProducts)
                order.transportFee= format.formatCurrency( order.transportFee)
                order.products.forEach(product =>{
                    product.priceRental=format.formatCurrency(product.priceRental)
                })
            const printTemplate= printTemlateRental(order)
            print(printTemplate,'Phiếu đơn hàng' )
        },
        
    },
    mounted(){
        this.getAll()
        this.getYears()
        this.isPaymentSuccess()
    }
};
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
    .order-status-item{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        border: 1px solid var(--color);
        border-radius: 5px;
        color: var(--color);
        font-weight: 600;
        z-index: 0;
        cursor: pointer;
        
    }
    .order-status-item span{
        position: absolute;
        top: -14px;
        right: -12px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        z-index: 1000;
        border-radius: 50%;
        border: 3px solid var(--color);
        background: #fff;

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
        border: 3px solid blue;
        border-radius: 50%;
        background: #fff;
    }
    .status-progress-color{
        position: absolute;
        top:0;
        left: 0;
        right: var(--left);
        bottom: 0;
        background: rgb(17, 233, 17);

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
    

</style>
