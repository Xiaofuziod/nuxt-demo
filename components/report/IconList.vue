<template>
  <div class="coins-wrapper">
    <div class="icons-header"></div>
    <div class="icon-list"
         :style="{ 'height': listHeight }"
    >
      <div
          v-for="coin in coins"
          :key="coin.name"
          class="coin-row"
      >
        <div class="coin-name">
          <img :src="coin.logo" class="coin-logo" alt="">
          <span>{{ coin.name }}</span>
          <span class="coin-symbol">{{ coin.symbol }}</span>
        </div>
        <div class="coin-price">{{ coin.price }}</div>
        <div class="coin-change" :class="{ positive: coin.change1h > 0, negative: coin.change1h < 0 }">
          {{ coin.change1h.toFixed(2) }}%
        </div>
        <div class="coin-change" :class="{ positive: coin.change1h > 0, negative: coin.change1h < 0 }">
          {{ coin.change1h.toFixed(2) }}%
        </div>
        <div class="coin-change" :class="{ positive: coin.change1h > 0, negative: coin.change1h < 0 }">
          {{ coin.change1h.toFixed(2) }}%
        </div>
        <!-- ...其他时间段的变化 -->
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'IconList',
  props: {
    icons: {
      type: String,
      default: [],
    },
    listHeight: {

    }
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.icon-list {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

.coin-row {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.coin-name {
  display: flex;
  align-items: center;
  margin-right: 1em;
}

.coin-logo {
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
}

.coin-symbol {
  margin-left: 0.5em;
  color: #888;
}

.coin-price {
  margin-right: 1em;
}

.coin-change {
  margin-right: 1em;
}

.positive {
  color: #4CAF50;
}

.negative {
  color: #F44336;
}
</style>
