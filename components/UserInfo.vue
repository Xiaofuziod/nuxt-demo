<template>
  <div class="Rectangle82"
       :class="{'rect-active':isActive}">
    <SkeletonLoader v-if="!user.account"/>
    <template v-else>
      <div class="Ellipse245">
        <img v-lazy="avator" alt="">
      </div>
      <div>
        <div class="saywteri2473 ellipsis">{{ user.nickname || user.account }}</div>
        <div class="wtewteri247">{{ $t('servedDaysBefore') }} {{ servedDays }} {{ $t('servedDaysAfter') }}</div>
      </div>
    </template>
  </div>
</template>
<script>
import MonitorAvator from '@/assets/imgs/monitorAvator.svg'
import SkeletonLoader from "@/components/report/SkeletonLoader.vue";

export default {
  name: 'UserInfo',
  components: {SkeletonLoader},
  props: {
    isActive: {
      type: Boolean,
      default: true
    },
    avator: {
      type: String,
      default: MonitorAvator
    }
  },
  data() {
    return {MonitorAvator}
  },
  computed: {
    user() {
      return this.$store.state.user.userInfo
    },
    servedDays() {
      if (!this.user.createTime) return ''
      const createTime = new Date(this.user.createTime);
      const now = new Date();
      const diff = now - createTime;
      const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      return diffDays + 1
    },
  },

}
</script>
<style lang="less" scoped>
.Rectangle82 {
  width: 204px;
  height: 58px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 8px;
  margin-top: 14px;
  margin-bottom: 40px;
  cursor: pointer;

  border-left: 3px solid transparent;

  .Ellipse245 {
    width: 42px;
    height: 42px;
    border-radius: 42px;
    margin-right: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .saywteri2473 {
    width: 130px;
    height: 19px;
    color: rgba(255, 255, 255, 1);
    font-family: Avenir;
    font-weight: 500;
    font-size: 14px;
  }

  .wtewteri247 {
    height: 14px;
    color: rgba(206, 184, 100, 1);
    font-family: Avenir-Roman;
    font-size: 10px;
    margin-top: 2px;
  }
}

.rect-active {
  border-left-color: #ACF1D8;
  background: linear-gradient(90deg, rgba(172, 241, 216, 0.12) 0%, rgba(172, 241, 216, 0.00) 100%);
}
</style>
