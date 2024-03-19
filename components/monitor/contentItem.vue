<template>
  <div class="monitor-content-item">
    <div class="top">
      <div class="user-info">
        <img :src="segment.user_pic" alt="">
        <p class="author">{{ segment.author }}</p>
      </div>
      <p class="timestamp">{{ segment.time_offset }}</p>
    </div>
    <div class="bottom"> {{segment.content}}</div>

  </div>
</template>
<script >
export default {
  name: "MonitorContentItem",
  props: {
    segment: {
      type: Object,
    },
  },
  data() {
    return {
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
.monitor-content-item {
  margin-top: 12px;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .timestamp {
      color: #8CB4BD;
      font-family: Avenir;
      font-size: 12px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;
    }
    .user-info {
      display: inline-flex;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
        border-radius: 32px;
        margin-right: 8px;
      }
      .author {
        color: #FFF;
        font-family: Avenir;
        font-size: 12px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;
      }
    }
  }
  .bottom {
    color: rgba(255, 255, 255, 0.80);
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
}
</style>
