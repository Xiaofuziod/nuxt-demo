<template>
  <div class="card" :class="{'card-mini': size === 'mini'}">
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.name }}</h3>
    </div>
    <img class="option-img" @click="$emit('remove')" src="@/assets/imgs/close.svg" alt="">
  </div>
</template>
<script>
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
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      bianPic,
      optionShow: false
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.card {
  width: 131px;
  height: 34px;
  padding: 6px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.10);
  background: rgba(38, 64, 64, 0.10);
  .option-img {
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

.card-mini {
  width: 132px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.10);
  background: rgba(38, 64, 64, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;

  .card-img {
    width: 32px;
    height: 32px;
    border-radius: 32px;
  }

  .option-img {
    width: 12.75px;
    height: 12.75px;
  }

  .card-header {
    padding-left: 8px;
    .title1 {
      color: #FFF;
      font-family: Avenir;
      font-size: 15px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;

      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

}
</style>
