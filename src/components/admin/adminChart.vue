<template>
    <div class="chart">
        <button class="btn btn-warning px-2 me-2" @click="exportPDF">InPDF</button>
        <button class="btn btn-success px-2 " @click="exportToExcel">Excel</button>
        <canvas ref="chart" class="myChart1"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { jsPDF } from "jspdf"
import unidecode from 'unidecode';
import exportToExcel from '@/utils/exportToExcel';
export default {
    props: {
        dynamicLabels: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        data2: {
            type: Array,
        },
        label1:String,
        label2:String,
        year:Number,
        month:Number,
        typeStatistical:String,
        chartType:String,
        color:String,
        name:String
    },
    data() {
        return {
            chart: null,
            btnChange: true,
        };
    },
    watch: {
        data: {
            handler() {
                this.updateChart();
            },
            deep: true,
        },
        data2: {
            handler() {
                this.updateChart();
            },
            deep: true,
        },
        dynamicLabels: {
            handler() {
                this.updateChart();
            },
            deep: true,
        },
        label1:{
            handler() {
                this.updateChart();
            },
            deep: true,
        },
        label2:{
            handler() {
                this.updateChart();
            },
            deep: true,
        }
    },
    methods: {
        renderChart() {
            const ctx = this.$refs.chart.getContext('2d');
            this.chart = new Chart(ctx, {
                type: this.chartType,
                data: {
                    labels: this.dynamicLabels,
                     datasets: this.data2?.length >0 ? 
                     [
                        {
                            label: this.label1, // doanh thu
                            data: this.data,
                            borderWidth: 1,
                            backgroundColor : this.color
                        },
                        {
                            label: this.label2, // chi phí
                            data: this.data2,
                            borderWidth: 1,
                            backgroundColor : '#87C4FF'
                        }
                    ] : 
                    [
                        {
                            label: 'Doanh thu',
                            data: this.data,
                            borderWidth: 1,
                            backgroundColor : this.color
                        }, 
                    ],
                },
                options: {
                    layout: {
                        paddingBottom: 10,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
        async updateChart() {
            if (Object.keys(this.chart).length>0) {
                console.log('thien thanh');
                 await this.chart.destroy();
                 this.renderChart();
            }
        },
        exportPDF(e) {
            const parent= e.target.parentElement
            const canvas1 = parent.querySelector('.myChart1');
            const pdf = new jsPDF();
            const image1 = canvas1.toDataURL("image/png", 1.0);
            if(this.typeStatistical=='month'){
                pdf.text(`BIEU DO DOANH THU ${unidecode(this.name).toUpperCase()} THANG ${this.month} NAM ${this.year}`, 40, 10)
            }
            else{
                pdf.text(`BIEU DO DOANH THU ${unidecode(this.name).toUpperCase()} NAM ${this.year}`, 50, 20)
            }
            pdf.addImage(image1, 'JPEG', 15, 30, 180, 100);
            pdf.save('chart.pdf');
        },
        exportToExcel() {
            const dataConvert=[]
            const title={}
            if(this.typeStatistical =='month'){
                this.data.forEach((item, index)=>{
                    title['Ngày '+(index+1)+' '+'Tháng ' + this.month]=item
                })
            }
            else{
                this.data.forEach((item, index)=>{
                    title['Tháng '+(index+1)+''+'Năm ' + this.year]=item
                })
            }
            dataConvert.push({...title})
            exportToExcel(dataConvert, 'Bieudo');
        },
    },
    mounted() {
        this.renderChart();
    },
};
</script>

<style>
.chart {
    height: 600px;
}
</style>
