<template>
  <div class="infinite-scroll-container" @scroll="checkBottom">
    <slot :items="items"></slot> <!-- 使用slot来展示items，增加组件的灵活性 -->
    <div v-if="isLoading" class="loading-container">
      <dot-carousel/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadData: {
      type: Function,
      required: true,
    },
    initData: {
      type: Array,
    },
    initNext: {
      type: Boolean
    }
  },
  data() {
    return {
      items: [],
      isLoading: false,
      hasNext: false, // 判断是否还有更多数据
    };
  },
  mounted() {
    this.items =  this.initData || []
    this.hasNext = this.initNext || false
    console.log('this.hasNext', this.hasNext)
  },
  methods: {
    async loadMoreItems() {
      if (this.isLoading || !this.hasNext) return;

      this.isLoading = true;
      try {
        const { data, hasNext } = await this.loadData();
        console.log('{ data, hasNext } ',{ data, hasNext } )
        this.items = this.items.concat(data);
        this.hasNext = hasNext; // 根据加载的数据更新hasNext状态
      } catch (error) {
        // 处理加载错误（可选）
      } finally {
        this.isLoading = false;
      }
    },
    checkBottom() {
      const container = this.$el;
      if (container.scrollHeight - container.scrollTop <= container.clientHeight + 2) { // +1 为了容错
        this.loadMoreItems();
      }
    }
  }
}
</script>

<style scoped>
.infinite-scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.loading-container {
  text-align: center;
  img{
    width: 30px;
  }
}
</style>
