<template>
  <div class="page-content">
    <div class="back"></div>
    <div class="report-left">
      <div class="Account">Account</div>
      <div class="Rectangle82">
        <div class="Ellipse245"></div>
        <div>
          <div class="saywteri2473 ellipsis">saywteri24735hawsaywteri24735hawsaywteri24735haw</div>
          <div class="wtewteri247">wtewteri247</div>
        </div>
      </div>
      <div class="Account Selected">Selected（6）
        <span>Edit</span>
      </div>
      <div class="Frame580">
        <div class="item" v-for="item in 6">
          <div class="Rectangle"></div>
          <div class="Bitcoin">Bitcoin</div>
          <div class="BTC">BTC</div>
        </div>

      </div>
      <div class="AddaNewCoin">+ Add a New Coin</div>
    </div>
    <div class="report-center">
      <div class="rc-top">
        <div class="rc-account">Account</div>
        <span>/</span>
        <div class="pic"></div>
        the account Morgan following
      </div>

      <div class="focus-list">
        <template v-for="item in 2">
          <AIFocus/>
        </template>
      </div>
    </div>
    <div class="right">
      <ChatIndex/>
    </div>

  </div>
</template>
<script>
import chatIndex from "~/components/chat/index.vue";
import AIFocus from '~/components/aiFocus/index.vue'

export default {
  name: 'Home',
  components: {
    ChatIndex: chatIndex,
    AIFocus
  },
  data() {
    return {
      user: 'ta'
    }
  },
  mounted() {


  },
  methods: {}
}
</script>
<style lang="less">

.ellipsis {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.page-content {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 1152px;
  border-radius: 31px;
  background: rgba(38, 64, 64, 0.2);
  backdrop-filter: blur(200px);
  position: relative;


  .back {
    width: 658.8px;
    height: 689px;
    transform: rotate(43.419579deg);
    border-radius: 176px 254px 176px 176px;
    background: linear-gradient(266.83deg, rgba(8, 148, 150, 0.6) -5.97%, rgba(3, 114, 54, 0.6) 99.31%);
    filter: blur(153.5px);
    position: absolute;
    left: -480px;
    z-index: -1;
    top: 107px;
  }


  .report-left {
    width: 252px;
    min-height: 300px;
    border-right: 2px solid rgba(140, 180, 189, 0.12);
    box-sizing: border-box;
    padding: 32px 24px 20px;

    .AddaNewCoin {
      height: 22px;
      color: rgba(206, 184, 100, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 16px;
      text-transform: capitalize;
      margin-top: 46px;
    }

    .Account {
      height: 24px;
      color: rgba(206, 184, 100, 1);
      font-family: aifontF;
      font-size: 20px;
      line-height: 120.000005%;
      text-transform: uppercase;

    }

    .Selected {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        height: 19px;
        color: rgba(140, 180, 189, 0.6);
        font-family: Avenir;
        font-weight: 500;
        font-size: 14px;
        text-transform: capitalize;
      }
    }

    .Rectangle82 {
      width: 204px;
      height: 58px;
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 8px;
      margin-top: 14px;
      margin-bottom: 40px;

      .Ellipse245 {
        width: 42px;
        height: 42px;
        border-radius: 42px;
        background-color: green;
        margin-right: 12px;
      }

      .saywteri2473 {
        width: 130px;
        height: 19px;
        color: rgba(255, 255, 255, 1);
        font-family: Avenir;
        font-weight: 500;
        font-size: 14px;
        text-transform: capitalize;
      }

      .wtewteri247 {
        height: 14px;
        color: rgba(206, 184, 100, 1);
        font-family: Avenir-Roman;
        font-size: 10px;
        text-transform: capitalize;
        margin-top: 2px;
      }
    }

    .Frame580 {
      margin-top: 24px;

      .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }

      .Rectangle {
        width: 32px;
        height: 32px;
        background-color: green;
        border-radius: 123.1px;
      }

      .Bitcoin {
        height: 20px;
        color: rgba(255, 255, 255, 1);
        font-family: Avenir-Heavy;
        font-size: 15px;
        text-transform: capitalize;
        margin: 0 12px 0;
      }

      .BTC {
        height: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-family: Avenir;
        font-weight: 500;
        font-size: 15px;
        text-transform: capitalize;
      }
    }

  }

  .report-center {
    width: 384px;
    padding: 32px 40px 0;
    border-right: 2px solid rgba(140, 180, 189, 0.12);

    .focus-list {

    }

    .rc-top {
      height: 14px;
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir-Roman;
      font-size: 10px;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      span {
        display: block;
        width: 7px;
        text-align: center;
      }

      .rc-account {
        height: 11px;
        color: rgba(140, 180, 189, 0.6);
        font-family: aifontF;
        font-size: 9px;
        line-height: 120.000005%;
        text-transform: uppercase;
      }

      .pic {
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background-color: green;
        margin-right: 3px;
      }

    }

  }
}

</style>
