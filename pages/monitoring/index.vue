<template>
  <div class="monitor-slide" >
    <div class="monitor-wrapper">
      <aside class="sidebar">
        <section class="profile">
          <h2 class="h2-title">{{ $t("Monitor_h2-title_1") }}</h2>
          <user-info />
        </section>
        <section class="monitoring-type">
          <h2 class="h2-title">{{ $t("Monitor_h2-title_2") }}</h2>
          <img class="item-img" src="~/assets/imgs/twiter.svg" alt="">
        </section>
        <div class="add-monitoring" @click="showAddMonitor">{{ $t("Monitor_add-monitoring_1") }}</div>
      </aside>
      <main class="content">
        <breadcrumb-navigation />
        <header class="content-header">
          <FilterTabs v-model="activeTab" :tabList="tabs"/>
        </header>
        <template  v-if="!pageLoading">
          <div class="center-box loading-box" v-if="loading" >
            <img src="@/assets/imgs/ZKZg.gif" alt="">
          </div>
          <div class="center-box empty-box" v-if="!loading && !userMonitorsRecords.length">
            <img src="@/assets/imgs/empty.svg" alt="">
            <span>{{ $t("monitoring_span_1") }}</span>
          </div>
          <div class="monitoring-cards" v-if="!loading && userMonitorsRecords.length">
            <infinite-scroll  :loadData="loadData" :initData="userMonitorsRecords">
              <template #default="{ items }">
                <monitor-card v-for="(item, index) in items" :key="index" :card="item" show-action
                              @click="goDetail(item.id)"/>
              </template>
            </infinite-scroll>
          </div>
        </template>
      </main>
    </div>
    <MonitorSkeletonLoader :show="pageLoading"/>
  </div>

</template>
<script>

export default {
  name: 'Monitor',
  data() {
    return {
      activeTab: "ALL",
      pageLoading: true,
      tabs: [
        {label: this.$t('ALL'), key: 'ALL'},
        {label: this.$t('FINISHED'), key: 'FINISHED'},
        {label: this.$t('UNFINISHED'), key: 'UNFINISHED'},
      ]
    }
  },
  computed: {
    userMonitors() {
      return this.$store.state.monitor.userMonitor
    },
    loading() {
      return this.$store.state.monitor.loading
    },
    userMonitorsRecords() {
      return this.userMonitors?.records || []
    },
    user() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async loadData() {
      const {hasNext, records} = await this.$store.dispatch('monitor/fetchUserMonitorList', {
        status: this.mapTabToStatus(this.activeTab),
        page: (this.$store.state.monitor.userMonitor?.page || 0) +1
      })
      return {
        hasNext,
        data: records
      }
    },
    async fetchMonitors() {
      this.$store.commit('monitor/setLoading', true)
      await this.$store.dispatch('monitor/fetchUserMonitorList', {
        status: this.mapTabToStatus(this.activeTab),
        page: 1
      });
      this.$store.commit('monitor/setLoading', false)
      this.pageLoading = false
    },
    goDetail(id) {
      this.$router.push(this.localeRoute(`/monitoring/detail?id=${id}`));
    },
    mapTabToStatus(tab) {
      switch (tab) {
        case 'ALL':
          return '';
        case 'FINISHED':
          return 3; // 根据你的状态定义调整
        case 'UNFINISHED':
          return 1; // 根据你的状态定义调整
        default:
          return 0;
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
.monitor-slide {
  position: relative;
  overflow-x: visible;
  overflow-y: scroll;
  width: 100%;
  z-index: 0;
  padding-top: 16px;
  text-align: center;
}

.monitor-wrapper {
  width: 1152px;
  height: 100%;
  text-align: left;
  border-radius: 31px;
  background: rgba(38, 64, 64, 0.20);
  backdrop-filter: blur(100px);
  position: relative;
  display: inline-flex;
  z-index: 2;

  .sidebar {
    width: 252px;
    height: 100%;
    border-right: 1px solid rgba(140, 180, 189, 0.12);
    padding: 32px 24px;

    .h2-title {
      height: 24px;
      font-family: aifontf;
      color: rgba(206, 184, 100, 1);
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
            width: 125px;
          }

          .info {
            height: 14px;
            color: rgba(206, 184, 100, 1);
            font-family: Avenir-Roman;
            font-size: 10px;
            text-transform: capitalize;
            margin-top: 2px;
          }
        }

        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
      }
    }
    .add-monitoring {
      width: 152px;
      height: 22px;
      color: rgba(206, 184, 100, 1);
      font-weight: 500;
      font-size: 16px;
      text-transform: capitalize;
      cursor: pointer;
      position: absolute;
      bottom: 25px;
      left: 25px;
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
    }
    .loading-box {
      img {
        width: 32.757px;
        height: 32.972px;
      }
    }
    .empty-box {
      flex-direction: column;
      color: rgba(140, 180, 189, 0.60);
      font-family: Avenir;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;
      img {
        width: 64.757px;
        margin-bottom: 6px;
        height: 76.972px;
      }
    }
    .monitoring-cards {
      padding: 30px 0 20px 0;
      height: calc(100vh - 265px);
      overflow: hidden;
    }

  }
}

</style>
