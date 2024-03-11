<template>
  <div style="width: 100%;height: 100%">
    <div class="page-content">
      <div class="back"></div>
      <div class="report-left">
        <div class="Account">Account</div>
        <div class="Rectangle82">
          <div class="Ellipse245">
            <img :src="user.avatar" alt="">
          </div>
          <div>
            <div class="saywteri2473 ellipsis">{{ user.account }}</div>
            <div class="wtewteri247">{{ user.nickname }}</div>
          </div>
        </div>
        <div class="Account Selected">Selected{{ followList.length ? ` (${followList.length})` : '' }}
          <span style="cursor: pointer" @click="showDelete = !showDelete">{{ showDelete ? "OK" : "Edit" }}</span>
        </div>
        <!--    自选币  -->
        <div class="Frame580">
          <div class="item" v-for="item in followList" :key="item.id">
            <div class="Rectangle">
              <img :src="item.icon" alt="">
            </div>
            <div class="Bitcoin ellipsis">{{ item.name }}</div>
            <div class="BTC">{{ item.symbol }}</div>
            <button v-if="showDelete" style="margin-left: 10px" @click="deleteFollow(item)">X</button>
          </div>
        </div>
        <div class="AddaNewCoin" @click="showSelect">+ Add a New Coin</div>
      </div>

      <div class="report-center">
        <div class="rc-top">
          <div class="rc-account">Account</div>
          <span>/</span>
          <div class="pic">
            <img :src="user.avatar" alt="">
          </div>
          the account {{ user.account }} following
        </div>
        <!--      资讯-->
        <div class="focus-list-box">
          <list-container>

            <!--      图表-->
            <my-echarts></my-echarts>

            <div class="focus-list">
              <div v-for="item in list" :key="item.id">
                <AIFocus :coin-data="item"/>
              </div>
            </div>
          </list-container>
        </div>
      </div>
      <div class="right">
        <ChatIndex/>
      </div>
    </div>
    <asset-select ref="assetSel"/>
  </div>

</template>
<script>
import chatIndex from "~/components/chat/index.vue";
import AIFocus from '~/components/aiFocus/index.vue'
import ListContainer from '~/components/scrollView/index.vue'
import assetSelect from '~/components/assetSelect/index.vue'
import {analysisCoin, deleteFollow, getFollowList} from "~/common/home";
import MyEcharts from "~/components/echarts/index.vue";
import {parseTime} from "~/utils/date";

export default {
  name: 'Home',
  components: {
    ChatIndex: chatIndex,
    AIFocus,
    ListContainer,
    assetSelect,
    MyEcharts
  },
  data() {
    return {
      showDelete: false,
      list: []
    }
  },
  computed: {
    followList() {
      return this.$store.state.coin.userCoinList
    },
    user() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {
    this.loadData()
    this.$store.dispatch('coin/fetchUserCoinList')
  },
  methods: {
    showSelect() {
      this.$refs.assetSel.show()
    },
    deleteFollow(item) {
      this.$store.dispatch('coin/removeFollow', item.id)
    },
    loadData() {
      this.$axios.get(analysisCoin, {params: {id: 67}}).then(res => {
        const arr = res.data.data.map(item => {
          const d = parseTime(item.createdDate)
          return {
            ...item,
            isToday: d.isToday,
            weekDay: d.weekDay,
            time: d.time,
            date: d.date
          }
        })
        this.list = [
          {
            ...arr[0],
            list: arr
          }
        ]
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
  max-height: calc(100% - 220px);
  overflow-y: auto;

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
  height: 100%;
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


  .report-left {
    width: 252px;
    min-height: 300px;
    border-right: 2px solid rgba(140, 180, 189, 0.12);
    box-sizing: border-box;
    padding: 32px 24px 20px;
    position: relative;

    .AddaNewCoin {
      height: 22px;
      color: rgba(206, 184, 100, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 16px;
      text-transform: capitalize;
      margin-top: 46px;
      cursor: pointer;
      position: absolute;
      left: 24px;
      bottom: 30px;
    }

    .Account {
      height: 24px;
      color: rgba(206, 184, 100, 1);
      font-family: aifontF;
      font-size: 20px;
      line-height: 120.000005%;
      text-transform: uppercase;

    }

    .Selected {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        height: 19px;
        color: rgba(140, 180, 189, 0.6);
        font-family: Avenir;
        font-weight: 500;
        font-size: 14px;
        text-transform: capitalize;
      }
    }

    .Rectangle82 {
      width: 204px;
      height: 58px;
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 8px;
      margin-top: 14px;
      margin-bottom: 40px;

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
        text-transform: capitalize;
      }

      .wtewteri247 {
        height: 14px;
        color: rgba(206, 184, 100, 1);
        font-family: Avenir-Roman;
        font-size: 10px;
        text-transform: capitalize;
        margin-top: 2px;
      }
    }


  }

  .report-center {
    width: 384px;
    overflow: hidden;
    border-right: 2px solid rgba(140, 180, 189, 0.12);
    display: flex;
    flex-direction: column;

    .focus-list-box {
      flex: 1;
      overflow: hidden;
      box-sizing: inherit;
    }

    .focus-list {
      padding: 0 40px;
    }

    .rc-top {
      height: 14px;
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir-Roman;
      font-size: 10px;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 32px 40px;

      span {
        display: block;
        width: 7px;
        text-align: center;
      }

      .rc-account {
        height: 11px;
        color: rgba(140, 180, 189, 0.6);
        font-family: aifontF;
        font-size: 9px;
        line-height: 120.000005%;
        text-transform: uppercase;
      }

      .pic {
        width: 14px;
        height: 14px;
        border-radius: 14px;
        margin-right: 3px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

    }

  }
}

</style>
