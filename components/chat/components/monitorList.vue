<template>
  <div>
    <div class="card" v-for="(card,index) in list" :key="index">
      <img class="card-img" :src="card?.logo || bianPic" alt="">
      <div class="card-header">
        <h3 class="title1">{{ card?.author }}</h3>
        <h3 class="title2">{{ card?.title }}</h3>
        <p class="timestamp">{{ card?.time }}</p>
      </div>
      <img class="option-img" @click="addMonitor(card)" src="@/assets/imgs/addPlus.svg" alt="">
    </div>
  </div>

</template>
<script>
import bianPic from '@/assets/imgs/bian.png'

export default {
  name: "MidMonitorCard",
  props: {
    showAction: {
      type: Boolean,
    },
    list: {
      type: Array,
    }
  },
  data() {
    return {
      bianPic,
      optionShow: false
    }
  },
  methods: {
    addMonitor(card) {
      this.$store.dispatch('monitor/addUserMonitor', [card.id]);
    },
  }
}
</script>
<style scoped lang="less">
.card {
  width: 100%;
  height: 26px;
  margin-bottom: 13px;
  display: flex;
  align-items: center;
  position: relative;

  .option-img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    cursor: pointer;
  }


  .card-img {
    width: 20px;
    height: 20px;
    border-radius: 20px;

  }

  .card-header {
    margin-left: 8px;
    width: 225px;

    .title1 {
      color: rgba(255, 255, 255, 0.60);
      font-family: Avenir;
      font-size: 6px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: #FFF;
      font-family: Avenir;
      font-size: 8px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;
      margin: 1px auto;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .timestamp {
      color: #8CB4BD;
      font-family: Avenir;
      font-size: 4px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
    }

    .other {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
    }
  }
}
</style>
