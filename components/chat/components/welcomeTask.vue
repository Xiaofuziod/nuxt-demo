<template>
  <div class="task-box"
       :class="{'topSticky2':message.type === 'task' && !message.finish}"
  >
    <div class="text-message-v2" v-if="message.type === 'taskStart' || message.type === 'taskFinish' ">
      <div style="padding-left: 20px;padding-top: 16px">{{ message.taskText }}</div>

      <div class="start-btn-box" v-if="message.startBtnShow">
        <div class="start-btn" @click="startBtnClick">
          <btn>
            <span style="padding-left: 5px">{{ $t("welcomeTask_btn_1") }}</span>
          </btn>
        </div>
      </div>
    </div>

    <div class="text-message-v2"
         v-if="message.type === 'task' && !message.finish"
         style="position: relative;background: rgb(8,20,38);width: 440px">
      <div class="task-tip"
           :class="{'topSticky':message.type === 'task' && !message.finish}"
      >
        <btn>
          <img style="width: 12px;height: 12px;margin-right: 4px;margin-top: -2px" src="@/assets/imgs/chat/task.svg"
               alt="">
          <span>{{ message.taskName }}</span>
        </btn>
      </div>
      <div class="task-title">
        {{ message.title }}

        <div class="task-title-right" v-if="message.canSkip" @click="task2Finish('skip')">
          {{ $t('welcomeTask_btn_4') }}
          <img src="@/assets/imgs/chat/more.svg" alt="">
        </div>
      </div>
      <div class="task-desc">
        <span v-for="(s,i) in message.desc?.split('')"
              :class="{'highlight': message.highlightList?.includes(i)}"
              :i="i">{{ s }}</span>
      </div>
      <div class="start-btn-box">
        <div class="start-btn" @click="showSelect">
          <btn2 type="2">{{ $t("welcomeTask_btn_3") }}</btn2>
        </div>
        <div class="start-btn" @click="task2Finish()">
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
      return this.$store.state.monitor.userMonitor?.records || []
    },
    finishBtnDisable() {
      if (this.message.searchType === 'coin') {
        return this.userCoinList.length === 0
      }
      if (this.message.searchType === 'monitor') {
        return this.userMonitorList.length === 0
      }
    },
    messageList() {
      return this.$store.state.chat.messageList
    }
  },
  mounted() {
    if (this.message.type === 'task') {
      setTimeout(() => {
        this.$store.dispatch('chat/welcomeToNext')
        this.$emit('goBottom')
      }, 500)
    }
  },
  methods: {
    async task2Finish(val) {
      if (this.finishBtnDisable && !val) return
      // 如果是跳过的，则需要删除 欢迎文案中的
      // 16 , 17 ,18 跳过的文案
      //  13. 14 非跳过的文案
      if (this.message.searchType === 'monitor') {
        await this.$store.dispatch('chat/updateWelcomeList', val === 'skip' ? [13, 14] : [16, 17, 18])
      }
      await this.taskFinish()
    },
    async taskFinish() {
      if (this.message.searchType === 'coin' && this.userCoinList.length === 0) {
        return this.$toast.info(this.$t('coinLimitTips'))
      }
      const idx = this.messageList.findIndex(item => item.id === this.message.id)
      await this.$store.commit('chat/updateMessage', {
        index: idx,
        message: {...this.message, finish: true}
      })
      await this.$store.dispatch('chat/welcomeToNext')
    },
    async startBtnClick() {
      const idx = this.messageList.findIndex(item => item.id === this.message.id)
      this.$store.commit('chat/updateMessage', {
        index: idx,
        message: {...this.message, startBtnShow: false}
      })
      await this.$store.dispatch('chat/welcomeToNext')
      await this.$emit('goBottom')
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
.task-box {
  display: inline-block;
  max-width: 440px;

  .text-message-v2 {
    width: 100%;
  }
}

.text-message-box2 {
  width: 100%;
  display: flex;
  align-items: flex-start;
}


.highlight {
  color: #CEB864;
}

.topSticky {
  position: sticky;
  top: 0px;
  z-index: 99;

  .task-title {
    margin-top: 15px;
  }
}

.topSticky2{
  position: sticky;
  top: -100px;
  z-index: 99;
}

.task-title {
  font-family: Avenir;
  font-size: 12px;
  font-weight: 800;
  line-height: 16px;
  margin-top: 10px;
  color: rgba(206, 184, 100, 1);
  padding-left: 20px;

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
  padding-left: 20px;
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
  //padding: 16px 20px;
  padding-bottom: 16px;
  padding-right: 20px;
  border-radius: 16px;
  color: rgba(255, 255, 255, 1);
  border: 2px solid rgba(255, 255, 255, 0.1);
  font-family: Avenir;
  font-weight: 500;
  font-size: 13px;
  margin-top: 14px;
  display: table;
}

.task-tip {
  display: inline-block;
  height: 25px;
}

</style>
