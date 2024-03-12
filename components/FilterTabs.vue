<template>
  <div class="filter-tabs">
    <div
        v-for="tab in tabList"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: tab.key === value }"
        :style="{ '--active-color': activeColor }"
        @click="selectTab(tab.key)"
    >
      <span>{{ tab.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterTabs',
  props: {
    activeColor: {
      type: String,
      default: 'rgba(140, 180, 189, 1)', // 这里是默认的颜色值
    },
    value: {
      type: String,
      default: '',
    },
    tabList: {
      type: Array,
      default() {
        return [
          { label: 'ALL', key: 'ALL' },
          { label: 'FINISHED', key: 'FINISHED' },
          { label: 'UNFINISHED', key: 'UNFINISHED' },
        ];
      },
    },
  },
  methods: {
    selectTab(key) {
      this.$emit('input', key);
    },
  },
};
</script>

<style scoped lang="less">
.filter-tabs {
  display: flex;

  .tab-btn {
    min-width: 93px;
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    font-family: aifontf;
    text-align: center;
    color: rgba(140, 180, 189, 0.4);
    font-size: 16px;
    margin-right: 20px;
    overflow: hidden;
    position: relative;

    &.active span {
      font-size: 16px;
      color: rgba(12, 26, 39, 1);
    }
    --active-color: rgba(140, 180, 189, 1);


    &.active {
      background: linear-gradient(135deg, transparent 6%, var(--active-color) 6%, var(--active-color) 94%, transparent 94%,transparent 100%)
    }
  }
}
</style>
