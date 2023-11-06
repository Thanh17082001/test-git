<template>
    <div class="chart">
        <button class="btn btn-warning px-2 d-flex" @click="exportPDF">InPDF</button>
        <canvas ref="chart" class="myChart1"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { jsPDF } from "jspdf"
import unidecode from 'unidecode';
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
        dynamicLabels: {
            handler() {
                this.updateChart();
            },
            deep: true,
        },
    },
    methods: {
        renderChart() {
            const ctx = this.$refs.chart.getContext('2d');
            this.chart = new Chart(ctx, {
                type: this.chartType,
                data: {
                    labels: this.dynamicLabels,
                    datasets: [
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
        updateChart() {
            if (Object.keys(this.chart).length>0) {
                this.chart.destroy();
                this.renderChart();
            }
        },
        exportPDF(e) {
            const parent= e.target.parentElement
            const canvas1 = parent.querySelector('.myChart1');
            const pdf = new jsPDF();
            const image1 = canvas1.toDataURL("image/png", 1.0);
            if(this.typeStatistical=='month'){
                pdf.text(`BIEU DO DOANH THU ${unidecode(this.name).toUpperCase()} THANG ${this.month} NAM ${this.year}`, 20, 0,)
            }
            else{
                pdf.text(`BIEU DO DOANH THU ${unidecode(this.name).toUpperCase()} NAM ${this.year}`, 50, 20)
            }
            pdf.addImage(image1, 'JPEG', 15, 30, 180, 100);
            pdf.save('chart.pdf');
        }
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
