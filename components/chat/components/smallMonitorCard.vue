<template>
  <div class="card">
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title2">{{ card?.title }}</h3>
    </div>
    <img class="option-img" @click="$emit('remove')" src="@/assets/imgs/close.svg" alt="">
  </div>
</template>
<script>
import bianPic from '@/assets/imgs/bian.png'

export default {
  name: "SmallMonitorCard",
  props: {
    showAction: {
      type: Boolean,
    },
    card: {
      type: Object,
    },
  },
  data() {
    return {
      bianPic,
      optionShow: false
    }
  },
  methods: {
    deleteMonitor(id) {
      this.$store.dispatch('monitor/deleteUserMonitor', id);
    }
  }
}
</script>
<style scoped lang="less">
.card {
  width: 144px;
  height: 34px;
  padding: 5px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.10);
  background: rgba(38, 64, 64, 0.10);
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;

  .option-img {
    position: absolute;
    right: 9px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    float: right;
  }

  .card-img {
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }

  .card-header {
    margin-left: 6px;
    width: 80px;
    .title2 {
      color: #FFF;
      font-family: Avenir;
      font-size: 8px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;
      margin: 1px 0;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
