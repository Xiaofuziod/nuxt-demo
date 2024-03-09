<template>
  <div id="echarts">
    <div id="myChart"></div>
  </div>
</template>
<script type="text/javascript">
import {analysisCoin} from "@/common/home";

export default {
  name: 'Echarts',
  data() {
    return {}
  },
  methods: {
    echartsInit() {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      })
    },
    loadData () {
      this.$axios.get(analysisCoin,{params: {id: 100}}).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.echartsInit()
    this.loadData()
  }
}
</script>
<style scoped lang="less">
#myChart {
  width: 340px;
  height: 300px;
  margin: 0 auto;
}
</style>
