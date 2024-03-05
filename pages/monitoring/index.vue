<template>
  <div class="monitor-wrapper">
    <aside class="sidebar">
      <section class="profile">
        <h2 class="h2-title">ROBOT</h2>
        <div class="user-box">
          <img src="~/assets/imgs/user.svg" alt="Profile" />
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
      <div class="bread-path">
        <span class="ai-font">ACCOUNT  </span>
        <span class="split-icon">/</span>
        <img src="~/assets/imgs/user.svg" alt="">
        <span>user</span>
      </div>
      <header class="content-header">
        <div class="filter-tabs">
          <div class="tab-btn active">ALL</div>
          <div class="tab-btn">FINISHED</div>
          <div class="tab-btn">UNFINISHED</div>
        </div>
        <div class="add-monitoring">+ Add AI Monitoring</div>
      </header>
      <div class="monitoring-cards">
        <!-- Example of a single card -->
        <div class="card">
          <img class="card-img" src="~/assets/imgs/bian.png" alt="">
          <div class="card-header">
            <h3 class="title1">币安Binance中文 ｜ Web3钱...</h3>
            <h3 class="title2">比特币Layer2是不是今年热门种子选手热门种子选手</h3>
            <p class="timestamp">今天20:00</p>
            <p class="other">128进展</p>
          </div>
        </div>
        <!-- Add more cards as needed -->
      </div>
    </main>
    <ball-bg1/>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="less">
.monitor-wrapper {
  width: 1152px;
  height: 616px;
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
    .bread-path {
      font-size: 9px;
      margin-bottom: 49px;
      color: rgba(140, 180, 189, 0.6);
      display: flex;
      align-items: center;
      .ai-font {
        font-family: aifontf;
        margin-right: 4px;
      }
      img {
        height: 14px;
        width: 14px;
        border-radius: 50%;
        margin: 0 4px;
      }
    }

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
      .filter-tabs {
        display: flex;
        .tab-btn {
          width: 93px;
          height: 36px;
          line-height: 36px;
          cursor: pointer;
          font-family: aifontf;
          text-align: center;
          color: rgba(140, 180, 189, 0.4);
          font-size: 16px;
          margin-right: 20px;
          &.active {
            background: rgba(140, 180, 189, 1);
            color: rgba(12, 26, 39, 1);
            backdrop-filter: blur(217.899994px);
          }
        }
      }
    }
    .monitoring-cards {
      padding: 40px 0;
      display: flex;
      .card {
        padding: 16px 20px;
        width: 399px;
        height: 130px;
        border-radius: 16px;
        background: rgba(38, 64, 64, 0.2);
        display: flex;
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
