<template>
    <h3 v-if="typeStatistical == 'year'" class="text-uppercase">Doanh thu Năm {{year}}</h3>
    <h3 v-if="typeStatistical == 'month'" class="text-uppercase">Doanh thu Tháng {{month}} năm {{year}}</h3>
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
        <h5 class="text-uppercase">Biểu đồ doanh thu tổng</h5>
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
        ></adminChart>
    </div>
    <div class="row mt-5">
        <div class="col-lg-12">
            <h5 class="text-uppercase">Biểu đổ doanh thu {{activeChart}}</h5>
            <div class="d-flex mb-2"> 
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

export default {
    components: {
        adminChart,
    },
    data() {
        return {
            data: [],
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
            dataChange:[]
        };
    },
    methods: {
        async revenueYear() {
            try {
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
                this.isRender = true;
            } catch (error) {
                console.log(error);
            }
        },
        // async expenceYear() {
        //     try {
        //         const response = await statisticalServiece.expenseYear(this.year);
        //         const data3 = response.data;
        //         this.data2=[]
        //         data3.forEach((item) => {
        //             this.data2.push(item.totalRevenue);
        //         });
        //         this.isRender = true;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
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
                this.isRender=true
            } catch (error) {
                console.log(error);
            }
        },
        // async expenceMonth() {
        //     try {
        //         const response = await statisticalServiece.expensemonth(this.month,this.year);
        //         const data3 = response.data;
        //         this.data2=[]
        //         data3.forEach((item) => {
        //             this.data2.push(item.totalRevenue);
        //         });
        //         this.isRender=true
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        async ChangeStatistical(){
            this.isRender=false
            const date = new Date()
            this.month=date.getMonth()+1
            this.year=date.getFullYear()
            if(this.typeStatistical=='month'){
                await this.revenueYear()
                this.typeStatistical='year'
            }
            else{
                await this.revenueMonth()
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
                this.month=date.getMonth()+1
                this.year=date.getFullYear()
                this.isRender=false
                await this.revenueMonth()
            }
            else if( type =='year'){
                this.isRender=false
                await this.revenueYear()
            }
        },
        changeDataChart(activeChart){
            if(activeChart ==='Đặt hàng'){
                this.dataChange=this.resultOrder
            }
            else if(activeChart ==='Thuê máy'){
                this.dataChange=this.resultRental
            }
            else if(activeChart ==='Bảo hành'){
                this.dataChange=this.resultWarranty
            }
            else if(activeChart ==='Dịch vụ'){
                this.dataChange=this.resultTask
            }
        }
    },
    mounted() {
        this.revenueMonth();
        this.getYears()
    },
};
</script>

<style></style>
