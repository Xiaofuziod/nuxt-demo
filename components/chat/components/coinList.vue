<template>
  <div class="coins-wrapper">
    <div class="icon-list" :style="{ 'height': listHeight }">
      <div v-for="coin in coinList" :key="coin.name" class="coin-row">
        <div class="coin-name">
          <img :src="coin.logo" class="coin-logo" alt="">
          <span class="name">{{ coin.name }}</span>
          <span class="coin-symbol">{{ coin.symbol }}</span>
        </div>
        <div class="coin-price">${{ coin.quotes.price.toFixed(2) }}</div>
        <div class="coin-change" :class="'negative'">
          {{ coin.quotes.percentChange24h.toFixed(2) }}%
        </div>
        <div class="option" @click="$emit('select', coin)">
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
    listHeight: {},
    coinList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
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
    width: 194px;
    display: flex;
    align-items: center;

    .coin-logo {
      width: 16px;
      height: 16px;
      border-radius: 16px;
    }

    .name {
      color: #FFF;
      font-family: Avenir;
      font-size: 8px;
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
      font-size: 8px;
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
    font-size: 8px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;
    text-align: right;
    padding: 0 7px;


  }

  .coin-change {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &:before {
      content: " ";
      display: inline-block;
      width: 8px;
      height: 8px;
      background-size: 100% 100%;
      margin-left: 1px;
    }

    &.positive {
      color: #42C525;
      font-family: Avenir;
      font-size: 8px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;

      &:before {
        background: url(@/assets/imgs/positive.svg);
        background-size: 8px 8px;
      }
    }

    &.negative {
      color: #F44653;
      font-family: Avenir;
      font-size: 8px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;

      &:before {
        background: url(@/assets/imgs/nagative.svg);
        background-size: 8px 8px;
      }
    }
  }

  .option {
    width: 16px;
    cursor: pointer;
    margin-left: 24px;
    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
