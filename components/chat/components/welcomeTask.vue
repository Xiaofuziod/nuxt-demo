<template>
  <div>
    <div class="text-message-v2" v-if="message.type === 'taskStart' || message.type === 'taskFinish' ">
      {{ message.taskText }}
      <div class="start-btn-box" v-if="message.startBtnShow">
        <div class="start-btn" @click="startBtnClick">
          <btn>
            <span style="padding-left: 5px">{{ $t("welcomeTask_btn_1") }}</span>
          </btn>
        </div>
      </div>
    </div>

    <div class="text-message-v2" v-if="message.type === 'task' && !message.finish" style="position: relative">
      <div class="task-tip">
        <btn>
          <img src="@/assets/imgs/chat/task.svg" alt="">
          {{ message.taskName }}
        </btn>
      </div>
      <div class="task-title">
        {{ message.title }}
        <div class="task-title-right" v-if="message.canSkip" @click="taskFinish">
          跳过
          <img src="@/assets/imgs/chat/more.svg" alt="">
        </div>
      </div>
      <div class="task-desc">
        <!--添加自选后，Taurion会为你的自选<span>{{ $t("welcomeTask_span_1") }}</span>，协助你减少市场噪音-->
        {{ message.desc }}
      </div>
      <div class="start-btn-box">
        <div class="start-btn" @click="showSelect">
          <btn2 type="2">{{ $t("welcomeTask_btn_3") }}</btn2>
        </div>
        <div class="start-btn" @click="taskFinish">
          <btn :disable="finishBtnDisable">
            <span style="padding-left: 5px">{{ $t("welcomeTask_btn_2") }}</span>
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import btn from "@/components/chat/components/btn.vue";
import btn2 from "@/components/chat/components/btn2.vue";

export default {
  components: {
    btn,
    btn2
  },
  props: {
    message: {
      type: Object,
      default: () => {

      }
    }
  },
  data() {
    return {}
  },
  computed: {
    welcomeIndex() {
      return this.$store.state.chat.welcomeIndex
    },
    userCoinList() {
      return this.$store.state.coin.userCoinList
    },
    userMonitorList() {
      return this.$store.state.monitor.userMonitorList
    },
    finishBtnDisable() {
      return this.message.searchType === 'coin' ? this.userCoinList.length === 0 : false
    },
    messageList() {
      return this.$store.state.chat.messageList
    }
  },
  mounted() {
    if (this.message.type === 'task') {
      setTimeout(() => {
        this.$store.dispatch('chat/welcomeToNext')
      }, 1000)
    }
  },
  methods: {
    async taskFinish() {
      if (this.message.searchType === 'coin' && this.userCoinList.length === 0) {
        return this.$toast.info('请至少保留一个加密货币')
      }
      const idx = this.messageList.findIndex(item => item.id === this.message.id)
      await this.$store.commit('chat/updateWelcomeAddCoinFinish', true)
      await this.$store.commit('chat/updateMessage', {
        index: idx,
        message: {...this.message, finish: true}
      })
      await this.$store.dispatch('chat/welcomeToNext')
    },
    startBtnClick() {
      const idx = this.messageList.findIndex(item => item.id === this.message.id)
      this.$store.commit('chat/updateMessage', {
        index: idx,
        message: {...this.message, startBtnShow: false}
      })
      if (this.message.type === 'taskFinish') {
        this.$toast.success('任务完成')
        this.$store.dispatch('chat/clearMessageList')
        setTimeout(() => {
          this.$router.replace('/reporting')
        }, 1000)
      } else {
        this.$store.dispatch('chat/welcomeToNext')
      }
    },
    showSelect() {
      if (this.message.searchType === 'coin') {
        this.$store.commit('coin/setAddCoinShow', true)
      } else {
        this.$store.commit('monitor/setAddMonitorShow', true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.text-message-box2 {
  width: 100%;
  display: flex;
  align-items: flex-start;
}

.task-title {
  font-family: Avenir;
  font-size: 12px;
  font-weight: 800;
  line-height: 16px;
  margin-top: 10px;
  color: rgba(206, 184, 100, 1);

  display: flex;
  align-content: center;
  justify-content: space-between;

  .task-title-right {
    color: #8CB4BD;
    font-family: Avenir;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 7px;
      height: 7px;
      margin-left: 4px;
    }
  }
}

.task-desc {
  font-family: Avenir;
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  margin-top: 3px;

  span {
    color: #CEB864;
  }
}

.start-btn-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .start-btn {
    height: 25px;
    margin-top: 15px;
    cursor: pointer;
    float: right;
    margin-left: 15px;
  }
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

.task-tip {
  height: 25px;
  position: absolute;
  top: -12px;
  left: -1px;
}

</style>
