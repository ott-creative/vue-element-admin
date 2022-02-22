<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">

      <el-col :xs="12" :sm="12" :lg="12">
          <el-row :gutter="24">
            <el-col :xs="12" :sm="12" :lg="24">
              <div class="chart-wrapper">
                <bar-chart-2 />
              </div>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :xs="12" :sm="12" :lg="24">
              <div class="chart-wrapper">
                <bar-chart-3 />
              </div>
            </el-col>
          </el-row>
        
      </el-col>

      <el-col :xs="12" :sm="12" :lg="12">
        <div class="chart-wrapper">
          <pie-chart-2 />
        </div>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import BarChart2 from './components/BarChart2'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import PieChart2 from './components/PieChart2'
import BarChart3 from './components/BarChart3'
import BarChart4 from './components/BarChart4'

const lineChartData = {
  members: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 100, 120, 161, 134, 105],
    actualData: [120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162]
  },
  transactions: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 200, 192, 120, 144, 160],
    actualData: [180, 160, 151, 106, 145, 150, 130, 180, 160, 151, 106, 145]
  },
  clearings: {
    expectedData: [80, 100, 121, 104, 105, 90, 100, 80, 100, 121, 104, 105],
    actualData: [120, 90, 100, 138, 142, 130, 130, 120, 90, 100, 138, 142]
  },
  refunds: {
    expectedData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    BarChart2,
    PieChart2,
    BarChart3,
    BarChart4
  },
  data() {
    return {
      lineChartData: lineChartData.members
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
      console.log('linechart data:', this.lineChartData, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
