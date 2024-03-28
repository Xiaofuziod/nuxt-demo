<template>
  <div class="welcome-page">
    <FullScreenVideoLoader @video-ended="videoEnded" v-if="!hideVideo"/>
    <div class="welcome-content">
      <div class="chat-box-0"
           :class="{'chat-box-anime': hideVideo,'chat-box-anime2': isOver}">
        <chat :showWelcome="true" @welcomeOver="welcomeOver"/>
      </div>
      <div class="step-box"
           :class="{'step-box-anime': hideVideo,'step-box-anime2': isOver}">
        <!--第一步-->
        <div class="step-title">
          <div class="step-title-icon">
            <span class="step-loading style-2" v-if="welcomeStep < 2"></span>
            <div class='btn-container' v-else>
              <button class='btn btn--shockwave is-active'>
                <img class="step-finish-img" src="@/assets/imgs/chat/finish.svg" alt="">
              </button>
            </div>
          </div>
          <div class="step-title-text">
            <span>{{ $t("welcome_index_span_1") }} </span>
          </div>
        </div>
        <!--第二步-->
        <template v-if="welcomeStep >= 2">
          <div class="step-line"/>
          <div class="step-title">
            <div class="step-title-icon">
              <span class="step-loading style-2" v-if="welcomeStep < 3"></span>
              <div class='btn-container' v-else>
                <button class='btn btn--shockwave is-active'>
                  <img class="step-finish-img" src="@/assets/imgs/chat/finish.svg" alt="">
                </button>
              </div>
            </div>
            <div class="step-title-text">{{ $t("welcome_index_step-title-text_1") }}</div>
          </div>
          <div class="step-content" :class="{'step-content-border': welcomeStep > 2}">
            <div class="add-monitoring-cards">
              <small-coin-card
                  v-for="monitor in userCoinList"
                  :key="monitor.id"
                  :card="monitor"
                  size="mini"
                  @remove="remove(monitor.id)"
              />
            </div>
            <template v-if="coinShowMoreBtn">
              <div class="show-more" v-if="!coinShowMore" @click="coinShowMore = true">
                {{ $t("ShowAll") }}<img src="@/assets/imgs/chat/down.svg" alt="">
              </div>
              <div class="show-more" v-else @click="coinShowMore = false">
                {{ $t("Collapse") }}<img src="@/assets/imgs/chat/up.svg" alt="">
              </div>
            </template>

            <div class="add-text"
                 v-if="welcomeIndex > 5"
                 @click="handleClick('coin')">{{ $t("welcome_index_add-text_1") }}
            </div>
          </div>
        </template>

        <!--第三步-->
        <template v-if="welcomeStep >= 3">
          <div class="step-title">
            <div class="step-title-icon">
              <span class="step-loading style-2" v-if="welcomeStep < 4"></span>
              <div class='btn-container' v-else>
                <button class='btn btn--shockwave is-active'>
                  <img class="step-finish-img" src="@/assets/imgs/chat/finish.svg" alt="">
                </button>
              </div>
            </div>
            <div class="step-title-text">
              {{ $t("welcome_index_step-title-text_2") }}
            </div>
          </div>
          <div class="step-content" :class="{'step-content-border': welcomeStep > 3}">
            <div class="add-monitoring-cards">
              <small-monitor-card
                  v-for="monitor in userMonitorList"
                  :key="monitor.id"
                  :card="monitor"
                  @remove="removeMonitor(monitor.id)"
              />
            </div>
            <template v-if="monitorShowMoreBtn">
              <div class="show-more" v-if="!monitorShowMore" @click="monitorShowMore = true">
                {{ $t("ShowAll") }}<img src="@/assets/imgs/chat/down.svg" alt="">
              </div>
              <div class="show-more" v-else @click="monitorShowMore = false">
                {{ $t("Collapse") }}<img src="@/assets/imgs/chat/up.svg" alt="">
              </div>
            </template>
            <div class="add-text"
                 v-if="welcomeIndex > 9"
                 @click="handleClick('monitor')">
              {{ $t("welcome_index_add-text_1") }}
            </div>
          </div>
        </template>
        <!--第四步-->
        <div class="step-title" v-if="welcomeStep >= 4">
          <div class="step-title-icon">
            <span class="step-loading style-2" v-if="!isOver"></span>
            <div class='btn-container' v-else>
              <button class='btn btn--shockwave is-active'>
                <img class="step-finish-img" src="@/assets/imgs/chat/finish.svg" alt="">
              </button>
            </div>
          </div>
          <div class="step-title-text">
            {{ $t('Welcome_step-title-text_1') }}
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
import FullScreenVideoLoader from "@/components/FullScreenVideoLoader.vue";


export default {
  components: {
    SmallMonitorCard,
    SmallCoinCard,
    chat,
    AddCoin,
    AddMonitor,
    FullScreenVideoLoader
  },
  computed: {
    userCoinList() {
      return (this.coinShowMore || this.$store.state.coin.userCoinList?.length <= 4) ? this.$store.state.coin.userCoinList : this.$store.state.coin.userCoinList.slice(0, 4)
    },
    userMonitorList() {
      return (this.monitorShowMore || this.$store.state.monitor.userMonitor?.records?.length <= 4) ? this.$store.state.monitor.userMonitor?.records : this.$store.state.monitor.userMonitor?.records.slice(0, 4)
    },
    coinShowMoreBtn() {
      return this.$store.state.coin.userCoinList.length > 4
    },
    monitorShowMoreBtn() {
      return this.$store.state.monitor.userMonitor?.records?.length > 4
    },
    welcomeIndex() {
      return this.$store.state.chat.welcomeIndex;
    },
    welcomeStep() {
      if (this.welcomeIndex < 5) {
        this.$store.commit('chat/setRobot', {text: this.$t('robot_message_8')})
        return 1
      } else if (this.welcomeIndex < 9) {
        this.$store.commit('chat/setRobot', {text: this.$t('robot_message_9')})
        return 2
      } else if (this.welcomeIndex < 14) {
        this.$store.commit('chat/setRobot', {text: this.$t('robot_message_10')})
        return 3
      } else {
        this.$store.commit('chat/setRobot', {text: this.$t('robot_message_11')})
        return 4
      }
    }
  },
  data() {
    return {
      coinShowMore: false,
      monitorShowMore: false,
      hideVideo: false,
      isOver: false,
    }
  },
  mounted() {
    this.$store.commit('chat/setPageName', 'welcome')
    this.$store.dispatch('chat/clearMessageList')
    this.$store.commit('chat/setWelcomeIndex', 0)
    if (this.$route.query.mode === 'dev') {
      this.hideVideo = true
      this.videoEnded()
    }
  },
  methods: {
    welcomeOver() {
      this.isOver = true
      setTimeout(() => {
        this.$store.dispatch('chat/clearMessageList')
        this.$router.replace(this.localeRoute('/reporting'))
      }, 2000)
    },
    videoEnded() {
      console.log('video ended', this.$store.state.chat.welcomeIndex)
      // 一秒后 销毁视频页面
      setTimeout(() => {
        this.hideVideo = true
      }, 1000)

      // 两秒后 聊天框从底部出现 并且开始发消息

      setTimeout(() => {
        const msg = this.$store.state.chat.welcomeList[this.$store.state.chat.welcomeIndex]
        this.$store.dispatch('chat/pushWelcomeMessage', msg)
      }, 3000)


    },
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

.step-finish-img{
  width: 18px;
  height: 18px;
}

@mixin afterBg {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.btn {
  width: 18px;
  height: 18px;
  background: #00FEB5;
  border-radius: 50%;
  text-align: center;
  font-size: 0.8rem;
  border: none;
  padding: 0;
  position: relative;
  outline: none;
}

// Shockwave
.btn--shockwave.is-active {
  animation: shockwaveJump 1s ease-out forwards;

  &:after {
  @include afterBg;
    animation: shockwave 1s .65s ease-out forwards;
  }

  &:before {
  @include afterBg;
    animation: shockwave 1s .5s ease-out forwards;
  }
}

@keyframes shockwaveJump {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.08);
  }
  50% {
    transform: scale(0.98);
  }
  55% {
    transform: scale(1.02);
  }
  60% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shockwave {
  0% {
    transform: scale(1);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 1px rgba(0, 0, 0, 0.15);
  }
  95% {
    box-shadow: 0 0 50px rgba(0, 0, 0, 0), inset 0 0 30px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(2.25);

  }
}


.step-loading {
  display: inline-block;
  border-width: 10px;
  border-radius: 50%;

  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  -o-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

.style-2 {
  border-style: double;
  border-color: #00FEB5 transparent;
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(359deg);
  }
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(359deg);
  }
}

@-o-keyframes spin {
  100% {
    -moz-transform: rotate(359deg);
  }
}

@keyframes spin {
  100% {
    transform: rotate(359deg);
  }
}


.show-more {
  cursor: pointer;
  color: rgba(140, 180, 189, 0.50);
  font-family: Avenir;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  width: 280px;

  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 7px;
    margin-left: 4px;
  }
}


@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.img-rotate {
  animation: rotate 1s linear infinite;
}


.add-monitoring-cards {
  width: 350px;
  display: flex;
  flex-wrap: wrap;
}

.step-box-anime {
  animation: moveB 2s forwards;
}

.step-box-anime2 {
  opacity: 1;
  animation: moveD 2s forwards;
}

.step-box {
  box-sizing: border-box;
  padding-left: 20px;
  height: 100%;
  width: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 30px;
  transform: translateX(100%);
  opacity: 0;

  .step-line {
    width: 1px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-left: 13px;
    border-left-color: transparent;
  }

  .step-content-border {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }

  .step-content {
    margin-left: 13px;
    min-height: 60px;
    box-sizing: border-box;
    padding: 20px 24px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    //
    //img {
    //  width: 24px;
    //  height: 24px;
    //  border-radius: 24px;
    //}
  }
}

.welcome-page {
  width: 100vw;
  height: cale(100vh - 88px);
  //background: rgba(5, 15, 33, .5);
  overflow-y: hidden;
  overflow-x: auto;
  padding-top: 12px;

  .welcome-content {
    width: 1050px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    border-radius: 36px 0 0 0;
    overflow: hidden;

    .chat-box-0 {
      width: 515px;
      opacity: 0;
    }

    .chat-box-anime {
      animation: moveA 1s 0s forwards;
    }

    .chat-box-anime2 {
      animation: moveC 1s 0s forwards;
    }
  }

}

@keyframes moveA {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


@keyframes moveC {
  0% {
    transform: translateY(0);
    opacity: 1;

  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

@keyframes moveB {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  50% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes moveD {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  50% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}


</style>
