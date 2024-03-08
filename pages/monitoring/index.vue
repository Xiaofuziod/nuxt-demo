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
        <div class="add-monitoring">+ Add AI Monitoring</div>
      </header>
      <div class="monitoring-cards">
        <div class="card" v-for="(item, index) in cards" :key="index" @click="goDetail(item.id)">
          <img class="card-img" src="~/assets/imgs/bian.png" alt="">
          <div class="card-header">
            <h3 class="title1">{{item.title1}}</h3>
            <h3 class="title2">{{item.desc}}</h3>
            <p class="timestamp">{{item.timestamp}}</p>
            <p class="other">{{ item.other }}</p>
          </div>
        </div>
      </div>
    </main>
    <ball-bg1/>
  </div>
</template>
<script>
export default {
  name: 'Monitor',
  data() {
    return {
      cards: [
        {
          id:1,
          title1: "比特币Layer2是不是今年热门种子选手热门种子选手",
          desc: "比特币Layer2是不是今年热门种子选手热门种子选手",
          timestamp: "今天20:00",
          other: "128进展",
        }
      ],
      activeTab: "ALL",
      tabs: [
        { label: 'ALL', key: 'ALL' },
        { label: 'FINISHED', key: 'FINISHED' },
        { label: 'UNFINISHED', key: 'UNFINISHED' },
      ]
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/${this.$i18n.locale}/monitoring/detail?id=${id}`);
    }
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
      }
    }

    .monitoring-cards {
      padding: 40px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .card {
        padding: 16px 20px;
        width: 399px;
        height: 130px;
        border-radius: 16px;
        margin-bottom: 16px;
        background: rgba(38, 64, 64, 0.2);
        display: flex;
        cursor: pointer;

        .card-img {
          width: 60px;
          height: 60px;
          border-radius: 10px;
        }

        .card-header {
          padding-left: 17px;

          .title1 {
            color: rgba(255, 255, 255, 0.6);
            font-size: 10px;
            line-height: 15px;
            height: 15px;
          }

          .title2 {
            color: rgba(255, 255, 255, 1);
            font-size: 15px;
            line-height: 25px;
          }

          .timestamp {
            color: rgba(140, 180, 189, 1);
            font-size: 12px;
          }

          .other {
            color: rgba(255, 255, 255, 0.6);
            font-size: 10px;
          }
        }
      }
    }

  }
}

</style>
