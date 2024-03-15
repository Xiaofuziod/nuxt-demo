<template>
  <div class="chat-card">
    <div v-for="item in layers" :key="item.layer">
      <!--信号源相关-->
      <template v-if="item.layer === 'HOT_SOURCES'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/hot.svg" alt="">
          热门信号源
        </div>
        <monitor-list :list="item.data?.sources"/>
      </template>


      <!--币相关-->

      <template v-if="item.layer === 'HOT_COINS'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/hot.svg" alt="">
          热门推荐
        </div>
        <coin-list :coinList="item.data?.coins"/>
      </template>

      <!--监控信号-->
      <template v-if="item.layer === 'Signal_source'">
        <div class="chat-card-title">
          <img class="img1" src="@/static/images/chat/s4.svg" alt="">
          Signal source
        </div>
        <div class="source-row">
          <div class="source-item" v-for="item in 3">
            <div class="source-item-item">
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
      </template>

      <!--问答-->

      <template v-if="item.layer === 'ASK'">
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
      </template>

    </div>

  </div>
</template>
<script>
import coinList from "@/components/chat/components/coinList.vue";
import monitorList from "@/components/chat/components/monitorList.vue";

export default {
  components: {
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
    return {
      unstartMonitors: []
    }
  }
}
</script>
<style lang="less">
.chat-card {
  box-sizing: border-box;
  padding: 14px 20px 16px;
  width: 370px;
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
    padding: 6px 6px 6px 12px;
    margin-bottom: 10px;
    cursor: pointer;

    height: 26px;
    border-radius: 8px;
    border: 1px solid rgba(140, 180, 189, 0.3);

    color: rgba(93, 123, 134, 1);
    font-family: Avenir-Book;
    font-size: 10px;
    text-transform: capitalize;

    img {
      width: 13px;
      height: 13px;
    }
  }
}

.chat-card-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  img {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }

  height: 12px;
  color: rgba(206, 184, 100, 1);
  font-family: Avenir;
  font-weight: 500;
  font-size: 9px;
  text-transform: uppercase;
}

.source-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;

  .source-item {
    width: 102px;
    height: 63px;
    border-radius: 8px;
    background: rgba(140, 180, 189, 0.1);
    box-sizing: border-box;
    padding: 10px 12px 7px;

    .source-item-item {
      height: 22px;
      color: rgba(255, 255, 255, 0.7);
      font-family: Avenir-Roman;
      font-size: 8px;
      text-transform: capitalize;
    }

    .source-item-user {
      display: flex;
      align-items: center;
      margin-top: 8px;

      .source-item-user-pic {
        width: 16px;
        height: 16px;
        border-radius: 16px;
        overflow: hidden;
        background-color: green;
      }

      .source-item-user-right {
        margin-left: 5px;

        .source-item-user-right-nickname {
          height: 8px;
          color: rgba(255, 255, 255, 1);
          font-family: Avenir-Heavy;
          font-size: 6px;
          text-transform: capitalize;

          img {
            width: 5px;
            height: 5px;
            margin-left: 2px;
          }
        }

        .source-item-user-right-username {
          height: 8px;
          color: rgba(255, 255, 255, 0.5);
          font-family: Avenir-Book;
          font-size: 6px;
          text-transform: capitalize;
        }

      }
    }


  }
}
</style>
