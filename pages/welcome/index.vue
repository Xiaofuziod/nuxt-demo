<template>
  <div class="welcome-page">
    <div class="welcome-content">
      <div class="chat-box">
        <chat/>
      </div>
      <div class="step-box">
        <div class="step-title">
          <div class="step-title-icon">
            <img src="@/assets/imgs/chat/finish.svg" alt="">
          </div>
          <div class="step-title-text">
            Welcome
          </div>
        </div>
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
          <div class="add-text">
            + 添加
          </div>
        </div>
        <div class="step-title">
          <div class="step-title-icon">
            <img src="@/assets/imgs/chat/finish.svg" alt="">
          </div>
          <div class="step-title-text">
            监控信号源
          </div>
        </div>
        <div class="step-content step-content-border">
          <div class="add-text">
            + 添加
          </div>
        </div>
        <div class="step-title">
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

export default {
  layout: 'welcome',
  components: {
    chat
  },
  data() {
    return {
      //
    }
  },
}
</script>

<style lang="less" scoped>

.step-box {
  box-sizing: border-box;
  padding-left: 20px;

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

  .welcome-content {
    width: 850px;
    height: calc(100vh - 100px);
    margin: 100px auto 0;
    display: flex;

    .chat-box {
      width: 515px;
    }
  }

}

</style>
