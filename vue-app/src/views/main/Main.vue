<template>
    <div>
        <el-card style="height: 100%; width: 100%;box-shadow: none;">
            <div
                ref="bar"
                style="height: 480px"
            ></div>
        </el-card>
        <el-card style="height: 100%; width: 100%;box-shadow: none;">
            <div
                ref="line"
                style="height: 480px"
            ></div>
        </el-card>
    </div>
</template>

<script setup>
import { getProfile } from "../../api/api"
import * as echarts from 'echarts';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';

const { proxy } = getCurrentInstance();
const tableData = ref([]);//资金信息
//柱状图配置
const optionBar = reactive({
    title: { text: '收入-支出-BarChart' },
    legend: {},
    tooltip: {},
    xAxis: { type: 'category', },
    yAxis: {},
    series: [{
        type: 'bar',
        animationDelay: function () {
            return 800;
        }
    }, {
        type: 'bar',
        animationDelay: function () {
            return 800;
        }
    }, {
        type: 'bar',
        animationDelay: function () {
            return 800;
        }
    }],
    color: ["#2ec7c9", "#ffb980", "#8d98b3"],
    dataset: {
        dimensions: ['product', '收入', '支出', '现金'],
        source: []
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
});
//折线图配置
const optionLine = reactive({
    color: ["#2ec7c9", "#ffb980", "#8d98b3"],
    title: {
        text: '收入-支出-LineChart'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['收入', '支出', '现金']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
})
onMounted(() => {
    getProfileMsg();
})

//获取资金数据
const getProfileMsg = async () => {
    let res = await getProfile();
    tableData.value = res.data;
    //1.柱状图
    let count = 1;
    tableData.value.forEach(item => {
        optionBar.dataset.source.push({
            'product': count++,
            '收入': parseInt(item.income),
            '支出': parseInt(item.expend),
            '现金': parseInt(item.income) - parseInt(item.expend)
        })
    })
    let barChart = echarts.init(proxy.$refs["bar"]);
    barChart.setOption(optionBar);

    //2.折线图
    let num = 1;
    optionLine.series = [
        {
            name: '收入',
            type: 'line',
            stack: 'Total',
            data: tableData.value.map(item => parseInt(item.income)),
            animationDelay: function () {
                return 800;
            }
        },
        {
            name: '支出',
            type: 'line',
            stack: 'Total',
            data: tableData.value.map(item => parseInt(item.expend)),
            animationDelay: function () {
                return 800;
            }
        },
        {
            name: '现金',
            type: 'line',
            stack: 'Total',
            data: tableData.value.map(item => parseInt(item.income) - parseInt(item.expend)),
            animationDelay: function () {
                return 800;
            }
        }
    ]
    tableData.value.forEach(item => {
        optionLine.xAxis.data.push(num++)
    })
    let lineChart = echarts.init(proxy.$refs["line"]);
    lineChart.setOption(optionLine)

}
</script>