<template>
  <div class="list-container" @scroll="handleScroll">
    <slot></slot>
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-if="isFinished" class="finished">没有更多数据了</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleScroll(e) {
      const {scrollTop, offsetHeight, scrollHeight} = e.target;
      if (!this.isFinished && !this.isLoading && scrollTop + offsetHeight >= scrollHeight) {
        this.$emit('loadMore');
      }
    },
  },
}
</script>

<style lang="less">

.list-container {
  position: relative;
  overflow-y: auto;
  height: 100%;
}
.list-container::-webkit-scrollbar {
  display: none;
}

</style>
