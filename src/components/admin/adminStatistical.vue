<template>
    <h3>Biểu đồ</h3>
   <div class="row">
       <div class="col-3 text-start">
            <span class="btn btn-info" v-if="typeStatistical == 'year'" @click="ChangeStatistical">Doanh thu Tháng {{new Date().getMonth()+1}}</span>
            <span class="btn btn-info" v-if="typeStatistical=='month'" @click="ChangeStatistical">Doanh thu Năm {{new Date().getFullYear()}}</span>
       </div>
       <div class="col-9 row">
        <!-- <div class="col-10">
            <input type="month" v-model="inputMonth">
            <span class="btn btn-primary">Lọc</span>
        </div> -->
       </div>
   </div>
    <div class="">
        <adminChart
            v-if="isRender"
            :data="data"
            :chartType="typeChart"
            :dynamic-labels="lables"
            :chart-type="'bar'"
        ></adminChart>
    </div>
   <div>
        <h5 class="fs-3" v-if="typeStatistical=='month'">Doanh thu theo Tháng</h5>
        <h5 class="fs-3" v-if="typeStatistical=='year'">Doanh thu theo Năm</h5>
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
            typeChart: 'bar',
            typeStatistical:'month'
        };
    },
    methods: {
        async revenueYear() {
            try {
                const response = await statisticalServiece.revenueYear(this.year);
                const data2 = response.data;
                this.data=[]
                this.lables=[]
                data2.forEach((item) => {
                    this.lables.push(`Tháng ${item.month}`);
                    this.data.push(item.totalRevenue);
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
                const data2 = response.data;
                this.data=[]
                this.lables=[]
                data2.forEach((item) => {
                    this.lables.push(`Ngày ${item.day}`);
                    this.data.push(item.totalRevenue);
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
       
    },
    mounted() {
        this.revenueMonth();
    },
};
</script>

<style></style>
