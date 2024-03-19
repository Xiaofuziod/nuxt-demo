<template>
  <div class="chat-box">
    <div class="chat-top chat-padding">
      <div class="chat-top-left">
        <div class="chat-top-image">
          <img src="@/assets/imgs/user/default.png" alt="">
        </div>
        <div class="chat-top-title">{{ $t("chat_index_chat-top-title_1") }}</div>
      </div>
      <div class="chat-top-icon" v-if="false">
        <img class="img1" src="@/static/images/chat/s1.svg" alt="">
        <img class="img2" src="@/static/images/chat/s3.svg" alt="">
      </div>
    </div>

    <div class="chat-content" ref="messagesContainer" @scroll="handleScroll">
      <div class="chat-padding">
        <div v-for="(item,index) in messageList" :key="item.seqNo + '-' + index">
          <!--AI焦点-->
          <div class="text-message-box1"
               v-if="item.context && item.context.hook && item.context.hook.type === 'FOCUS'">
            <div class="focus-box">
              <div class="focus-tip">
                <btn cursor="default">
                  <img src="@/static/images/chat/s2.svg" alt="">
                  <div>{{ $t("chat_index_div_1") }}</div>
                </btn>
              </div>
              <div class="focus-text">{{ item.text }}</div>
            </div>
          </div>
          <!--定制卡片内容-->
          <chat-card :layers="item.layers" v-if="item.layers && item.layers.length > 0"/>
          <!--欢迎的任务-->
          <welcomeTask v-if="showWelcome && item.source === 'T-brain'" :message="item"/>
          <!--文本内容-->
          <template v-if="item.text && !(item.context && item.context.hook)">
            <div class="text-message-box1" v-if="item.source === 'USER'">
              <div class="text-message">
                {{ item.text }}
              </div>
            </div>
            <div class="text-message-box2" v-else>
              <div class="text-message-v2" v-if="item.source === 'T-brain'">
                <Typewriter @writerOver="writerOver" :text="item.text"/>
              </div>
              <div class="text-message-v2" v-else>{{item.text}}</div>
            </div>
          </template>
          <!--loading 内容-->
          <template v-if="item.loading">
            <div class="text-message-box2">
              <div class="text-message-v2">
                <div class="chat-bubble">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
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
      socketSessionId: '',
      welcomeInputDisable: false,
      isViewingHistory: false,
    }
  },
  computed: {
    conversationId() {
      return this.$store.state.chat.conversationId
    },
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
    },
    isFinished() {
      return this.$store.state.chat.isFinished
    },
    msgLength() {
      return this.messageList.length
    }
  },
  mounted() {
    this.$socket.on('chat', this.onWebsocketReceiveMessage);
    this.$socket.on('connect', this.onWebsocketConnect);
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
    } else {
      this.loadEarlierMessages()
    }
  },
  methods: {
    handleScroll(e) {
      const {scrollTop} = e.target;
      if (!this.isLoading && !this.isFinished && scrollTop <= 0) {
        this.isLoading = true
        this.loadEarlierMessages()
      }
    },
    async loadEarlierMessages() {
      // 加载历史聊天对话
      // NOTE: 对话 id 为空意味着还没获取过聊天历史，下面的 api 会在返回历史消息的同时附上对话 id。
      //   对话 id 需要附加到每次的对话消息中，后端凭借该 id 来区别不同的对话上下文。
      //   这种方式是针对当前用户只有一个会话的情况而简化了交互逻辑。
      //   更一般的做法应该是先获取对话列表，然后用户点击哪个对话，再根据点击对话的 id 来拉取历史消息。

      // 获取历史消息之前的滚动条高度
      const previousHeight = this.$refs.messagesContainer?.scrollHeight;
      await this.$store.dispatch('chat/fetchEarlierMessages', "fakeUserNo")
      // 插入后，调整滚动位置
      this.$nextTick(() => {
        const currentHeight = this.$refs.messagesContainer?.scrollHeight;
        this.$refs.messagesContainer.scrollTop += currentHeight - previousHeight;
      });
      this.isLoading = false
    },
    onWebsocketReceiveMessage(data) {
      this.getMessage(data);
    },
    onWebsocketConnect(data) {
      console.log('Connected to socket server', data);
      if (data) {
        this.socketSessionId = data
      }
    },
    sendMessage() {
      if (!this.message || !this.conversationId) return
      // 用户发送的消息的 seqNo 是当前对话中最大的 seqNo + 1。如果当前对话为空，则 seqNo 为 1。
      const nextSeqNo = this.messageList.length === 0 ? 1 :
          this.messageList[this.messageList.length - 1].seqNo + 1;
      let para = {
        conversationId: this.conversationId,
        seqNo: nextSeqNo,
        source: "USER",
        context: null,
        language: this.$store.$i18n.locale,
        text: this.message
      }
      console.log('发送', para)
      this.$socket.emit('chat', para)
      this.$store.dispatch('chat/addMessage', para)
      this.message = ''
      this.scrollToBottom()
    },
    getMessage(data) {
      // console.log('收到', data)
      if (data.conversationId !== this.conversationId) {
        console.log(`ignore message from other conversation:`, data)
        return
      }
      this.scrollToBottom()
      this.$store.dispatch('chat/pushSubscriptMessage', data)
    },
    writerOver() {
      const lastMsg = this.messageList[this.messageList.length - 1]
      if (lastMsg.source === 'T-brain') {
        // 自动下一句
        if (lastMsg.autoNext) {
          this.$store.dispatch('chat/welcomeToNext')
          this.scrollToBottom()
        }
        // 需要推荐热门币种 或者 热门信号源
        if (lastMsg.needPushHotCoin || lastMsg.needPushHotMonitor) {
          const para = {
            seqNo: null,
            source: "ASSISTANT",
            context: null,
            text: '',
            layers: [
              {
                type: lastMsg.needPushHotCoin ? "HOT_COINS" : "HOT_SOURCES",
                title: '热门推荐',
                data: {
                  coins: this.$store.state.coin.coinList,
                  sources: this.$store.state.monitor.monitorList
                }
              }
            ],
            more: false,
          }
          this.$store.dispatch('chat/addMessage', para)
          this.scrollToBottom()
        }
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer;
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        })
      });
    },
  },
  beforeDestroy() {
    console.log('Socket disconnect')
    this.$socket.off('chat', this.onWebsocketReceiveMessage);
    this.$socket.off('connect', this.onWebsocketConnect);
  },
  watch: {
    msgLength(newValue, oldValue) {
      if (newValue - oldValue < 5) {
        this.scrollToBottom()
      }
    }
  }
}
</script>

<style lang="less" scoped>

/* 聊天气泡的基本样式 */
.chat-bubble {
  display: flex;
  gap: 5px; /* 点之间的间隔 */
  padding: 6px;
}

/* 点的基本样式 */
.dot {
  width: 5px;
  height: 5px;
  background-color: rgba(217, 217, 217, 0.2);
  border-radius: 50%;
  animation: blink 1.5s infinite; /* 应用动画 */
}

/* 定义动画 */
@keyframes blink {
  0%, 100% {
    background-color: rgba(217, 217, 217, 0.2);
  }
  50% {
    background-color: #D9D9D9;
  }
}

/* 为每个点设置不同的动画延迟，实现轮流变色的效果 */
.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.4s;
}

.dot:nth-child(3) {
  animation-delay: 0.8s;
}


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
      max-width: 90%;
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
      max-width: 420px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 16px 20px;
      border-radius: 16px;
      color: rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 255, 255, 0.1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 13px;
      margin-top: 14px;
      //display: table;
      white-space: pre-line;
    }


    .focus-box {
      width: 277px;
      //height: 62px;
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
      height: 38px;
      padding: 0 20px;
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
