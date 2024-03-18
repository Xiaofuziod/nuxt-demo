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
        <img src="@/static/images/chat/s2.svg" alt="">
        AI focus
      </div>
      <div class="list-item" v-for="(item,index) in coinData.list" :key="item.id + '-' + index">
        <div class="list-item-top">
          <div class="list-item-top1">{{ item.time }}</div>
          <div class="list-item-top2">
            <img :src="item.coverPhotoUrl" alt="">
          </div>
          <div class="list-item-top3">{{ item.symbol }}</div>
        </div>

        <div class="list-item-content">
          <div class="list-item-title">{{ item.title }}</div>
          <div class="list-item-icon">
            <img src="@/static/images/chat/ai2.svg" alt="">
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import {analysisCoin} from "@/common/home";

export default {
  name: 'AIFocus',
  props: {
    coinData: {
      type: Object,
      default: () => {
        return {
          date: '00/00',
          isToday: true,
          weekDay: 'Monday',
          list: [
            {
              id: 1,
              time: '12:00',
              coverPhotoUrl: '@/static/images/chat/s2.svg',
              title: 'Ethereum'
            }
          ]
        }
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {}
}

</script>

<style lang="less">

.focus-item {
  margin-top: 20px;
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
          text-transform: capitalize;
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
          text-transform: capitalize;
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
          text-transform: capitalize;
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
      width: 93px;
      height: 25px;
      color: rgba(25, 40, 54, 1);
      font-size: 12px;
      line-height: 120.000005%;
      background: rgba(206, 184, 100, 1);
      backdrop-filter: blur(108px);
      position: absolute;
      top: -12px;
      left: 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      text-transform: uppercase;
      overflow: hidden;

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


  .data-row {
    display: flex;
    align-items: flex-start;

    .date {
      height: 29px;
      color: rgba(206, 184, 100, 1);
      font-family: aifontF;
      font-size: 24px;
      text-transform: uppercase;
    }

    .date1 {
      height: 14px;
      color: rgba(206, 184, 100, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 10px;
      text-transform: uppercase;
      margin-top: 7px;
      margin-left: 7px;
    }

    .date2 {
      height: 11px;
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir-Roman;
      font-size: 8px;
      text-transform: uppercase;
    }
  }

}

</style>
