<template>
  <div id="echarts">
    <!--    <div>{{ $t("1D_div_1") }}</div>-->
    <div class="select-row">
      <div v-for="(item,index) in selectList" :key="index"
           :class="{'active': activeKey === item.value}" @click="loadData(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div id="myChart"></div>
  </div>
</template>
<script type="text/javascript">
import {getCoinPrice} from "@/common/home";
import {formatPrice} from "@/utils/price";

export default {
  name: 'Echarts',
  data() {
    return {
      xData: [],
      yData: [],
      selectList: [
        {
          name: '1D',
          value: '1d'
        },
        {
          name: '1M',
          value: '1m'
        },
        {
          name: '3M',
          value: '3m'
        },
        {
          name: '1Y',
          value: '1y'
        },
        {
          name: '5Y',
          value: '5y'
        },
        {
          name: 'ALL',
          value: 'all'
        }
      ],
      activeKey: '1m',
      coinId: 10
    }
  },
  methods: {
    echartsInit() {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 根据数据点的位置调整 tooltip 的位置
            const x = point[0] > size.viewSize[0] / 2 ? point[0] - 100 : point[0] + 100;
            const y = point[1] > size.viewSize[1] / 2 ? point[1] - 50 : point[1] + 50;
            return [x, y];
          }
        },
        grid: {
          right: "5%",
          top: "5%",
          left: "10%",
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData,
        },
        yAxis: {
          type: 'value',
          position: 'left',
          // axisLine: {
          //   show: true, // 显示轴线
          //   lineStyle: {
          //     color: '#rgba(128, 251, 241, 1)' // 设置轴线的颜色
          //   }
          // },
          splitLine: {
            lineStyle: {
              type: 'dashed' // 这里可以是 'dashed' 或 'dotted'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
            showBottom: false
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            lineStyle: {
              color: '#479e85' // 可以是十六进制颜色码、RGB、RGBA、HSL、HSLA 或颜色名称
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(2, 160, 131, 0)'
                },
                {
                  offset: 1,
                  color: 'rgba(2, 160, 131, 1)'
                }
              ])
            },
            data: this.yData
          }
        ]
      })
    },
    async loadData(val) {
      this.activeKey = val && val.value
      this.xData = []
      this.yData = []
      try {
        const res = await this.$axios.get(getCoinPrice, {params: {coinId: this.coinId, period: this.activeKey}})
        const market = res.data.data.market
        market.forEach(item => {
          this.xData.push(item[0])
          this.yData.push(formatPrice(item[1]))
        })
        this.echartsInit()
      } catch (e) {
        this.$toast.error('获取数据失败')
      }
    },
    reload(coinId) {
      this.coinId = coinId
      this.loadData({value: '1m'})
    }
  }
}
</script>
<style scoped lang="less">
#myChart {
  width: 340px;
  height: 300px;
  margin: 0 auto;
}

.select-row {
  box-sizing: inherit;
  padding-left: 31px;

  div {
    display: inline-block;
    width: 30px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
  }

  div.active {
    background-color: #0056b3;
  }
}
</style>
