<template>
  <div class="list-container" @scroll="handleScroll">
    <slot></slot>
    <div class="loading-container" v-if="isLoading">
      <dot-carousel/>
    </div>
    <div v-if="isFinished" class="finished">{{ $t("scrollView_index_finished_1") }}</div>
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
      if (!this.isFinished && !this.isLoading && scrollTop + offsetHeight >= scrollHeight - 2) {
        this.$emit('loadMore');
      }
    },
  },
}
</script>

<style lang="less">


.loading-container {
  text-align: center;
  transition: height 0.3s;

  img {
    width: 30px;
  }
}


.list-container {
  position: relative;
  overflow-y: auto;
  height: 100%;
  -ms-overflow-style: none; /* 针对IE和Edge */

  &::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }
}


</style>
