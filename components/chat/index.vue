<template>
  <div class="chat-box">

    <div class="chat-top">
      <div class="chat-top-left">
        <div class="chat-top-image"></div>
        <div class="chat-top-title">
          Received 🫡 Let me think about ...
        </div>
      </div>
      <div class="chat-top-icon">
        <img class="img1" src="@/static/images/chat/s1.svg" alt="">
        <img class="img2" src="@/static/images/chat/s3.svg" alt="">
      </div>
    </div>

    <div class="chat-content" ref="messagesContainer">
      <div class="focus-box">
        <div class="focus">
          <img src="@/static/images/chat/s2.svg" alt="">
          AI focus
        </div>
        <div class="focus-text">
          If someone loves you,love them back unconditionally
        </div>
      </div>

      <div class="chat-card">
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

      <div class="text-message" v-for="(item,index) in messageList" :key="index">
        {{ item.message }}
      </div>
    </div>

    <div class="input-box">
      <input type="text" v-model="message" @keydown.enter="sendMessage">
      <img class="img1" src="@/static/images/chat/send2.svg" alt="" @click="sendMessage">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messageList: [
        {message: 'The factors that led to the halving of Bitcoin？'}
      ]
    }
  },
  mounted() {
    this.$socket.on('messageevent', (data) => {
      this.getMessage(data);
    });
    this.$socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  },
  methods: {
    sendMessage() {
      this.$socket.emit('messageevent', JSON.stringify({message: this.message}))
      this.messageList.push({message: "发送:" + this.message})
      this.message = ''
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    getMessage(data) {
      console.log('收到',data)
      this.messageList.push({message: '收到：' + data.data.message})
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
  },
  beforeDestroy() {
    this.$socket.off('messageevent', this.getMessage);
  },
}
</script>

<style lang="less" scoped>

.chat-box {
  width: 515px;
  background-color: rgba(38, 64, 64, 0.3);
  box-sizing: border-box;
  padding: 20px 24px 20px;
  border-radius: 0 31px 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;


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
    margin-top: 20px;

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

  .chat-content {
    flex: 1;
    overflow-y: auto;

    .ask-list {
      .ask-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 6px 6px 6px 12px;
        margin-bottom: 10px;

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

    .chat-card {
      box-sizing: border-box;
      padding: 14px 20px 16px;
      width: 370px;
      border-radius: 16px;
      background: rgba(38, 64, 64, 0.1);
      margin-top: 12px;
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

      .focus {
        width: 93px;
        height: 25px;
        color: rgba(25, 40, 54, 1);
        font-size: 12px;
        line-height: 120.000005%;
        background: rgba(206, 184, 100, 1);
        backdrop-filter: blur(108px);
        position: absolute;
        top: -12px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        text-transform: uppercase;
        overflow: hidden;
        font-family: Gruppe F;

        &::after {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          background-color: black;
          position: absolute;
          top: -6px;
          left: -6px;
          transform: rotate(-45deg);
        }

        &::before {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          background-color: black;
          position: absolute;
          right: -6px;
          bottom: -6px;
          transform: rotate(-45deg);
        }


        img {
          width: 16px;
          height: 16px;
          margin-left: 6px;
          margin-right: 2px;
        }
      }
    }

  }

  .chat-top {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .chat-top-left {
      display: flex;
      align-items: center;
    }

    .chat-top-image {
      width: 48px;
      height: 48px;
      border-radius: 48px;
      background-color: green;
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
