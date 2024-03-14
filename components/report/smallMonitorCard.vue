<template>
  <div class="card" >
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.name }}</h3>
    </div>
    <img class="option-img" @click="$emit('remove')" src="@/assets/imgs/close.svg" alt="">
  </div>
</template>
<script >
import bianPic from '@/assets/imgs/bian.png'
export default {
  name: "SmallCoinCard",
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
      color: #FFF;
      font-family: Avenir;
      font-size: 10px;
      font-style: normal;
      font-weight: 800;
      height: 22px;
      line-height: 22px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
