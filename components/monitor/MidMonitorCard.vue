<template>
  <div class="card" >
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.author }}</h3>
      <h3 class="title2" :title="card?.title">{{ card?.title }}</h3>
      <p class="timestamp">{{ card?.time }}</p>
<!--      <p class="other">{{ card?.status }}</p>-->
    </div>
    <img class="option-img"
         :class="`${(disable || card.selected) ? 'disable' :''}`"
         @click="$emit('select')" src="@/assets/imgs/addPlus.svg" alt="">
  </div>
</template>
<script >
import bianPic from '@/assets/imgs/bian.png'
export default {
  name: "MidMonitorCard",
  props: {
    disable: {
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
  width: 280px;
  height: 72px;
  padding: 6px 12px;
  border-radius: 16px;
  margin: 3px;
  background: rgba(38, 64, 64, 0.2);
  display: inline-flex;
  position: relative;
  align-items: center;
  .option-img {
    position: absolute;
    top: 26px;
    right: 8px;
    cursor: pointer;
    &.disable {
      opacity: 0.3;
      cursor: auto;
    }
  }


  .card-img {
    width: 45px;
    height: 45px;
    border-radius: 10px;
  }

  .card-header {
    padding-left: 17px;
    width: 176px;
    .title1 {
      color: rgba(255, 255, 255, 0.6);
      font-size: 9px;
      line-height: 15px;
      height: 15px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
      line-height: 15px;
      // 超出省略
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 定义文本的行数 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timestamp {
      color: rgba(140, 180, 189, 1);
      font-size: 10px;
    }

    .other {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
    }
  }
}
</style>
