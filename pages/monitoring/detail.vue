<template>
  <div class="page-content">
    <div class="back"></div>
    <div class="left">
      <breadcrumb-navigation/>
      <div class="left-header">
        <img src="~/assets/imgs/btclogo.png" class="left-header-img" alt="">
        <div class="hotinfo">
          🔥 1456
        </div>
      </div>
      <FilterTabs v-model="activeTab" :tabList="tabs"  active-color="rgba(206, 184, 100, 1)" />
      <div class="content">
        <div class="title">    ✨ 会议总结</div>

        <div class="desc-1">
          <p>本会议围绕Open AI奥特曼与马斯克的相识，分道扬镳，针锋相对等三个主要章节进行了讨论和分享</p>
          <p># 相识：2015年硅谷的首次相遇，为透明、开源的人工智能实验室而疯狂</p>
            <p>#  分道扬镳：2018年马斯克在权力斗争下的黯然离场</p>
           <p># 针锋相对：之后，奥特曼与马斯克在twitter经常互呛，对于双方的成就和为人均不认可</p>
        </div>
        <div class="title">   ‼️ 会议章节</div>
        <div class="desc-1">
          相识：2015年硅谷的首次相遇，为透明、开源的人工智能实验室而疯狂
        </div>
        <div class="desc-2">
          @Bit.wu：2015年，奥特曼和马斯克在硅谷一家豪华牧场风格酒店——门洛帕克瑰丽酒店（Rosewood Sand Hill）共进晚餐时，似乎还在朝着同一个方向前进。当时，谷歌（Google）刚刚收购了总部位于伦敦的神经网络初创公司DeepMind，这使其成为最有可能开发出通用人工智能（AGI）的公司。通用人工智能是一种在面对不常见的任务时能够与人类匹敌的系统。
          在晚宴上，两人和其他人讨论了成立一个透明、开源的人工智能实验室，并致力于让先进的人工智能惠及大众的相关事宜。马斯克和“PayPal黑手党”的其他几个成员——包括彼得·蒂尔（Peter Thiel）和雷德·霍夫曼（Reid Hoffman）——投资了数百万美元来启动这一实验室
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
import chatIndex from "~/components/chat/index.vue";
import AIFocus from '~/components/aiFocus/index.vue'
import ListContainer from '~/components/scrollView/index.vue'
import assetSelect from '~/components/assetSelect/index.vue'
import {deleteFollow, getFollowList} from "~/common/home";

export default {
  name: 'Home',
  components: {
    ChatIndex: chatIndex,
    AIFocus,
    ListContainer,
    assetSelect
  },
  data() {
    return {
      user: 'ta',
      followList: [],
      activeTab: "0",
      tabs: [
        { label: '总结', key: '0' },
        { label: '原文', key: '1' },
      ]
    }
  },
  mounted() {
    this.getFollowList()
  },
  methods: {
    showSelect() {
      this.$refs.assetSel.show()
    },
    getFollowList() {
      this.$axios.get(getFollowList).then(res => {
        this.followList = res.data.data
      })
    },
    deleteFollow(item) {
      this.$axios.get(deleteFollow, {
        params: {
          id: item.id
        }
      }).then(res => {
        this.getFollowList()
      })
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
