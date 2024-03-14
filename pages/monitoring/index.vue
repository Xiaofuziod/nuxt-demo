<template>
  <div class="monitor-wrapper">
    <aside class="sidebar">
      <section class="profile">
        <h2 class="h2-title">ROBOT</h2>
        <div class="user-box">
          <img src="~/assets/imgs/user.svg" alt="Profile"/>
          <div class="name-info">
            <h3 class="name">Saywteri24735haw...</h3>
            <p class="info">Wtweteri247</p>
          </div>
        </div>
      </section>
      <section class="monitoring-type">
        <h2 class="h2-title">MONITORING TYPE</h2>
        <img class="item-img" src="~/assets/imgs/twiter.svg" alt="">
      </section>
    </aside>
    <main class="content">
      <breadcrumb-navigation/>
      <header class="content-header">
        <FilterTabs v-model="activeTab" :tabList="tabs"  />
        <div class="add-monitoring" @click="showAddMonitor">+ Add AI Monitoring</div>
      </header>
      <div class="monitoring-cards">
        <monitor-card v-for="(item, index) in userMonitors" :key="index" :card="item" show-action  @click="goDetail(item.id)"/>
      </div>
    </main>
    <ball-bg1/>
    <add-monitor v-if="addMonitorShow"/>
  </div>
</template>
<script>
import AddMonitor from "@/components/monitor/addMonitoring.vue";

export default {
  name: 'Monitor',
  components: {AddMonitor},
  data() {
    return {
      activeTab: "ALL",
      tabs: [
        { label: 'ALL', key: 'ALL' },
        { label: 'FINISHED', key: 'FINISHED' },
        { label: 'UNFINISHED', key: 'UNFINISHED' },
      ]
    }
  },
  computed: {
    userMonitors() {
      return this.$store.state.monitor.userMonitorList
    },
    addMonitorShow() {
      return this.$store.state.monitor.addMonitorShow
    }
  },
  methods: {
    async fetchMonitors() {
      await this.$store.dispatch('monitor/fetchUserMonitorList', {
        status: this.mapTabToStatus(this.activeTab)
      });
    },
    goDetail(id) {
      this.$router.push(`/monitoring/detail?id=${id}`);
    },
    mapTabToStatus(tab) {
      switch(tab) {
        case 'ALL': return '';
        case 'FINISHED': return 3; // 根据你的状态定义调整
        case 'UNFINISHED': return 1; // 根据你的状态定义调整
        default: return 0;
      }
    },
    showAddMonitor() {
      this.$store.commit('monitor/setAddMonitorShow', true)
    }
  },
  watch: {
    activeTab(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchMonitors();
      }
    }
  },
  mounted() {
    this.fetchMonitors();
  }
}
</script>

<style scoped lang="less">
.monitor-wrapper {
  width: 1152px;
  height: 100%;
  border-radius: 31px;
  background: rgba(38, 64, 64, 0.2);
  position: relative;
  display: flex;
  z-index: 2;

  .sidebar {
    width: 252px;
    height: 100%;
    border-right: 1px solid rgba(140, 180, 189, 0.12);
    padding: 32px 24px;

    .h2-title {
      height: 24px;
      font-family: aifontf;
      color: rgba(140, 180, 189, 1);
      font-size: 20px;
      font-weight: bold;
      text-transform: capitalize;
      margin-bottom: 14px;
    }

    .profile {
      .user-box {
        width: 204px;
        height: 58px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.2);
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        .name-info {
          padding-left: 12px;

          .name {
            font-weight: 500;
            font-family: Avenir;
            font-size: 14px;
            color: #fff;
          }

          .info {
            color: rgba(140, 180, 189, 1);
            font-family: Avenir-Roman;
            font-size: 10px;
          }
        }

        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
      }
    }

    .monitoring-type {
      margin-top: 40px;

      .item-img {
        width: 124px;
      }
    }
  }

  .content {
    width: 899px;
    padding: 34px 39px;

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .add-monitoring {
        width: 152px;
        height: 22px;
        color: rgba(140, 180, 189, 1);
        font-weight: 500;
        font-size: 16px;
        text-transform: capitalize;
        cursor: pointer;
      }
    }

    .monitoring-cards {
      padding: 40px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

  }
}

</style>
