<template>
  <div class="coins-wrapper">
    <div class="coins-header">
      <div class="name">{{ $t("CoinList_name_1") }}</div>
      <div class="price">{{ $t("CoinList_price_1") }}</div>
      <div class="time">{{ $t("CoinList_time_1") }}</div>
      <div class="time">{{ $t("CoinList_time_2") }}</div>
      <div class="time">{{ $t("CoinList_time_3") }}</div>
      <div class="option"></div>
    </div>
    <div class="icon-list"
         :style="{ 'height': listHeight }"
    >
      <div
          v-for="coin in coinList"
          :key="coin.name"
          class="coin-row"
      >
        <div class="coin-name">
          <img :src="coin.logo" class="coin-logo" alt="">
          <span class="name">{{ coin.name }}</span>
          <span class="coin-symbol">{{ coin.symbol }}</span>
        </div>
        <div class="coin-price">${{ coin.quotes.price.toFixed(2) }}</div>
        <div class="coin-change" :class="'positive'">
          {{ coin.quotes.percentChange1h.toFixed(2) }}%
        </div>
        <div class="coin-change" :class="'negative'">
          {{ coin.quotes.percentChange24h.toFixed(2) }}%
        </div>
        <div class="coin-change" :class="'negative'">
          {{ coin.quotes.percentChange7d.toFixed(2) }}%
        </div>
        <div class="option"
             :class="`${selectIdList.includes(coin.id) ? 'disable' : ''}`"
             @click="select(coin)">
          <img src="@/assets/imgs/addPlus.svg" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'CoinList',
  props: {
    listHeight: {

    },
    selectIds: {
      type: Array
    }
  },
  computed: {
    coinList() {
      return this.$store.state.coin.coinList
    },
    selectIdList() {
      return [...this.selectIds, ...this.$store.state.coin.userCoinList.map(i => i.coinId)]
    }
  },
  data() {
    return {
    };
  },
  methods: {
    select(coin) {
      console.log(this.selectIdList, coin.id)
      if(this.selectIdList.includes(coin.id) ) return
      this.$emit('select', coin)
    }
  }
};
</script>

<style scoped lang="less">
.coins-wrapper {
  .coins-header {
    color: rgba(140, 180, 189, 0.60);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
    text-align: center;
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .name { width: 194px}
    .price { width: 95px}
    .time { width: 95px}
    .option { width: 50px}
  }
}
.icon-list {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

.coin-row {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  .coin-name {
    width: 194px;
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
    width: 90px;
    color: #FFF;
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;
    text-align: center;
    padding: 0 5px;


  }
  .coin-change {
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
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
        background: url(@/assets/imgs/positive.svg);
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
        background: url(@/assets/imgs/nagative.svg);
      }
    }}
  .option { width: 50px;cursor: pointer;
    &.disable {
      opacity: 0.3;
      cursor: auto;
    }
  }
}
</style>
