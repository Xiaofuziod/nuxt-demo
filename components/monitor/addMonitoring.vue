<template>
  <div class="monitor-wrapper-bg">
    <div class="monitor-wrapper">
      <div class="monitor-header">
        <h1>ADD MONITOR</h1>
        <h1 class="close-btn" @click.stop="close()">X</h1>
      </div>
      <main class="content">
        <div class="search-section">
          <input type="text" v-model="searchQuery" placeholder="搜索监控项目..." class="search-input">
          <button @click="searchMonitors" class="search-btn">搜索</button>
        </div>
        <!-- 监控卡片列表 -->
        <div class="monitoring-cards" v-if="monitors.length">
          <monitor-card
              v-for="monitor in monitors"
              :key="monitor.id"
              :card="monitor"
              @click="select(monitor.id)"
              :class="`${monitor.id == selectId ? 'active' : ''}`"
          />
        </div>
        <!-- 弹出添加监控组件的按钮 -->
        <div class="monitoring-footer">
          <button @click="addMonitor" class="add-monitor-btn">添加监控项目</button>
        </div>
      </main>
      <!-- 其余代码 -->
    </div>
  </div>

</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      searchQuery: '',
      selectId:''
    };
  },
  computed: {
    monitors() {
      return this.$store.state.monitor.monitorList
    }
  },
  methods: {
    searchMonitors() {
      this.$store.dispatch('monitor/fetchMonitorList', this.searchQuery);
    },
    select(id){
      this.selectId = id
    },
    addMonitor() {
      this.$store.dispatch('monitor/addUserMonitor', [this.selectId]);
    },
    close() {
      this.$store.commit("monitor/setAddMonitorShow", false)
    }
  },
  mounted() {
    this.searchMonitors(); // Fetch all monitors initially
  }
}
</script>


<style scoped>
.monitor-wrapper-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 100;
}
.monitor-wrapper {
  font-family: 'Arial', sans-serif;
  width: 856px;
  height: 800px;
  background: rgba(1, 44, 44, 0.5);
  border-radius: 31px;
}

.content {
  margin: 0 auto;
  padding: 20px;
}

.search-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-btn, .add-monitor-btn {
  padding: 10px 20px;
  background-color: #5b9bd5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-btn:hover, .add-monitor-btn:hover {
  background-color: #457fca;
}

.monitoring-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: scroll;
  height: 650px;
  .active {
    background: rgba(51, 140, 140, 0.5);
  }
}
.monitor-header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-family: aifontf;
  font-weight: bold;
  color: #fff;
  padding: 20px 20px 0 20px;
  .close-btn {
    cursor: pointer;
    font-family: 'Arial', sans-serif;
  }
}
.monitoring-footer {
  display: flex;
  padding-top: 20px;
  padding-right: 20px;
  justify-content: right;
}

/* Add additional styles below */
</style>
