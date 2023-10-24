<template>
  <div class="d-flex mt-2">
    <span class="btn btn-warning text-start" v-if="btnChange" @click="changeType">Đổi dạng biểu đồ</span>
  </div>
    <div class="chart">
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
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
        
    },
    data() {
        return {
            chart: null,
            chartType: 'bar',
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
        chartType: {
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
                            backgroundColor : '#F55050'
                        }
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
            if (this.chart) {
                this.chart.destroy();
                this.renderChart();
            }
        },
        changeType() {
            if (this.chartType == 'bar') {
                this.chartType = 'line';
            } else {
                this.chartType = 'bar';
            }
            this.btnChange = false;
            setTimeout(() => {
                this.btnChange = true;
            }, 600);
        },
    },
    mounted() {
        this.renderChart();
    },
};
</script>

<style>
.chart {
    height: 480px;
}
</style>
