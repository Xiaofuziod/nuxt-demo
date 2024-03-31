<template>
  <div class="page-content-wrapper">
    <div class="page-content">
      <div class="left">
        <breadcrumb-navigation v-if="!pageLoading" @click="goList"/>
        <div style="height: 50px" v-else></div>
        <div class="left-header">
          <template v-if="!pageLoading">
            <img :src="monitorDetail?.logo" class="left-header-img" alt="">
            <div class="right-content">
              <a :href="monitorDetail?.link" class="link-btn" target="_blank">
                <img src="@/assets/imgs/card/linKbtn.svg"  alt="">
              </a>
              <div class="author">{{ monitorDetail?.author }}</div>
              <div class="title">{{ monitorDetail?.title }}</div>
              <div class="desc">
                <p class="time">
                  <img src="@/assets/imgs/card/fire.svg" alt="">
                  <span> {{ monitorDetail?.heat }} {{ $t("heatAfter") }}</span>
                </p>
                <p class="time">
                  <img src="@/assets/imgs/card/date.svg" alt="">
                  <span>{{ monitorDetail?.time }}</span>
                </p>
              </div>

            </div>
          </template>
        </div>
        <FilterTabs v-model="activeTab" :tabList="tabs" active-color="rgba(206, 184, 100, 1)"/>
        <!-- 监控详情内容 -->
        <template v-if="!pageLoading">
          <empty-box v-if="activeTab === '0' && !monitorSummary && !pageLoading"/>
          <div v-if="activeTab === '0' && monitorSummary" class="content">
            <div class="title">✨ {{ $t("SUMMARYOFMEETING") }}</div>
            <div class="desc-1">
              {{ monitorSummary.summary }}
            </div>
            <div class="title">‼️ {{ $t("SECTIONOFMEETING") }}</div>
            <template v-for="(chapter, index) in monitorSummary.chapters">
              <div class="desc-1">{{ chapter.title }}</div>
              <div class="desc-2">
                <p>{{ chapter.content }}</p>
              </div>
            </template>
          </div>
          <div v-show="activeTab === '1'" class="content">

            <audio-player style="margin-top: 10px;margin-bottom: 10px;width: 565px" v-if="monitorContent?.link || monitorContent?.m3u8"
                          :audio-src="monitorContent?.m3u8 || monitorContent?.link"
            />
            <div class="box-wrapper" v-if="monitorContent">
              <InfiniteScroll :loadData="loadData" :initData="monitorContent.segments">
                <template #default="{ items }">
                  <monitor-content-item v-for="(segment, index) in items" :segment="segment" :key="index"/>
                </template>
              </InfiniteScroll>
            </div>
            <empty-box v-else/>
          </div>
        </template>
      </div>
      <div class="right">
        <ChatIndex/>
      </div>
    </div>
    <MonitorDetailSkeletonLoader :show="pageLoading"/>
  </div>
</template>

<script>
import ChatIndex from "~/components/chat/index.vue";
import AIFocus from '~/components/aiFocus/index.vue';
import bianPic from '@/assets/imgs/bian.png'

export default {
  name: 'Home',
  components: {
    ChatIndex,
    AIFocus,
  },
  data() {
    return {
      bianPic,
      user: 'ta',
      followList: [],
      activeTab: "0",
      pageLoading: true,
      tabs: [
        {label: this.$t('SUMMARIZE'), key: '0'},
        {label: this.$t('ORIGINAL'), key: '1'},
      ],
    }
  },
  computed: {
    monitorDetail() {
      return this.$store.state.monitor.monitorDetail
    },
    monitorContent() {
      return this.$store.state.monitor.monitorContent
    },
    monitorSummary() {
      return this.$store.state.monitor.monitorSummary
    },
    messageList() {
      return this.$store.state.chat.messageList
    },
    combinedData() {
      return this.monitorDetail?.id && this.$store.state.chat.conversationId
    },
    messageStatus() {
      return this.$store.state.chat.messageStatus
    }
  },
  mounted() {
    this.fetchMonitorDetail(this.$route.query.id); // 假设sourceId是你要查询的监控的ID
  },
  watch: {
    combinedData: {
      handler(val) {
        if (val) {
          this.senMessage()
        }
      },
      immediate: true
    }
  },
  methods: {
    async loadData() {
      const {has_next, segments} = await this.$store.dispatch('monitor/fetchMonitorContent', {
        sourceId: this.$route.query.id,
        page: this.monitorContent.page + 1
      })
      return {
        hasNext: has_next,
        data: segments
      }
    },
    // 其他方法保持不变
    async fetchMonitorDetail(sourceId) {
      this.$store.commit('setMonitorSummary', null);
      this.$store.commit('setMonitorDetail', null);
      this.$store.commit('setMonitorContent', null);
      const res = await this.$store.dispatch('monitor/fetchMonitorDetail', sourceId)
      if (res.state === "error") {
        this.$toast.error(res.data)
      }
      await this.$store.dispatch('monitor/fetchMonitorSummary', sourceId)
      await this.$store.dispatch('monitor/fetchMonitorContent', {sourceId})
      setTimeout(() => {
        this.pageLoading = false
      }, 1000)
    },
    goList() {
      this.$router.push(this.localeRoute(`/monitoring`));
    },
    senMessage() {
      // const sourceList = this.messageList.filter(item => item.context?.hook?.type === 'SIGNAL_SOURCE')
      // if (sourceList.length > 0) {
      //   const ids = sourceList.map(item => item.context?.hook?.id + '')
      //   if (ids.includes(this.monitorDetail.id + '')) return
      // }
      if (this.messageStatus === 'loading' || this.messageStatus === 'concat') {
        return false
      }
      //   自动发一条消息到聊天
      this.$store.dispatch('chat/sendUserMessage', {
        text: this.monitorDetail.title,
        conversationId: this.$store.state.chat.conversationId,
        context: {
          hook: {
            type: "SIGNAL_SOURCE",
            id: this.monitorDetail.id
          }
        },
      })
      this.$bus.$emit('GO_CHAT_BOTTOM')
    }
  }
}
</script>

<style lang="less">


.Frame580 {
  margin-top: 24px;

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .Rectangle {
    width: 32px;
    height: 32px;
    background-color: green;
    border-radius: 123.1px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  }

  .Bitcoin {
    width: 100px;
    height: 20px;
    color: rgba(255, 255, 255, 1);
    font-family: Avenir-Heavy;
    font-size: 15px;
    text-transform: capitalize;
    margin: 0 12px 0;
  }

  .BTC {
    height: 20px;
    color: rgba(255, 255, 255, 0.5);
    font-family: Avenir;
    font-weight: 500;
    font-size: 15px;
    text-transform: capitalize;
  }
}

.page-content-wrapper {
  position: relative;
  overflow-x: visible;
  overflow-y: scroll;
  width: 100%;
  z-index: 0;
  padding-top: 16px;
  text-align: center;
  height: calc(100vh - 88px);
}

.page-content {
  max-width: 1152px;
  width: 1152px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  text-align: left;
  justify-content: center;
  border-radius: 31px 31px 0 0;
  background: rgba(38, 64, 64, 0.2);
  backdrop-filter: blur(200px);
  position: relative;

  .right {
    width: 515px;
  }

  .left {
    flex: 1;
    padding: 34px 40px;

    .content {
      padding-top: 1px;
      text-align: left;
      overflow: scroll;
      width: 590px;
      height: calc(100vh - 350px);

      .box-wrapper {
        height: calc(100vh - 440px);
        margin-top: 12px;
        overflow: scroll;
        width: 100%;
      }

      .title {
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 40px;
        text-transform: uppercase;
        color: #FFFFFF;

      }

      .desc-1 {
        color: rgba(255, 255, 255, 0.80);
        font-family: Avenir;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: capitalize;
        margin-bottom: 4px;
      }

      .desc-2 {
        color: rgba(255, 255, 255, 0.50);
        font-family: Avenir;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
        margin-bottom: 8px;
      }
    }

    .right-content {
      padding-left: 20px;
      flex: 1;
      text-align: left;
      position: relative;
      .author {
        color: rgba(255, 255, 255, 0.60);
        font-family: Avenir;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
      }
      .link-btn {
        position: absolute;
        right: 0;
        top: 30px;
      }
      .title {
        color: #FFF;
        font-family: Avenir;
        width: 400px;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;
      }
      .desc {
        display: inline-flex;
        align-items: center;
        font-size: 12px;
        color: #CEB864;
        .time {
          display: inline-flex;
          align-items: center;
          img {
            margin-right: 4px;
          }
          margin-right: 20px;
        }
      }
    }

    .left-header {
      padding-bottom: 28px;
      min-height: 114px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left-header-img {
        width: 86px;
        height: 86px;
        border-radius: 20px;
      }

      .hotinfo {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        text-transform: capitalize;
        color: #FFFFFF;
      }
    }
  }
}

</style>
