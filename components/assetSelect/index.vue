<template>
  <Dialog ref="modal">
    <template #header>
      <div>
        添加自选币
        <span style="cursor: pointer" @click="hide">关闭</span>
      </div>
    </template>
    <template #body>
      <div class="Frame580">
        <div>
          请输入内容 开始搜索
          <input type="text" v-model="searchKey">
          <button @click="loadSearchData">搜索</button>
        </div>
        <div class="item" v-for="item in list" @click="addSelect(item)">
          <div class="Rectangle">
            <img :src="item.logo" alt="">
          </div>
          <div class="Bitcoin">{{ item.name }}</div>
          <div class="BTC" style="margin-left: 20px">{{ item.quotes.price }}</div>
          <div class="BTC" style="margin-left: 20px">{{ item.quotes.percentChange1h }}</div>
          <div class="BTC" style="margin-left: 20px">{{ item.quotes.percentChange24h }}</div>
          <div class="BTC" style="margin-left: 20px">{{ item.quotes.percentChange7d }}</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script>

export default {
  data() {
    return {
      searchKey: ''
    }
  },
  computed: {
    list() {
      return this.$store.state.coin.coinList
    }
  },
  mounted() {
    this.$store.dispatch('coin/fetchCoinList')

  },
  methods: {
    show() {
      this.$refs.modal.openModal()
    },
    hide() {
      this.$refs.modal.closeModal()
    },
    addSelect(item) {
      this.$store.dispatch('coin/addFollow', item.id)
    },
    loadSearchData() {
      this.$store.dispatch('coin/fetchCoinList', this.searchKey)
    }
  }
}
</script>
<style lang="less">


.Frame580 {
  margin-top: 24px;

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .Rectangle {
    width: 32px;
    height: 32px;
    background-color: green;
    border-radius: 123.1px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .Bitcoin {
    height: 20px;
    color: rgba(255, 255, 255, 1);
    font-family: Avenir-Heavy;
    font-size: 15px;
    text-transform: capitalize;
    margin: 0 12px 0;
  }

  .BTC {
    height: 20px;
    color: rgba(255, 255, 255, 0.5);
    font-family: Avenir;
    font-weight: 500;
    font-size: 15px;
    text-transform: capitalize;
  }
}


</style>
