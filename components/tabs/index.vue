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
  display: inline-flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 12px;
  font-family: Avenir;
  color: rgba(255, 255, 255, 0.50);
  margin-right: 24px;
}

.tabs > *.active {
  font-family: Avenir;
  font-weight: bold;
  color: #CEB864;
  position: relative;
  border-radius: 6px;
  background: rgba(140, 180, 189, 0.10);
}
</style>
