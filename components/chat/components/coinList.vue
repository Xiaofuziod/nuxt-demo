<template>
  <div class="coins-wrapper">
    <div class="icon-list" :style="{ 'height': listHeight }">
      <div v-for="coin in coinList" :key="coin.name"
           :class="{'coin-row-2': hideOption}"
           class="coin-row">
        <div class="coin-name" v-if="!hideOption">
          <img :src="coin.logo" class="coin-logo" :alt="coin.logo">
          <span class="name" :style="{'maxWidth': hideOption ? '200px' : 'unset'}">
            {{ coin.name }}</span>
<!--          <span class="coin-symbol">{{ coin.symbol }}</span>-->
        </div>
        <div class="coin-price"
         :class="{'coin-price-1': !hideOption}"
        >${{ formatPrice(coin.currentPrice || coin.price || coin.quotes?.price) }}</div>
        <div class="coin-change"
             :class="{'positive': (Number(coin.change) || coin.quotes?.percentChange24h) > 0, 'negative': (Number(coin.change) || coin.quotes?.percentChange24h) < 0}">
          {{ (Number(coin.change) || coin.quotes?.percentChange24h)?.toFixed(2) }}%
        </div>

        <div class="option" @click="addCoin(coin)"
             v-if="!hideOption"
             :style="{'opacity': userCoinList.includes(coin.id + '') ? 0.4 : 1}"
        >
          <img src="@/assets/imgs/addPlus.svg" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {formatPrice} from "@/utils/price";

export default {
  name: 'CoinList',
  props: {
    listHeight: {},
    coinList: {
      type: Array,
      default: () => [],
    },
    hideOption: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    userCoinList() {
      return this.$store.state.coin.userCoinList.map(coin => coin.coinId)
    },
  },
  data() {
    return {};
  },
  methods: {
    formatPrice,
    addCoin(coin) {
      if (this.userCoinList.includes(coin.id + '')) return;
      this.$store.dispatch('coin/addFollow', [coin.id]);
    },
  },
};
</script>

<style scoped lang="less">

.icon-list {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

.coin-row {
  display: flex;
  align-items: center;
  margin-bottom: 1em;

  .coin-name {
    //width: 194px;
    flex: 1;
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
      padding: 0 12px;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;
      max-width: 120px;
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

  .coin-price {
    color: #FFF;
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;
    text-align: right;
    padding: 0 7px;
    overflow: hidden;
  }

  .coin-price-1 {
    //width: 120px;
    flex: 1;
    text-align: right;
    padding: 0 7px;
  }

  .coin-price-2{

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

  .option {
    width: 20px;
    cursor: pointer;
    margin-left: 12px;

    img {
      width: 20px;
      height: 20px;
    }
  }
}

.coin-row-2 {
  margin-bottom: 0;

  .coin-price {
    padding-left: 0;
  }
}
</style>
