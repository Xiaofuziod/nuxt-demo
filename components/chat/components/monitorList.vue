<template>
  <div>
    <div class="card" v-for="(card,index) in list" :key="index">
      <img class="card-img" :src="card?.logo || bianPic" alt="">
      <div class="card-header">
        <h3 class="title1">{{ card?.author }}</h3>
        <h3 class="title2">{{ card?.title }}</h3>
        <p class="timestamp" v-if="card?.status === 1">
          <img src="@/assets/imgs/card/date.svg" alt="">
          <span>{{ $t("unStarted") }}, {{ formatData(card?.time) }}</span>
        </p>
        <p class="timestamp" v-else-if="card?.status === 5">
          <img src="@/assets/imgs/card/fire.svg"
               alt=""><span>{{ $t("Completed") }}, {{ card?.heat }}  {{ $t("heatAfter") }}</span>
        </p>
        <p class="timestamp" v-else><img src="@/assets/imgs/card/date.svg" alt="">
          <span>{{
              formatData(card?.time || card.start)
            }}</span></p>
        <!--        <p class="timestamp">{{ card?.time || card.start }}</p>-->
      </div>
      <img class="option-img"
           :style="{'opacity': userMonitorList?.includes(card.id + '') ? 0.4 : 1}"
           @click="addMonitor(card)" src="@/assets/imgs/addPlus.svg" alt="">
    </div>
  </div>

</template>
<script>
import bianPic from '@/assets/imgs/bian.png'
import {formatTimeBasedOnRule} from "@/utils/formatTimeBasedOnRule";

export default {
  name: "MidMonitorCard",
  props: {
    showAction: {
      type: Boolean,
    },
    list: {
      type: Array,
    }
  },
  computed: {
    userMonitorList() {
      return this.$store.state.monitor.userMonitor?.records.map(monitor => monitor.id)
    }
  },
  data() {
    return {
      bianPic,
      optionShow: false
    }
  },
  methods: {
    formatData (time) {
      return formatTimeBasedOnRule(time, this.$t("today"))
    },
    addMonitor(card) {
      console.log(this.userMonitorList, card.id)
      if (this.userMonitorList?.includes(card.id + '')) return
      this.$store.dispatch('monitor/addUserMonitor', [card.id]);
    },
  }
}
</script>
<style scoped lang="less">
.card {
  width: 100%;
  //height: 26px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  position: relative;

  .option-img {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }


  .card-img {
    width: 40px;
    height: 40px;
    border-radius: 40px;

  }

  .card-header {
    margin-left: 8px;
    overflow: hidden;
    padding: 0 12px 0 8px;
    flex: 1;

    .title1 {
      color: rgba(255, 255, 255, 0.60);
      font-family: Avenir;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: #FFF;
      font-family: Avenir;
      font-size: 14px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: capitalize;
      margin: 1px auto;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .timestamp {
      color: #CEB864;
      font-family: Avenir;
      display: inline-flex;
      align-items: center;
      width: 100%;
      overflow: visible;
      text-wrap: nowrap;

      font-size: 12px;
      font-style: normal;
      font-weight: 400;

      span {
        display: inline-block;
      }

      img {
        margin-right: 2px;
        margin-top: -2px;
      }

    }
  }
}
</style>
