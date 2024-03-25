<template>
  <div class="page-content-wrapper">
    <div class="page-content">
      <div class="left">
        <breadcrumb-navigation/>
        <div class="left-header">
          <img :src="monitorDetail?.logo || bianPic" class="left-header-img" alt="">
          <div class="right-content">
            <div class="author">{{ monitorDetail?.author }}</div>
            <div class="title">{{ monitorDetail?.title }}</div>
          </div>
        </div>
        <FilterTabs v-model="activeTab" :tabList="tabs" active-color="rgba(206, 184, 100, 1)"/>
        <!-- 监控详情内容 -->
        <div v-if="activeTab === '0' && monitorSummary" class="content">
          <div class="title">✨ {{ $t("SUMMARYOFMEETING") }}</div>
          <div class="desc-1">
            {{ monitorSummary.summary }}
          </div>
          <div class="title">‼️ {{ $t("SECTIONOFMEETING")}}</div>
          <template v-for="(chapter, index) in monitorSummary.chapters">
            <div class="desc-1">{{ chapter.title }}</div>
            <div class="desc-2">
              <p>{{ chapter.content }}</p>
            </div>
          </template>

        </div>
        <div v-show="activeTab === '1'" v-if="monitorContent" class="content">
          <audio-player v-if="monitorContent?.link" :audio-src="monitorContent?.link"/>
          <div class="box-wrapper">
            <InfiniteScroll :loadData="loadData" :initData="monitorContent.segments">
              <template #default="{ items }">
                <monitor-content-item v-for="(segment, index) in items" :segment="segment" :key="index"/>
              </template>
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <div class="right">
        <ChatIndex/>
      </div>
    </div>
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
  },
  mounted() {
    this.fetchMonitorDetail(this.$route.query.id); // 假设sourceId是你要查询的监控的ID
  },
  watch: {
    monitorDetail(val) {
      if (val) {
        this.senMessage()
      }
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
    fetchMonitorDetail(sourceId) {
      this.$store.dispatch('monitor/fetchMonitorDetail', sourceId)
      this.$store.dispatch('monitor/fetchMonitorSummary', sourceId)
      this.$store.dispatch('monitor/fetchMonitorContent', {sourceId})
    },
    senMessage() {
      //   自动发一条消息到聊天
      this.$store.dispatch('chat/sendUserMessage', {
        text: this.monitorDetail.title,
        context: {
          hook: {
            type: "SIGNAL_SOURCE",
            id: this.monitorDetail.id
          }
        },
      })
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
      padding-top: 31px;
      text-align: left;
      overflow: scroll;
      width: 577px;
      height: calc(100vh - 350px);

      .box-wrapper {
        height: calc(100vh - 470px);
        margin-top: 12px;
        overflow: scroll;
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
      .author {
        color: rgba(255, 255, 255, 0.60);
        font-family: Avenir;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
      }

      .title {
        color: #FFF;
        font-family: Avenir;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;
      }
    }

    .left-header {
      padding-bottom: 28px;
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
