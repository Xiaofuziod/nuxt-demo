<template>
  <div class="chat-box">
    <div class="chat-top chat-padding">
      <div class="chat-top-left">
        <div class="chat-top-image">
          <img src="@/assets/imgs/user/default.png" alt="">
        </div>
        <div class="chat-top-title">
          Received 🫡 Let me think about ...
        </div>
      </div>
      <div class="chat-top-icon" v-if="false">
        <img class="img1" src="@/static/images/chat/s1.svg" alt="">
        <img class="img2" src="@/static/images/chat/s3.svg" alt="">
      </div>
    </div>

    <div class="chat-content" ref="messagesContainer">
      <div class="chat-padding">
        <div v-for="(item,index) in messageList" :key="index">
          <!--AI焦点-->
          <div class="text-message-box1"
               v-if="item.context && item.context.hook && item.context.hook.type === 'FOCUS'">
            <div class="focus-box">
              <div class="focus-tip">
                <btn cursor="default">
                  <img src="@/static/images/chat/s2.svg" alt="">
                  <div>AI focus</div>
                </btn>
              </div>
              <div class="focus-text">
                If someone loves you,love them back unconditionally
              </div>
            </div>
          </div>
          <!--定制卡片内容-->
          <chat-card :layers="item.layers" v-if="item.layers && item.layers.length > 0"/>
          <!--欢迎的任务-->
          <welcomeTask v-if="showWelcome && item.source === 'T-brain'"
                       :message="item"/>
          <!--文本内容-->
          <template v-if="item.text">
            <div class="text-message-box1" v-if="item.source === 'USER'">
              <div class="text-message">
                {{ item.text }}
              </div>
            </div>
            <div class="text-message-box2" v-else>
              <div class="text-message-v2">
                <Typewriter @writerOver="writerOver" :text="item.text"/>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>

    <div class="input-box" :class="{'input-disable':disableSend}">
      <input type="text" v-model="message" :disabled="disableInput" @keydown.enter="sendMessage">
      <img class="img1" src="@/static/images/chat/send3.svg" alt="" @click="sendMessage">
    </div>

  </div>
</template>

<script>
import Typewriter from "@/components/Typewriter.vue";
import btn from "./components/btn.vue";
import uuid from "@/utils/uuid";
import chatCard from "./components/card.vue";
import welcomeTask from "./components/welcomeTask.vue";

export default {
  components: {
    Typewriter,
    btn,
    chatCard,
    welcomeTask
  },
  props: {
    showWelcome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: '',
      conversation_id: '',
      welcomeInputDisable: false
    }
  },
  computed: {
    messageList() {
      return this.$store.state.chat.messageList
    },
    disableInput() {
      if (this.showWelcome) {
        return !this.$store.state.chat.welcomeAddCoinFinish
      } else {
        return false
      }
    },
    disableSend() {
      return !this.message
    }
  },
  mounted() {
    this.$socket.on('messageevent', (data) => {
      this.getMessage(data);
    });
    this.$socket.on('connect', (data) => {
      console.log('Connected to socket server', data);
      if (data) {
        this.conversation_id = data
      }
    });

    if (this.showWelcome) {
      //  第一次进入页面，发送欢迎语
      const msg = this.$store.state.chat.welcomeList[this.$store.state.chat.welcomeIndex]
      this.$store.dispatch('chat/addMessage', msg)

      // 获取用户自选列表 和 监控列表
      this.$store.dispatch('coin/fetchUserCoinList')
      this.$store.dispatch('monitor/fetchUserMonitorList')

      // 获取热门推荐的币种 和信号源
      setTimeout(() => {
        this.$store.dispatch('coin/fetchCoinList', "Bitcoin")
        this.$store.dispatch('monitor/fetchMonitorList', "Bitcoin",)
      }, 3000)
    }
  },
  methods: {
    sendMessage() {
      if (!this.message) return
      let para = {
        conversation_id: this.conversation_id,
        seq_no: uuid(),
        source: "USER",
        context: null,
        language: "zh",
        text: this.message
      }
      this.$socket.emit('messageevent', para)
      this.messageList.push(para)
      this.message = ''
    },
    getMessage(data) {
      console.log('收到', data)
      // this.messageList.push({message: '收到：' + data.data.message})
    },
    writerOver() {
      const lastMsg = this.messageList[this.messageList.length - 1]
      if (lastMsg.source === 'T-brain') {
        // 自动下一句
        if (lastMsg.autoNext) {
          this.$store.dispatch('chat/welcomeToNext')
        }
        // 需要推荐热门币种
        if (lastMsg.needPushHotCoin) {
          let para = {
            seq_no: null,
            source: "ASSISTANT",
            context: null,
            language: "zh",
            text: '',
            layers: [
              {
                layer: "HOT_COINS",
                title: '热门推荐',
                data: {
                  coins: this.$store.state.coin.coinList
                }
              }
            ],
            more: false,
          }
          this.$store.dispatch('chat/addMessage', para)
        }
        // 需要推荐热门信号源
        if (lastMsg.needPushHotMonitor) {
          let para = {
            seq_no: null,
            source: "ASSISTANT",
            context: null,
            language: "zh",
            text: '',
            layers: [
              {
                layer: "HOT_SOURCES",
                title: '热门推荐',
                data: {
                  sources: this.$store.state.monitor.monitorList
                }
              }
            ],
            more: false,
          }
          this.$store.dispatch('chat/addMessage', para)
        }
      }
    },
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
  },
  beforeDestroy() {
    this.$socket.off('messageevent', this.getMessage);
  },
  watch: {
    messageList() {
      this.scrollToBottom()
    }
  },
}
</script>

<style lang="less" scoped>

.chat-box {
  width: 515px;
  background-color: rgba(38, 64, 64, 0.3);
  box-sizing: border-box;
  padding: 20px 0 20px;
  border-radius: 0 31px 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  .chat-padding {
    padding: 0 24px;
  }


  .input-box {
    width: 461px;
    height: 56px;
    border-radius: 8px;
    border: 0.4px solid rgba(140, 180, 189, 0.3);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px;
    margin-top: 10px;
    margin-left: 24px;

    img {
      width: 38px;
      height: 38px;
    }

    input {
      display: block;
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      color: rgba(255, 255, 255, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 13px;
      text-transform: capitalize;
    }
  }

  .input-disable {
    opacity: 0.4;
  }

  .chat-content {
    flex: 1;
    overflow-y: auto;


    .text-message-box2 {
      display: flex;
      align-items: flex-start;
    }

    .text-message-box1 {
      display: flex;
      justify-content: flex-end;
    }

    .text-message {
      box-sizing: border-box;
      padding: 16px 20px;
      border-radius: 16px;
      background: rgba(140, 180, 189, 0.1);
      color: rgba(255, 255, 255, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 13px;
      text-transform: capitalize;
      margin-top: 14px;
      display: table;
    }

    .text-message-v2 {
      box-sizing: border-box;
      padding: 16px 20px;
      border-radius: 16px;
      color: rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 255, 255, 0.1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 13px;
      text-transform: capitalize;
      margin-top: 14px;
      display: table;
    }


    .focus-box {
      width: 277px;
      height: 62px;
      border-radius: 16px;
      background: rgba(140, 180, 189, 0.1);
      position: relative;
      margin-top: 34px;

      .focus-text {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 15px 16px 11px 20px;
        color: rgba(255, 255, 255, 1);
        font-family: Avenir;
        font-weight: 500;
        font-size: 13px;
        text-transform: capitalize;
      }
    }
  }

  .focus-tip {
    height: 25px;
    position: absolute;
    top: -12px;
  }

  .chat-top {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 18px;

    .chat-top-left {
      display: flex;
      align-items: center;
    }

    .chat-top-image {
      width: 48px;
      height: 48px;
      border-radius: 48px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .chat-top-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      .img1 {
        width: 28px;
        margin-right: 25px;
      }

      .img2 {
        width: 24px;
      }
    }

    .chat-top-title {
      width: 220px;
      height: 38px;
      border-radius: 19px 19px 19px 0;
      background: rgba(138, 173, 188, 0.1);
      backdrop-filter: blur(217.899994px);
      color: rgba(255, 255, 255, 0.36);
      font-family: Avenir;
      font-weight: 500;
      font-size: 12px;
      text-transform: capitalize;
      text-align: center;
      line-height: 38px;
      margin-left: 20px;
    }
  }
}

</style>
