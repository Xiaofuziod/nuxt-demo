<template>
  <div class="card" :class="`${card.status === 1 ? 'disable' : ''}`" @click="cardClick()">
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.author }}</h3>
      <h3 class="title2">{{ card?.title }}</h3>
      <p class="timestamp">{{ card?.time }}</p>
    </div>
    <img class="remove-btn" src="@/assets/imgs/close.svg" @click.stop="deleteMonitor(card.id)" alt="">
  </div>
</template>
<script>
import bianPic from '@/assets/imgs/bian.png'

export default {
  name: "monitorCard",
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
    },
    cardClick() {
      if (this.card.status === 1) {
        this.$toast.warning('The activity you are monitoring has not yet concluded.')
      } else if(this.card.status === 7) {
        this.$toast.warning('The activity you are monitoring has canceled.')
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>
<style scoped lang="less">
.card {
  padding: 16px 20px;
  width: 389px;
  height: 109px;
  border-radius: 16px;
  margin: 8px;
  background: rgba(38, 64, 64, 0.2);
  cursor: pointer;
  position: relative;
  display: inline-flex;
  .remove-btn {
    position: absolute;
    top: 13px;
    right: 13px;
    height: 13px;
    width: 13px;
    cursor: pointer;
  }

  .card-img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }

  .card-header {
    padding-left: 17px;
    width: 265px;

    .title1 {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
      line-height: 15px;
      height: 15px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: #FFF;
      font-family: Avenir;
      font-size: 15px;
      font-style: normal;
      font-weight: 800;
      text-transform: capitalize;
      width: 225px;
      text-wrap: normal;
      line-height: 25px;

      display: -webkit-box;
      -webkit-line-clamp: 2; /* 定义文本的行数 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timestamp {
      color: #CEB864;
      font-size: 12px;
    }

    .other {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
    }
  }
}
</style>
