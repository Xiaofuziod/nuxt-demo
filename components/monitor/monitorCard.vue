<template>
  <div class="card" :class="`${card.status === 1 ? 'disable' : ''}`" @click="cardClick(card.id)">
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.author }}</h3>
      <h3 class="title2">{{ card?.title }}</h3>
      <un-started ref="unStarted" :card="card" v-if="card?.status === 1"/>
      <completed :card="card" v-if="card?.status === 5"/>
      <in-progress  ref="inProgress":card="card" v-if="card?.status === 2"/>
      <Parsing  ref="Parsing" :card="card" v-if="[3,4].includes(card?.status)"/>
      <Invalid ref="invalid" :card="card" v-if="card?.status === 6"/>
      <cancelled :card="card" v-if="card?.status === 7"/>
    </div>
    <img class="remove-btn" src="@/assets/imgs/close.svg" @click.stop="deleteMonitor(card.id)" alt="">
  </div>
</template>
<script>
import bianPic from '@/assets/imgs/bian.png'
import UnStarted from "~/components/monitor/cardState/unStarted.vue";
import InProgress from "~/components/monitor/cardState/inProgress.vue";
import Completed from "~/components/monitor/cardState/completed.vue";
import Parsing from "~/components/monitor/cardState/parsing.vue";
import Invalid from "~/components/monitor/cardState/invalid.vue";
import Cancelled from "~/components/monitor/cardState/Cancelled.vue";

export default {
  name: "monitorCard",
  components: {Cancelled, Invalid, Parsing, Completed, InProgress, UnStarted},
  props: {
    showAction: {
      type: Boolean,
    },
    card: {
      type: Object,
    },
  },
  data() {
    return {
      bianPic,
      optionShow: false
    }
  },
  methods: {
    deleteMonitor(id) {
      this.$store.dispatch('monitor/deleteUserMonitor', id);
    },
    cardClick() {
      if (this.card.status === 1) {
        this.$refs.unStarted.showBox = true
      }
      if (this.card.status === 2) {
        this.$refs.inProgress.showBox = true
      }
      if ([3, 4].includes(this.card.status)) {
        this.$refs.Parsing.showBox = true
      }
      if (this.card.status === 5) {
        this.$router.push(this.localeRoute(`/monitoring/detail?id=${this.card.id}`));
      }
      if (this.card.status === 6) {
        this.$refs.invalid.showBox = true
      }
      if (this.card.status === 7) {
          this.$toast.warning(this.$t('monitoringCanceled'))
      }
    }
  }
}
</script>
<style scoped lang="less">
.card {
  padding: 16px 20px;
  width: 389px;
  height: 109px;
  border-radius: 16px;
  margin: 8px;
  background: rgba(38, 64, 64, 0.2);
  cursor: pointer;
  position: relative;
  display: inline-flex;
  .remove-btn {
    position: absolute;
    top: 13px;
    right: 13px;
    height: 13px;
    width: 13px;
    cursor: pointer;
  }

  .card-img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }

  .card-header {
    padding-left: 17px;
    width: 265px;

    .title1 {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
      line-height: 15px;
      height: 15px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: #FFF;
      font-family: Avenir;
      font-size: 15px;
      font-style: normal;
      font-weight: 800;
      text-transform: capitalize;
      width: 225px;
      text-wrap: normal;
      line-height: 23px;

      display: -webkit-box;
      -webkit-line-clamp: 2; /* 定义文本的行数 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timestamp {
      color: #CEB864;
      font-size: 12px;
    }

    .other {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
    }
  }
}
</style>
