<template>
    <div class="row text-start mb-3">
        <div class="col-lg-3">
            <div class="container-statictical">
                <h4>Tổng thu nhập</h4>
                <span class="detail">{{formatPrice(revenue)}}</span>
                <div class="icon">
                    <span class="icon-name">Xem tại biểu đồ bên dưới</span>
                    <span class="icon-icon" style="--color-icon:#A6CF98"><i class="fa-solid fa-dollar-sign"></i></span>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="container-statictical">
                <h4>Đơn hàng</h4>
                <span class="detail">{{totalOrder}}</span>
                <div class="icon">
                    <router-link to="/admin/order" class="">Xem chi tiết</router-link>
                    <span class="icon-icon" style="--color-icon:#87C4FF"><i class="fa-solid fa-bag-shopping"></i></span>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="container-statictical">
                <h4>khách hàng</h4>
                <span class="detail">{{customer}}</span>
                <div class="icon">
                    <span class="icon-name">Tổng tất cả khách hàng</span>
                    <span class="icon-icon" style="--color-icon:#FF9209"><i class="fa-solid fa-user"></i></span>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="container-statictical">
                <h4>Sản phẩm</h4>
                <span class="detail">{{products}}</span>
                <div class="icon">
                    <router-link to="/admin/product" class="">Xem chi tiết</router-link>
                    <span class="icon-icon" style="--color-icon:#87C4FF"><i class="fa-brands fa-product-hunt"></i></span>
                </div>
            </div>
        </div>
    </div>
    <hr>
  <div>
        <h3 v-if="typeStatistical == 'year'" class="text-uppercase">Doanh thu Năm {{year}}</h3>
        <h3 v-if="typeStatistical == 'month'" class="text-uppercase">Doanh thu Tháng {{month}} năm {{year}}</h3>
  </div>
   <div class="row">
       <div class="col-3 text-start">
            <span class="btn btn-info" v-if="typeStatistical == 'year'" @click="ChangeStatistical">Doanh thu Tháng </span>
            <span class="btn btn-info" v-if="typeStatistical=='month'" @click="ChangeStatistical">Doanh thu Năm</span>
            <div class="d-flex mt-3">
                <div class="" v-if="typeStatistical=='month'" >
                    <input type="month" name="" id="" v-model="dateValue" class="h-100">
                    <span class="btn btn-success ms-3" @click="statistical(typeStatistical)">Thống kê</span>
                </div>
                <div class="" v-if="typeStatistical=='year'" >
                    <select name="" id="" v-model="year" required class="h-100">
                        <option value="0">Năm</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <span class="btn btn-success ms-3" @click="statistical(typeStatistical)">Thống kê</span>
                </div>
            </div>
       </div>
   </div>
    <div class="">
        <h5 class="text-uppercase">Biểu đồ doanh thu và chi phí tổng</h5>
        <div class="d-flex"><span>Tổng doanh thu : {{formatPrice(revenue)}}</span></div>
        <div class="d-flex"><span>Tổng chi phí : {{formatPrice(expence)}}</span></div>
        <adminChart
            v-if="isRender"
            :data="data"
            :dynamic-labels="lables"
            :chart-type="'bar'"
            :year="year"
            :month="month"
            :typeStatistical="typeStatistical"
            :color="'#F55050'"
            :name="'Tổng'"
            :data2="data2"
        ></adminChart>
    </div>
    <div class="row mb-5">
        <div class="col-lg-12">
            <h5 class="text-uppercase mt-5">Biểu đổ doanh thu {{activeChart}}</h5>
            <div class="d-flex mb-2">
                <span class="fs-5 me-2">Lựa chọn: </span>
                <select v-model="activeChart" id="" class="px-3 py-1" @change="changeDataChart(activeChart)">
                    <option :value="item" v-for="item in typeChart" :key="item">{{item}}</option>
                </select>
            </div>
            <adminChart
                v-if="isRender"
                :data="dataChange"
                :dynamic-labels="lables"
                :chart-type="'bar'"
                :year="year"
                :month="month"
                :typeStatistical="typeStatistical"
                :color="'#89CFF3'"
                :name="activeChart"
            ></adminChart>
        </div>
    </div>
</template>

<script>
import adminChart from './adminChart.vue';
import statisticalServiece from '@/service/statistical.serviece';
import format from '@/utils/format';
import orderService from '@/service/order.service';
import rentalService from '@/service/rental.service';
import warrantyService from '@/service/warranty.service';
import taskService from '@/service/task.service';
import customerService from '@/service/customer.service';
import productService from '@/service/product.service';
export default {
    components: {
        adminChart,
    },
    data() {
        return {
            data: [],
            data2: [],
            lables: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
            inputMonth:new Date(),
            isRender: false,
            typeStatistical:'month',
            years:[],
            dateValue:'',
            resultOrder:[],
            resultRental:[],
            resultWarranty:[],
            resultTask:[], 
            typeChart:['Đặt hàng','Thuê máy','Bảo hành','Dịch vụ'],
            activeChart:'Đặt hàng',
            dataChange:[],
            revenue:0,
            expence:0,
            totalOrder:0,
            customer:0,
            products:0
        };
    },
    methods: {
        formatPrice(price){
            return format.formatCurrency(price)
        },
        async revenueYear() {
            try {
                this.isRender = false;
                const response = await statisticalServiece.revenueYear(this.year);
                const data2 = response.data.result;
                const data3 = response.data.resultOrder;
                const data4 = response.data.resultRental;
                const data5 = response.data.resultWarranty;
                const data6 = response.data.resulTtask;
                this.data=[]
                this.lables=[]
                this.resultOrder=[],
                this.resultRental=[],
                this.resultWarranty=[],
                this.resultTask=[]
                data2.forEach((item) => {
                    this.lables.push(`Tháng ${item.month}`);
                    this.data.push(item.totalRevenue);
                    this.revenue+=item.totalRevenue
                });
                data3.forEach((item) => {
                    this.resultOrder.push(item.totalRevenue);
                    this.dataChange.push(item.totalRevenue);
                });
                data4.forEach((item) => {
                    this.resultRental.push(item.totalRevenue);
                });
                data5.forEach((item) => {
                    this.resultWarranty.push(item.totalRevenue);
                });
                data6.forEach((item) => {
                    this.resultTask.push(item.totalRevenue);
                });
                await this.expenceYear()
                this.isRender = true;
            } catch (error) {
                console.log(error);
            }
        },
        async expenceYear() {
            try {
                const response = await statisticalServiece.expenseYear(this.year);
                const data3 = response.data;
                this.data2=[]
                data3.forEach((item) => {
                    this.data2.push(item.totalRevenue);
                    this.expence+=item.totalRevenue
                });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async revenueMonth() {
            try {
                const response = await statisticalServiece.revenuemonth(this.month,this.year);
                const data2 = response.data.result;
                const data3 = response.data.resultOrder;
                const data4 = response.data.resultRental;
                const data5 = response.data.resultWarranty;
                const data6 = response.data.resultTask;
                this.data=[]
                this.lables=[]
                this.resultOrder=[],
                this.resultRental=[],
                this.resultWarranty=[],
                this.resultTask=[]
                data2.forEach((item) => {
                    this.lables.push(`Ngày ${item.day}`);
                    this.data.push(item.totalRevenue);
                    this.revenue+=item.totalRevenue
                });
                data3.forEach((item) => {
                    this.resultOrder.push(item.totalRevenue);
                    this.dataChange.push(item.totalRevenue);
                });
                data4.forEach((item) => {
                    this.resultRental.push(item.totalRevenue);
                });
                data5.forEach((item) => {
                    this.resultWarranty.push(item.totalRevenue);
                });
                data6.forEach((item) => {
                    this.resultTask.push(item.totalRevenue);
                });
            } catch (error) {
                console.log(error);
            }
        },
        async expenceMonth() {
            try {
                this.isRender=false
                const response = await statisticalServiece.expensemonth(this.month,this.year);
                const data3 = response.data;
                this.data2=[]
                data3.forEach((item) => {
                    this.data2.push(item.totalRevenue);
                    this.expence+=item.totalRevenue
                });
                await this.revenueMonth()
                this.isRender=true
            } catch (error) {
                console.log(error);
            }
        },
        async ChangeStatistical(){
            this.revenue=0
            this.expence=0
            this.isRender=false
            const date = new Date()
            this.month=date.getMonth()+1
            this.year=date.getFullYear()
            if(this.typeStatistical=='month'){
                this.revenue=0
                this.expence=0
                await this.revenueYear()
                this.typeStatistical='year'
            }
            else{
                this.revenue=0
                this.expence=0
                await this.expenceMonth()
                this.typeStatistical='month'
            }
            // await this.expenceMonth()
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        async statistical(type){
            if(type=='month'){
                const date = new Date(this.dateValue)
                this.revenue=0
                this.expence=0
                this.month=date.getMonth()+1
                this.year=date.getFullYear()
                this.isRender=false
                await this.expenceMonth()
            }
            else if( type =='year'){
                this.isRender=false
                this.revenue=0
                this.expence=0
                await this.revenueYear()
            }
        },
        changeDataChart(){
            if(this.activeChart ==='Đặt hàng'){
                this.dataChange=this.resultOrder
            }
            else if(this.activeChart ==='Thuê máy'){
                this.dataChange=this.resultRental
            }
            else if(this.activeChart ==='Bảo hành'){
                this.dataChange=this.resultWarranty
            }
            else if(this.activeChart ==='Dịch vụ'){
                this.dataChange=this.resultTask
            }
        },
        async orderTotal(){
            try {
                const order = await orderService.getAll()
                const rental = await rentalService.getAll()
                const warranty = await warrantyService.getAll()
                const task = await taskService.getAll()
               this.totalOrder = order.data.length + rental.data.length + warranty.data.length + task.data.length
            } catch (error) {
                console.log(error);
            }
        },
        async customerTotal(){
            try {
                const customer = await customerService.getAll()
                this.customer = customer.data.length
            } catch (error) {
                console.log(error);
            }
        },
        async productsTotal(){
            try {
                const products = await productService.getProducts()
                this.products = products.data.length
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.orderTotal();
        this.customerTotal()
        this.productsTotal()
        this.expenceMonth()
        this.getYears()
    },
};
</script>

<style scoped>
.container-statictical{
    min-height: 115px;
    background: #EEF5FF;
    padding: 10px 15px;
    border-radius: 5px;
}
.container-statictical h4{
    text-transform:  uppercase;
    color: #878a99;
}
.container-statictical .detail{
    color: #111;
    font-size: 30px;
    font-weight: 600;
    display: block;
}
.container-statictical .icon{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container-statictical .icon-name{
    cursor: default;
    font-style: italic;
}
.container-statictical .icon-icon{
    display: block;
    padding: 10px 15px;
    background:var(--color-icon);
    border-radius: 5px;
    color: #fff;
}
.icon-icon i{
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 5px 7px;
}
</style>
