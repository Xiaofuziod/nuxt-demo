<template>
  <Dialog ref="modal">
    <template #header>添加自选币</template>
    <template #body>
      <div class="Frame580">
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
import {addFollow, getAssetList} from "~/common/home";

export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    loadData() {
      this.$axios.get(getAssetList).then(res => {
        this.list = res.data.data.records
      })
    },
    show() {
      this.$refs.modal.openModal()
      this.loadData()
    },
    hide() {
      this.$refs.modal.closeModal()
    },
    addSelect(item) {
      console.log(item)
      this.$axios.get(addFollow, {
        params: {
          id: item.id
        }
      }).then(res => {
        console.log(res)
      })
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
