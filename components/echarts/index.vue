<template>
  <div class="echart-box">
    <skeleton-loader v-if="loading" />
    <div :style="{opacity: loading?0:1}">
      <div class="coin-name">
        <img :src="coin.logo" v-if="coin.logo" class="coin-logo" :alt="coin.logo">
        <span class="name">{{ coin.name }}</span>
        <span class="coin-symbol">{{ coin.symbol }}</span>
      </div>
      <div class="coin-price-box"
           :class="{'coin-price-box-chat': from === 'chat'}"
           v-if="coin.currentPrice || coinPrice.price">
        <div class="coin-price">${{ formatPrice(coin.currentPrice || coinPrice.price) }}</div>
        <div class="coin-change"
             :class="{'positive': (coin.change || coinPrice.change) > 0, 'negative': (coin.change || coinPrice.change) < 0}">
          {{ (coin.change || coinPrice.change)?.toFixed(2) }}%
        </div>
      </div>
      <div class="select-row" v-if="from !== 'chat'">
        <div v-for="(item,index) in selectList" :key="index"
             :class="{'active': activeKey === item.value}" @click="loadData(item)"
        >
          {{ item.name }}
        </div>
      </div>

      <div
          ref="myChart"
          class="chat-content"
          :class="`chat-content-${from}`"
      ></div>
    </div>
  </div>
</template>
<script>
import {getCoinPrice} from "@/common/home";
import {formatPrice} from "@/utils/price";
import SkeletonLoader from "@/components/echarts/SkeletonLoader.vue";

export default {
  name: 'Echarts',
  components: {
    SkeletonLoader
  },
  props: {
    from: {
      type: String,
      default: 'report'
    },
    list: {
      type: Array,
      default: () => []
    },
    coinPrice: {
      type: Object,
      default: () => {
        return {
          price: 0,
          change: 0
        }
      }
    }
  },
  data() {
    return {
      xData: [],
      yData: [],
      coin: {},
      loading: false,
      adjustedLowestPrice: 0,
      adjustedHighestPrice: 0,
      selectList: [
        {
          name: '1D',
          value: '1d'
        },
        {
          name: '7D',
          value: '7d'
        },
        {
          name: '1M',
          value: '1m'
        },
        {
          name: '1Y',
          value: '1y'
        },
        {
          name: 'ALL',
          value: 'all'
        }
      ],
      activeKey: '1d',
      coinId: 10
    }
  },
  mounted() {
    if (this.from === 'chat' && this.list.length) {
      this.list.forEach(item => {
        this.xData.push(item[0])
        this.yData.push(formatPrice(item[1]))
      })
      this.initPrice()
      this.echartsInit()
      this.loading = false
    }
  },
  methods: {
    formatPrice,
    echartsInit() {
      // 找到容器
      let myChart = this.$echarts.init(this.$refs.myChart)

      let priceLength = this.adjustedHighestPrice.toString().length

      // 开始渲染
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 根据数据点的位置调整 tooltip 的位置
            const x = point[0] > size.viewSize[0] / 2 ? point[0] - 100 : point[0] + 100;
            const y = point[1] > size.viewSize[1] / 2 ? point[1] - 50 : point[1] + 50;
            return [x, y];
          },
          // 自定义提示框的内容格式器
          formatter: function (params) {
            let params0 = params[0]
            return '$' + params0.value + '<br>' + params0.name;
          },
          backgroundColor: 'rgba(38, 64, 64)',
          borderWidth: 0,
          textStyle: {
            color: '#FFF',
            fontSize: 12, // 字体大小
          }
        },
        grid: {
          right: "0%",
          top: "5%",
          left: `${priceLength * 1.35 + (this.from === 'chat' ? 7 : 11)}%`,
          bottom: "8%"
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData,
          axisLabel: {
            show: false // 只隐藏 X 轴的标签
          },
          axisTick: {
            show: false // 隐藏 X 轴的刻度
          },
        },
        yAxis: {
          type: 'value',
          position: 'left',
          min: this.adjustedLowestPrice, // 设置最小值为调整后的最低价
          max: this.adjustedHighestPrice, // 设置最大值为调整后的最高价
          interval: (this.adjustedHighestPrice - this.adjustedLowestPrice) / 5, // 设置间隔
          splitLine: {
            lineStyle: {
              type: 'dashed', // 这里可以是 'dashed' 或 'dotted'
              color: 'rgba(103, 229, 173, .1)'
            }
          },
          axisLabel: {
            show: true,
            fontsize: 8,
            formatter: function (value) {
              if (value > 10) {
                return parseInt(value)
              } else if (value > 0.1) {
                return value.toFixed(2)
              } else if (value >0) {
                return formatPrice(value, 1)
              } else {
                return 0
              }
            },
          }
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     start: 0,
        //     end: 100,
        //     showBottom: false,
        //     zoomOnMouseWheel: this.from !== 'chat'
        //   }
        // ],
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
      this.loading = true
      this.activeKey = val && val.value
      this.xData = []
      this.yData = []
      try {
        const res = await this.$axios.get(getCoinPrice, {params: {coinId: this.coinId, period: this.activeKey}})
        const market = res.data.data.market
        this.coin = {
          logo: res.data.data.logo,
          name: res.data.data.name,
          symbol: res.data.data.symbol,
          currentPrice: res.data.data.currentPrice,
          change: res.data.data.change
        }
        market.forEach(item => {
          this.xData.push(item[0])
          this.yData.push(formatPrice(item[1], 4))
        })
        this.initPrice()
        this.echartsInit()
        this.loading = false
      } catch (e) {
        this.$toast.error(this.$t('getDataErrorTips'))
        this.loading = false
      }
    },
    reload(coinId) {
      this.coinId = coinId
      this.loadData({value: '1d'})
    },
    initPrice() {
      let lowestPrice = Math.min(...this.yData)
      let highestPrice = Math.max(...this.yData)
      this.adjustedLowestPrice = this.formatPrice(lowestPrice * 0.9, 2)
      this.adjustedHighestPrice = this.formatPrice(highestPrice * 1.1, 2)
      if (this.adjustedLowestPrice > 10 || this.adjustedHighestPrice > 10) {
        this.adjustedLowestPrice = parseInt(this.adjustedLowestPrice)
        this.adjustedHighestPrice = parseInt(this.adjustedHighestPrice)
      } else if (this.adjustedLowestPrice < 0.0001) {
        this.adjustedLowestPrice = 0
      }
    }
  }
}
</script>
<style scoped lang="less">
.echart-box {
  position: relative;
}

#myChart {

  margin: 0 auto;
}

.chat-content-report {
  width: 340px;
  height: 260px;
  margin: 0 auto 12px;
}


.chat-content-chat {
  width: 400px;
  height: 170px;
  margin: 0 auto 12px;
}


.coin-price-box {
  display: flex;
  align-items: center;
  padding: 12px 40px;
}

.coin-price-box-chat {
  padding-left: 0;
}


.coin-price {
  color: #FFF;
  font-family: Avenir;
  font-size: 13px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: capitalize;
  text-align: right;
  padding-right: 7px;
  overflow: hidden;
}

.coin-change {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;

  &:before {
    content: " ";
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
    margin-left: 1px;
  }

  &.positive {
    color: #42C525;
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;

    &:before {
      background: url(@/assets/imgs/positive.svg) no-repeat;
      background-size: 16px 16px;
    }
  }

  &.negative {
    color: #F44653;
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;

    &:before {
      background: url(@/assets/imgs/nagative.svg) no-repeat;
      background-size: 16px 16px;
    }
  }
}

.coin-name {
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  align-items: center;

  .coin-logo {
    width: 32px;
    height: 32px;
    border-radius: 32px;
  }

  .name {
    color: #FFF;
    font-family: Avenir;
    font-size: 15px;
    font-style: normal;
    padding: 0 4px;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;
    // 超出省略
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .coin-symbol {
    color: rgba(255, 255, 255, 0.50);
    font-family: Avenir;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
}

.select-row {
  box-sizing: border-box;
  padding-left: 40px;

  div {
    width: 28px;
    height: 20px;
    flex-shrink: 0;
    display: inline-block;
    color: #FFF;
    font-family: Avenir;
    font-size: 10px;
    font-style: normal;
    font-weight: 800;
    text-transform: capitalize;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }

  div.active {
    border-radius: 6px;
    background: rgba(140, 180, 189, 0.10);
  }
}
</style>
