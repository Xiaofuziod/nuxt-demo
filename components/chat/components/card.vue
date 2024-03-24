<template>
  <div>
    <div v-for="item in layers">
      <!--欢迎页的 信号源相关-->
      <div class="chat-card" v-if="item.type === 'MONITORING_SIGNAL'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/hot.svg" alt="">
          {{ item.title }}
        </div>
        <monitor-list :list="item.data?.datas"/>
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
                >{{ item.data.returns > 0 ? $t('StrongBullish') : $t('StrongBearish') }}
                </div>
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
          {{ item.title }}
        </div>
        <div class="source-row">
          <div class="source-item" v-for="n in item.data?.news"
               @click="goDetail(n)" :key="n.id"
          >
            <div class="source-item-item">
              {{ n.body }}
            </div>
            <div class="source-item-user">
              <div class="source-item-user-pic">
                <img v-if="n.logo" :src="n.logo" alt="">
              </div>
              <div class="source-item-user-right">
                <div class="source-item-user-right-nickname">
                  <div>
                    {{ n.name }}
                  </div>
                  <img class="img1" src="@/static/images/chat/dui.svg" alt="">
                </div>
                <div class="source-item-user-right-username">{{ n.uid }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--简报-->
      <div class="chat-card" v-if="item.type === 'COIN_INTRODUCTION'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/s4.svg" alt="">
          {{ item.title }}
        </div>
        <div class="returns-box">
          <div class="returns-title">
            {{$t('INTRODUCTION')}}
          </div>
          <div class="returns-desc">
            24h内，社区讨论热度增加，多位Kol和新闻发布利好观点，较多新闻也解释出利好的信号，按照历史趋势，高热度且持续利好，是涨幅初期的一种关键表现
          </div>
          <div class="returns-title">
            {{$t('MARKET')}}
          </div>
          <div class="jb-box">
            <div class="jb-box-price">{{ $t('PRICE') }}：</div>
            <coin-list :coinList="[item.coin]" :hideOption="true"/>
          </div>
          <div style="margin-bottom: 10px">
            <my-echarts from="chat" :list="item.market"/>
          </div>


          <template v-if="item.address">
            <div class="returns-title">
              {{$t('Exchange')}}
            </div>
            <div class="returns-desc">
              {{$t('Ethereum')}}：
            </div>
          </template>


          <div class="returns-title">
            {{ $t('LINKS') }}
          </div>
          <div class="link-box">
            <a class="link-item"
               v-if="item.links.website && item.links.website.length > 0"
               :href="item.links.website[0]" target="_blank"
            >
              <img src="@/assets/imgs/chat/link1.svg" alt="">
              {{$t('Website')}}
            </a>
            <a class="link-item"
                 v-if="item.links?.technical_doc && item.links?.technical_doc.length > 0"
                 :href="item.links?.technical_doc[0]" target="_blank"
            >
              <img src="@/assets/imgs/chat/link1.svg" alt="">
              {{$t('Whitepaper')}}
            </a>
            <a class="link-item"
                 v-if="item.links?.source_code && item.links?.source_code.length > 0"
                 :href="item.links?.source_code[0]" target="_blank"
            >
              <img src="@/assets/imgs/chat/link1.svg" alt="">
              {{$t('GitHub')}}
            </a>
            <a class="link-item"
                 v-if="item.links?.twitter  && item.links?.twitter .length > 0"
                 :href="item.links?.twitter [0]" target="_blank"
            >
              <img src="@/assets/imgs/chat/link1.svg" alt="">
              X
            </a>
          </div>
        </div>
      </div>

      <!--      币 趋势-->
      <div class="chat-card" v-if="item.type === 'COIN_QUOTES'">
        <coin-list :coinList="item.data?.datas"/>
        <my-echarts from="chat" :list="item.data?.datas[0]?.market"/>
      </div>

      <!--问答-->
      <div class="chat-card" v-if="item.type === 'YOU_CAN_ASK'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/ai.svg" alt="">
          {{item.title}}
        </div>
        <div class="ask-list">
          <div class="ask-item" v-for="(q,i) in item.data?.questions" :key="i" @click="sendQuestion(q)">
            {{q}}
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
import MyEcharts from "@/components/echarts/index.vue";

export default {
  components: {
    Btn,
    coinList,
    monitorList,
    MyEcharts
  },
  props: {
    layers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    goDetail(val) {
      console.log(val)
      if (!val.link) return
      window.open(val.link, '_blank')
    },
    sendQuestion(val) {
      this.$store.dispatch('chat/sendUserMessage', {text: val})
    }
  }
}
</script>
<style lang="less" scoped>

.link-box {
  display: flex;
  align-items: center;

  .link-item {
    display: flex;
    align-items: center;
    margin-right: 8px;
    padding: 5px 10px;
    cursor: pointer;
    text-decoration: none;

    border-radius: 4px;
    background: rgba(138, 173, 188, 0.10);
    backdrop-filter: blur(108.94999694824219px);

    color: #CEB864;
    font-family: Avenir;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;

    img {
      width: 14px;
      height: 14px;
      margin-right: 4px;
    }
  }
}

.coin-name {
  display: flex;
  align-items: center;

  .coin-logo {
    width: 24px;
    height: 24px;
    border-radius: 32px;
  }

  .name {
    color: #FFF;
    font-family: Avenir;
    font-size: 14px;
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
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
}

.returns-box {
  margin-bottom: 14px;

  .returns-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .returns-title {
    color: #FFF;
    font-family: "Gruppe F";
    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%; /* 14.4px */
    margin-bottom: 8px;
  }

  .jb-box {
    display: flex;
    align-items: center;
    padding-bottom: 4px;

    .jb-box-price {
      color: rgba(255, 255, 255, 0.70);
      font-family: Avenir;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
    }

  }

  .returns-desc {
    color: rgba(255, 255, 255, 0.70);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 14px;
  }

  .returns-btn {
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
      font-size: 12px;
      font-style: normal;
      font-weight: 800;
      text-transform: capitalize;
    }

    .positive {
      color: #F44653;
    }

    .negative {
      color: #42C525;
    }

  }

  .returns-list {
    box-sizing: border-box;
    padding-left: 13px;

    li {
      color: rgba(255, 255, 255, 0.70);
      font-family: Avenir;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 8px;
    }
  }

  .returns-conclusion {
    color: rgba(255, 255, 255, 0.70);
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: pre-line;
  }
}

.chat-card {
  box-sizing: border-box;
  padding: 14px 20px 0;
  min-width: 370px;
  max-width: 440px;
  border-radius: 16px;
  margin-top: 12px;
  border: 2px solid rgba(255, 255, 255, 0.10);
  display: inline-block;
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
  max-width: 100%;
  overflow-x: auto;

  .source-item {
    width: 154px;
    border-radius: 8px;
    background: rgba(140, 180, 189, 0.1);
    box-sizing: border-box;
    padding: 12px 12px 10px;
    margin-right: 10px;
    cursor: pointer;

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
        img {
          width: 100%;
          height: 100%;
        }
      }

      .source-item-user-right {
        margin-left: 4px;

        .source-item-user-right-nickname {
          color: rgba(255, 255, 255, 1);
          font-family: Avenir-Heavy;
          font-size: 14px;
          display: flex;
          align-items: center;

          div {
            width: 85px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }



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
