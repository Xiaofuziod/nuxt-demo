<template>
  <div>
    <div class="tabs">
      <div v-for="item in tabList"
           @click="setActiveTab(item)"
           :class="{'active': activeTab.name === item.name}">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: Object,
      default: () => {
        return {};
      }

    },
  },
  methods: {
    setActiveTab(tab) {
      if (this.activeTab === tab.name) return;
      this.$emit('tabChanged', tab);
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
}

.tabs > * {
  margin-right: 20px;
  padding-bottom: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: #FFFFFF;
}

.tabs > *.active {
  font-weight: bold;
  color: #8cce1e;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background-color: #8cce1e;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
