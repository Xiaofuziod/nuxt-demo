<template>
  <div>
    <div v-for="item in layers">
      <!--信号源相关-->
      <div class="chat-card" v-if="item.type === 'HOT_SOURCES'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/hot.svg" alt="">
          {{ item.title }}
        </div>
        <monitor-list :list="item.data?.sources"/>
      </div>

      <!--预测相关-->
      <div class="chat-card" v-if="item.type === 'PREDICTION'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/returns.svg" alt="">
          {{ item.title }}
        </div>
        <div class="returns-box">
          <div class="returns-top">
            <div class="returns-btn">
              <btn class="btn" type="returns">
                <img class="img1" src="@/static/images/chat/up.svg" alt="" v-if="item.data.returns > 0">
                <img class="img1" src="@/static/images/chat/down.svg" alt="" v-else>
                <div class="returns-btn-text"
                     :class="{ 'positive': item.data.returns > 0, 'negative': item.data.returns < 0}"
                >购买信号{{ item.data.returns > 0 ? '强' : '弱' }}</div>
              </btn>
            </div>

            <div class="coin-name">
              <img :src="item.data.coin.logo" class="coin-logo" :alt="item.data.coin.logo">
              <span class="name">{{ item.data.coin.name }}</span>
              <span class="coin-symbol">{{ item.data.coin.symbol }}</span>
            </div>
          </div>

          <div class="returns-title">
            Positive Developments
          </div>
          <ul class="returns-list">
            <li v-for="reason of item.data.advantages">
              {{ reason }}
            </li>
          </ul>
          <div class="returns-title">
            Potential Concerns
          </div>
          <ul class="returns-list">
            <li v-for="reason of item.data.disadvantages">
              {{ reason }}
            </li>
          </ul>
          <div class="returns-title">
            conclusion
          </div>
          <p class="returns-conclusion">{{ item.data.conclusion }}</p>
        </div>
      </div>

      <div class="chat-card" v-if="item.type === 'LOG'">
        <div class="chat-card-title">
          {{ item.toolName }} - {{ item.type }}
        </div>
        <p style="color: white;margin-bottom: 20px">{{ item.log }}</p>
      </div>

      <!--错误相关-->
      <div class="chat-card" v-if="item.type === 'ERROR'">
        <div class="chat-card-title">
          Code: {{ item.code }} Error: {{ item.error }}
        </div>
      </div>

      <!--币相关-->
      <div class="chat-card" v-if="item.type === 'HOT_COINS'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/hot.svg" alt="">
          {{ item.title }}
        </div>
        <coin-list :coinList="item.data?.coins"/>
      </div>

      <!--监控信号-->
      <div class="chat-card" v-if="item.type === 'HOT_SOURCES'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/s4.svg" alt="">
          {{item.title}}
        </div>
        <div class="source-row">
          <div class="source-item" v-for="item in 2">
            <div class="source-item-item">
              If someone loves you,love them ...
              If someone loves you,love them ...
              If someone loves you,love them ...
            </div>
            <div class="source-item-user">
              <div class="source-item-user-pic"></div>
              <div class="source-item-user-right">
                <div class="source-item-user-right-nickname">Morgan
                  <img class="img1" src="@/static/images/chat/dui.svg" alt="">
                </div>
                <div class="source-item-user-right-username">@lamdcinvestor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--问答-->
      <div class="chat-card" v-if="item.type === 'ASK'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/ai.svg" alt="">
          You can ask
        </div>
        <div class="ask-list">
          <div class="ask-item" v-for="item in 3">
            The factors that led to the halving of Bitcoin？
            <img class="img1" src="@/static/images/chat/send.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import coinList from "@/components/chat/components/coinList.vue";
import monitorList from "@/components/chat/components/monitorList.vue";
import Btn from "@/components/chat/components/btn.vue";

export default {
  components: {
    Btn,
    coinList,
    monitorList
  },
  props: {
    layers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>

.coin-name {
  display: flex;
  align-items: center;

  .coin-logo {
    width: 16px;
    height: 16px;
    border-radius: 32px;
  }

  .name {
    color: #FFF;
    font-family: Avenir;
    font-size: 10px;
    font-style: normal;
    padding: 0 4px;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;
    max-width: 120px;
    // 超出省略
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .coin-symbol {
    color: rgba(255, 255, 255, 0.50);
    font-family: Avenir;
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
}

.returns-box {
  width: 334px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(140, 180, 189, 0.10);
  box-sizing: border-box;
  padding: 13px 12px;
  margin-bottom: 14px;

  .returns-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .returns-title {
    color: rgba(255, 255, 255, 0.70);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    margin-bottom: 8px;
  }

  .returns-btn {
    width: 93px;
    height: 25px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 16px;
      height: 16px;
    }

    .returns-btn-text {
      color: #F44653;
      font-family: "Gruppe F";
      font-size: 10px;
      font-style: normal;
      font-weight: 800;
      text-transform: capitalize;
    }
    .positive {
      color: #F44653;
    }
    .negative{
      color: #42C525;
    }

  }

  .returns-list {
    box-sizing: border-box;
    padding-left: 13px;

    li {
      color: rgba(255, 255, 255, 0.70);
      font-family: Avenir;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
      margin-bottom: 8px;
    }
  }

  .returns-conclusion {
    color: rgba(255, 255, 255, 0.70);
    font-family: Avenir;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }
}

.chat-card {
  box-sizing: border-box;
  padding: 14px 20px 0;
  min-width: 370px;
  max-width: 400px;
  border-radius: 16px;
  margin-top: 12px;
  border: 2px solid rgba(255, 255, 255, 0.10);
}

.ask-list {
  .ask-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 5px 12px;
    margin-bottom: 11px;
    cursor: pointer;
    border-radius: 8px;
    border: 0.4px solid rgba(140, 180, 189, 0.3);
    color: #5D7B86;
    font-family: Avenir;
    font-size: 13px;
    font-weight: 350;
    text-transform: capitalize;

    img {
      width: 16px;
      height: 16px;
    }
  }
}

.chat-card-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }

  color: rgba(206, 184, 100, 1);
  font-family: Avenir;
  font-weight: 500;
  font-size: 12px;
}

.source-row {
  display: flex;
  align-items: center;
  margin-bottom: 23px;

  .source-item {
    width: 154px;
    border-radius: 8px;
    background: rgba(140, 180, 189, 0.1);
    box-sizing: border-box;
    padding: 12px 12px 10px;
    margin-right: 10px;

    .source-item-item {
      height: 32px;
      color: rgba(255, 255, 255, 0.7);
      font-family: Avenir;
      line-height: 16px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;

    }

    .source-item-user {
      display: flex;
      align-items: center;
      margin-top: 5px;

      .source-item-user-pic {
        width: 28px;
        height: 28px;
        border-radius: 28px;
        overflow: hidden;
        background-color: green;
      }

      .source-item-user-right {
        margin-left: 4px;

        .source-item-user-right-nickname {
          color: rgba(255, 255, 255, 1);
          font-family: Avenir-Heavy;
          font-size: 14px;

          img {
            width: 8px;
            height: 8px;
            margin-left: 2px;
          }
        }

        .source-item-user-right-username {
          color: rgba(255, 255, 255, 0.5);
          font-family: Avenir-Book;
          font-size: 12px;
        }

      }
    }


  }
}
</style>
