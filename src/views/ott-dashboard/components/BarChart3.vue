<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '125px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['Below 25', '25-35','35-45','More than 45']
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
        }],
         yAxis: {
          type: 'category',
          data: ['Age']
        },
        series: [{
          name: 'Below 25',
          type: 'bar',
           stack: 'total',
          data: [9],
          animationDuration
        }, {
          name: '25-35',
          type: 'bar',
           stack: 'total',
          data: [31],
          animationDuration
        }, {
          name: '35-45',
          type: 'bar',
           stack: 'total',
          data: [54],
          animationDuration
        }, {
          name: 'More than 45',
          type: 'bar',
           stack: 'total',
          data: [6],
          animationDuration
        }]
      })
    }
  }
}
</script>
