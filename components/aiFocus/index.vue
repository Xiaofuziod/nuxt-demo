<template>
  <div class="focus-item">
    <div class="data-row">
      <div class="date">{{ coinData.date }}</div>
      <div class="date1">
        {{ coinData.isToday ? 'Today' : "" }}
        <div class="date2">
          {{ coinData.weekDay }}
        </div>
      </div>
    </div>
    <div class="list">
      <div class="focus">
        <btn>
          <img src="@/static/images/chat/s2.svg" alt="">
          <span>{{ $t("AIFocus_span_1") }}</span>
        </btn>
      </div>
      <div class="list-item" v-for="(item,index) in coinData.list"
           :style="{'opacity': item.trigger === 1 ? 0.4 : 1}"
           :key="item.id + '-' + index">
        <div class="list-item-top">
          <div class="list-item-top1">{{ timeDescription(item.createdDate) }}</div>
          <div class="list-item-top2">
            <img v-if="item.icon" :src="item.icon" alt="">
          </div>
          <div class="list-item-top3">{{ item.symbol }}</div>
        </div>

        <div class="list-item-content">
          <div class="list-item-title">{{ item.title }}</div>
          <div class="list-item-icon" @click="handleClick(item)">
            <img src="@/static/images/chat/ai2.svg" alt="">
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import btn from "@/components/chat/components/btn.vue";
import {parseTime} from "@/utils/date";

export default {
  name: 'AIFocus',
  components: {
    btn
  },
  props: {
    coinData: {
      type: Object,
      default: () => {
        return {
          date: '00/00',
          isToday: true,
          weekDay: 'Monday',
          list: []
        }
      }
    }
  },
  computed: {
    messageList() {
      return this.$store.state.chat.messageList
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    handleClick(item) {
      const sourceList = this.messageList.filter(item => item.context?.hook?.type === 'FOCUS')
      if (sourceList.length > 0) {
        const ids = sourceList.map(item => item.context?.hook?.id + '')
        if (ids.includes(item.id + '')) return
      }
      const para = {
        text: item.title,
        context: {
          hook: {
            type: "FOCUS",
            id: item.id
          }
        },
      }
      setTimeout(() => {
        this.$store.dispatch('chat/sendUserMessage', para)
        item.trigger = 1
      }, 1000)
    },
    timeDescription(inputTime) {
      if (!inputTime) return '';
      const now = new Date();
      const inputDate = new Date(inputTime);
      const deltaSeconds = Math.floor((now - inputDate) / 1000);
      const deltaMinutes = Math.floor(deltaSeconds / 60);
      const deltaHours = Math.floor(deltaMinutes / 60);

      if (inputDate.toDateString() === now.toDateString()) {
        // 如果是今天
        if (deltaSeconds < 60) {
          return `${deltaSeconds} ${this.$t('secondAgo')}`;
        } else if (deltaMinutes < 60) {
          return `${deltaMinutes} ${this.$t('minuteAgo')}`;
        } else {
          return `${deltaHours} ${this.$t('hourAgo')}`;
        }
      } else {
        // 如果是今天之前
        return parseTime(inputDate).time;
      }
    }
  }
}

</script>

<style lang="less" scoped>


html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}


.focus-item {
  box-sizing: border-box;

  .list {
    width: 305px;
    border-radius: 16px;
    background: rgba(38, 64, 64, 0.2);
    margin-top: 24px;
    position: relative;
    box-sizing: border-box;
    padding: 19px 24px 10px 24px;


    .list-item {
      box-sizing: border-box;
      border-bottom: 1px solid rgba(140, 180, 189, 0.12);
      padding: 8px 0 10px;

      &:last-child {
        border-bottom: none;
      }

      .list-item-top {
        display: flex;

        .list-item-top1 {
          height: 14px;
          color: rgba(255, 255, 255, 0.4);
          font-family: Avenir-Roman;
          font-size: 10px;
          //text-transform: capitalize;
        }

        .list-item-top2 {
          width: 14px;
          height: 14px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 1);
          margin-left: 12px;
          margin-right: 8px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
          }
        }

        .list-item-top3 {
          height: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-family: Avenir-Roman;
          font-size: 10px;
          //text-transform: capitalize;
        }
      }

      .list-item-content {
        display: flex;
        align-items: center;
        margin-top: 12px;

        .list-item-title {
          flex: 1;
          color: rgba(255, 255, 255, 1);
          font-family: Avenir;
          font-weight: 500;
          font-size: 13px;
          //text-transform: capitalize;
        }

        .list-item-icon {
          width: 36px;
          height: 36px;
          border-radius: 70px;
          background: rgba(138, 173, 188, 0.1);
          backdrop-filter: blur(100px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          img {
            width: 18px;
          }
        }
      }

    }

    .focus {
      min-width: 93px;
      height: 25px;
      color: rgba(25, 40, 54, 1);
      font-size: 12px;
      position: absolute;
      top: -12px;
      left: 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;

      img {
        width: 16px;
        height: 16px;
        margin-left: 6px;
        transform: translateX(-4px);
      }
    }
  }


  .data-row {
    display: flex;
    align-items: flex-end;

    .date {
      //height: 29px;
      color: rgba(206, 184, 100, 1);
      font-family: aifontF;
      font-size: 24px;
    }

    .date1 {
      color: rgba(206, 184, 100, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 10px;
      margin-left: 7px;
      display: flex;
      flex-direction: column;
    }

    .date2 {
      height: 11px;
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir-Roman;
      font-size: 8px;
    }
  }

}

</style>
