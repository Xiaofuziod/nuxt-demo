<template>
  <div class="card" >
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.title }}</h3>
      <h3 class="title2">{{ card?.author }}</h3>
<!--      <p class="timestamp">{{ card?.time }}</p>-->
      <!--      <p class="other">{{ card?.status }}</p>-->
    </div>
    <img class="option-img" @click="$emit('remove')" src="@/assets/imgs/close.svg" alt="">
  </div>
</template>
<script >
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
  width: 131px;
  height: 34px;
  padding: 6px;
  border-radius: 8px;
  background: rgba(38, 64, 64, 0.2);
  display: flex;
  position: relative;
  margin-right: 8px;
  margin-bottom: 8px;
  .option-img {
    position: absolute;
    top: 9px;
    right: 7px;
    cursor: pointer;
  }

  .card-img {
    width: 22px;
    height: 22px;
    border-radius: 5px;

  }

  .card-header {
    padding-left: 4px;
    width: 68px;
    .title1 {
      color: rgba(255, 255, 255, 0.6);
      font-size: 5px;
      line-height: 10px;
      height: 15px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: rgba(255, 255, 255, 1);
      font-size: 7px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .timestamp {
      color: rgba(140, 180, 189, 1);
      font-size: 12px;
    }

    .other {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
    }
  }
}
</style>
