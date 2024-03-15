<template>
  <div class="welcome-page">
    <div class="welcome-content">
      <div class="chat-box">
        <chat :showWelcome="true"/>
      </div>
      <div class="step-box">
        <!--第一步-->
        <div class="step-title">
          <div class="step-title-icon">
            <img src="@/assets/imgs/chat/finish.svg" alt="">
          </div>
          <div class="step-title-text">
            Welcome {{ welcomeIndex }}
          </div>
        </div>
        <!--第二步-->
        <template v-if="welcomeIndex > 5">
          <div class="step-line"/>
          <div class="step-title">
            <div class="step-title-icon">
              <img src="@/assets/imgs/chat/finish.svg" alt="">
            </div>
            <div class="step-title-text">
              自选加密货币
            </div>
          </div>
          <div class="step-content step-content-border">
            <div class="add-monitoring-cards">
              <small-coin-card
                  v-for="monitor in userCoinList"
                  :key="monitor.id"
                  :card="monitor"
                  size="mini"
                  @remove="remove(monitor.id)"
              />
            </div>
            <div class="add-text" @click="handleClick('coin')">
              + 添加
            </div>
          </div>
        </template>

        <!--第三步-->
        <template v-if="welcomeIndex > 9">
          <div class="step-title">
            <div class="step-title-icon">
              <img src="@/assets/imgs/chat/finish.svg" alt="">
            </div>
            <div class="step-title-text">
              监控信号源
            </div>
          </div>
          <div class="step-content step-content-border">
            <div class="add-monitoring-cards">
              <small-monitor-card
                  v-for="monitor in userMonitorList"
                  :key="monitor.id"
                  :card="monitor"
                  @remove="removeMonitor(monitor.id)"
              />
            </div>
            <div class="add-text" @click="handleClick('monitor')">
              + 添加
            </div>
          </div>
        </template>
        <!--第四步-->
        <div class="step-title" v-if="welcomeIndex > 12">
          <div class="step-title-icon">
            <img src="@/assets/imgs/chat/finish.svg" alt="">
          </div>
          <div class="step-title-text">
            开始Taurion之旅吧～
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chat from '~/components/chat/index.vue'
import AddCoin from "~/components/report/addCoin.vue";
import AddMonitor from "~/components/monitor/addMonitoring.vue";
import SmallCoinCard from "@/components/report/smallMonitorCard.vue";
import SmallMonitorCard from "@/components/chat/components/smallMonitorCard.vue";

export default {
  components: {
    SmallMonitorCard,
    SmallCoinCard,
    chat,
    AddCoin,
    AddMonitor
  },
  computed: {
    userCoinList() {
      return this.$store.state.coin.userCoinList
    },
    userMonitorList() {
      return this.$store.state.monitor.userMonitorList
    },
    welcomeIndex() {
      return this.$store.state.chat.welcomeIndex;
    }
  },
  data() {
    return {
      //
    }
  },
  methods: {
    handleClick(type) {
      if (type === 'coin') {
        this.$store.commit('coin/setAddCoinShow', true)
      } else {
        this.$store.commit('monitor/setAddMonitorShow', true)
      }
    },
    remove(id) {
      this.$store.dispatch('coin/removeFollow', id)
    },
    removeMonitor(id) {
      this.$store.dispatch('monitor/deleteUserMonitor', id)
    }
  }
}
</script>

<style lang="less" scoped>


.add-monitoring-cards {
  width: 430px;
  display: flex;
  flex-wrap: wrap;
}

.step-box {
  box-sizing: border-box;
  padding-left: 20px;
  height: 100%;
  width: 515px;
  overflow-y: auto;
  padding-bottom: 30px;

  .step-line {
    width: 1px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-left: 13px;
  }

  .step-content-border {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }

  .step-content {
    margin-left: 13px;
    min-height: 60px;
    box-sizing: border-box;
    padding: 31px;
  }

  .add-text {
    cursor: pointer;
    font-family: Avenir;
    font-size: 11px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
    color: #CEB864;
  }
}

.step-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .step-title-text {
    font-family: Avenir;
    font-size: 12px;
    font-weight: 900;
    line-height: 16px;
    text-align: left;
    margin-left: 20px;
    color: #FFFFFF;
  }

  .step-title-icon {
    width: 26px;
    height: 26px;
    border-radius: 26px;
    border: 1px solid rgba(255, 255, 255, 0.2);

    img {
      width: 24px;
      height: 24px;
      border-radius: 24px;
    }
  }
}

.welcome-page {
  width: 100vw;
  height: 100vh;
  background: rgba(5, 15, 33, 1);
  overflow-y: hidden;
  overflow-x: auto;
  position: fixed;
  left: 0;
  top: 0;

  .welcome-content {
    width: 1050px;
    height: calc(100vh - 100px);
    margin: 100px auto 0;
    display: flex;

    .chat-box {
      width: 515px;
    }
  }

}

</style>
