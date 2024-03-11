<template>
  <div class="page-content">
    <div class="back"></div>
    <div class="left">
      <breadcrumb-navigation/>
      <div class="left-header">
        <img :src="monitorDetail?.logo || bianPic"  class="left-header-img" alt="">
        <div class="hotinfo">
          🔥 1456
        </div>
      </div>
      <FilterTabs v-model="activeTab" :tabList="tabs" active-color="rgba(206, 184, 100, 1)" />
      <!-- 监控详情内容 -->
      <div v-if="activeTab === '0' && monitorSummary" class="content">
        <div class="title">✨ {{ monitorSummary.summary }}</div>
        <div class="desc-1">
          <div v-for="(chapter, index) in monitorSummary.chapters" :key="index">
            <p># {{ chapter.title }}</p>
            <p>{{ chapter.content }}</p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === '1' && monitorContent" class="content">
        <div class="title">✨ LINK:{{ monitorContent.link }}</div>
        <div class="desc-1">
          <div v-for="(segment, index) in monitorContent.segments" :key="index">
            <p>author: {{ segment.title }}</p>
            <p>time: {{ segment.timeline }}</p>
            <p>{{ segment.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <ChatIndex/>
    </div>
    <asset-select ref="assetSel"/>
  </div>
</template>

<script>
import ChatIndex from "~/components/chat/index.vue";
import AIFocus from '~/components/aiFocus/index.vue';
import ListContainer from '~/components/scrollView/index.vue';
import AssetSelect from '~/components/assetSelect/index.vue';
import bianPic from '@/assets/imgs/bian.png'

export default {
  name: 'Home',
  components: {
    ChatIndex,
    AIFocus,
    ListContainer,
    AssetSelect
  },
  data() {
    return {
      bianPic,
      user: 'ta',
      followList: [],
      activeTab: "0",
      tabs: [
        { label: '总结', key: '0' },
        { label: '原文', key: '1' },
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
  methods: {
    // 其他方法保持不变
    fetchMonitorDetail(sourceId) {
      this.$store.dispatch('monitor/fetchMonitorDetail', sourceId)
      this.$store.dispatch('monitor/fetchMonitorSummary', sourceId)
      this.$store.dispatch('monitor/fetchMonitorContent', sourceId)
    }
  }
}
</script>

<style lang="less">

.ellipsis {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

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

.page-content {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 1152px;
  border-radius: 31px 31px 0 0;
  background: rgba(38, 64, 64, 0.2);
  backdrop-filter: blur(200px);
  position: relative;


  .back {
    width: 658.8px;
    height: 689px;
    transform: rotate(43.419579deg);
    border-radius: 176px 254px 176px 176px;
    background: linear-gradient(266.83deg, rgba(8, 148, 150, 0.6) -5.97%, rgba(3, 114, 54, 0.6) 99.31%);
    filter: blur(153.5px);
    position: absolute;
    left: -480px;
    z-index: -1;
    top: 107px;
  }
  .left {
    flex: 1;
    padding: 34px 40px;

    .content {
      padding-top: 31px;
      text-align: left;
      .title{
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 40px;
        text-transform: uppercase;
        color: #FFFFFF;

      }
      .desc-1 {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        text-transform: capitalize;

        color: rgba(255, 255, 255, 0.8);

      }
      .desc-2 {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 14px;
        text-transform: capitalize;
        color: rgba(255, 255, 255, 0.5);
        padding-left: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
      }
    }
    .left-header {
      padding-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: end;
      .left-header-img {
        width: 86px;
        height: 86px;
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
