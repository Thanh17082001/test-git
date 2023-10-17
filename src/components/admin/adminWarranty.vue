<template>
    <div class="admin-add-order">
        <h3>Đơn bảo hành</h3>
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
            <span @click="sort('Hoàn thành','status')" class="order-status-item me-3" style="--color:#54B435">Hoàn thành <span>{{ orders.filter(order => order.status =='Hoàn thành').length }}</span></span>
            
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
                            <p>Sản phẩm</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'nameProduct')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'nameProduct')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('nameProduct')"
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
                            <p>Bảo hành</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(false, 'warrantyExpires')">Còn hạn</li>
                                    <li @click="sort(true, 'warrantyExpires')">Hết hạn</li>
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
                    <td class="col-2">{{ order?.productId.name }}</td>
                    <td class="col">{{ order?.nameCustomer }}</td>
                    <td class="col">{{ order.status }}</td>
                    <td class="col">{{ order.warrantyExpires ? ' Hết hạn' : 'Còn hạn' }}</td>
                    <td class="col">{{ order.createdAt }}</td>
                    <td class="col text-center">
                        <span class="btn btn-outline-info" @click="openDetail(order._id)"><i class="fa-solid fa-circle-info"></i></span>
                        <span class="btn btn-outline-warning ms-3" @click="printPDF(order._id)"><i class="fa-solid fa-print"></i></span>
                    </td>
                </tr>
             </tbody>   
        </table>
        <!--order detail -->
        <adminWarrantyDetail v-if="activeDetail" :id="id" :paymentSuccess="paymentSuccess" @close-detail="closeDetail" @close-success="closeSuccess"></adminWarrantyDetail>
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
import warrantyService from '@/service/warranty.service';
import format from '@/utils/format';
import adminWarrantyDetail from './adminWarrantyDetail.vue';
import exportToExcel from '@/utils/exportToExcel';
import templateWarranty from '@/utils/templateWarranty'
import productService from '@/service/product.service';
import print from '@/utils/print'
import printTemplateWarranty from '@/utils/printTemplateWarranty'
export default {
    components:{
        adminWarrantyDetail
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
            id:'',
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
            this.$router.push('/admin/warranty')
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
            const length = await warrantyService.getAll()
            this.lengthPage = Math.ceil(length.data.length / this.pageSize);
            const response = await warrantyService.getAll(this.pageNumber,this.pageSize)
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
            else if(field =='nameProduct'){
                this.orders.sort((a, b) => {
                    if (type == 1) {
                        return a.productId['name'].localeCompare(b.productId['name']);
                    } else if (type == -1) {
                        return b.productId['name'].localeCompare(a.productId['name']);
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
                else if(name === 'nameProduct'){
                     abc = this.orders.filter((order) => {
                        return regex.test(order.productId['name']);
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
            const response = await warrantyService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.orders = [...response.data];
            this.orders.map(order =>{
                order.createdAt = format.formatDateNoTime(order.createdAt)
            })
        },
        exportToExcel() {
            const data=[]
            this.orders.map(order=>{
                data.push({
                    'Mã': order._id,
                    'Tên sản phẩm':order.productId.name,
                    'Tên khách hàng':order.nameCustomer,
                    'Số điện thoại':order.phone,
                    'Địa chỉ':order.address,
                    'Bảo hành': order.warrantyExpires ? 'Hết hạn' : 'Còn hạn',
                    'Trạng thái đơn hàng':order.status,
                    'Tổng giá':format.formatCurrency(order.totalAmount),
                    'Ngày tạo':order.createdAt
                })
            })
            exportToExcel(data, 'BaoHanh');
        },
        async exportToPDF(){
            const data= templateWarranty(this.orders)
            const response = await productService.exportPDF({ data: data });
            const blob = new Blob([ response.data], {
                type: 'application/pdf',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', 'BaoHanh.pdf');
            document.body.appendChild(link);
            link.click();
        },
        async printPDF(id){
            const response = await warrantyService.getById(id)
            const order= response.data
            
            order.createdAt = format.formatDate(order.createdAt)
                order.accessorys.forEach(product =>{
                    product.priceSale=format.formatCurrency(product.priceSale)
                })
                // console.log(order);
            const printTemplate= printTemplateWarranty(order)
            print(printTemplate,'Phiếu Bảo Hành' )
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
