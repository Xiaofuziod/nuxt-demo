<template>
  <div class="page-content-wrapper">
    <div class="page-content">
      <div class="report-left">
        <div class="Account">{{ $t("Home_Account_1") }}</div>
        <div class="Rectangle82">
          <div class="Ellipse245">
            <img :src="user.avatar" v-if="user.avatar" alt="">
          </div>
          <div>
            <div class="saywteri2473 ellipsis">{{ user.account }}</div>
            <div class="wtewteri247">{{ user.nickname }}</div>
          </div>
        </div>
        <div class="Account Selected">{{$t("Selected")}}{{ followList.length ? ` (${followList.length})` : '' }}
          <span style="cursor: pointer" @click="showDelete = !showDelete">{{ showDelete ? $t("OK") : $t("Edit") }}</span>
        </div>
        <!--    自选币  -->
        <div class="Frame580">
          <div class="item" v-for="item in followList" :key="item.id"
               :class="{ 'item-active': item.coinId === coinId}"
               @click="handleClick(item)">
            <div class="item-left">
              <img class="Rectangle" :src="item.icon" alt="">
              <div class="Bitcoin ellipsis">{{ item.name }}</div>
              <div class="BTC">{{ item.symbol }}</div>
            </div>
            <img class="delete-icon" v-if="showDelete" src="@/assets/imgs/report/delete.svg" @click="deleteFollow(item)"
                 alt="">
          </div>
        </div>
        <div class="AddaNewCoin" @click="showSelect">{{ $t("Home_AddaNewCoin_1") }}</div>
      </div>

      <div class="report-center">
        <div class="rc-top">
          <div class="rc-account">{{ $t("Home_rc-account_1") }}</div>
          <span>{{ $t("Home_span_1") }}</span>
          <div class="pic">
            <img :src="user.avatar" v-if="user.avatar" alt="">
          </div>
          {{ $t("Home_i_1") }}{{ user.account }}{{ $t("Home_i_2") }}
        </div>
        <!--      资讯-->
        <div class="focus-list-box">
          <list-container>
            <!--      图表-->
            <template v-if="coinId">
              <my-echarts ref="echart"></my-echarts>
            </template>
            <div class="focus-list" v-if="list.length > 0">
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
  </div>
</template>
<script>
import chatIndex from "~/components/chat/index.vue";
import AIFocus from '~/components/aiFocus/index.vue'
import ListContainer from '~/components/scrollView/index.vue'
import {analysisCoin} from "~/common/home";
import MyEcharts from "~/components/echarts/index.vue";
import {parseTime} from "~/utils/date";
import AddCoin from "~/components/report/addCoin.vue";

export default {
  name: 'Home',
  components: {
    AddCoin,
    ChatIndex: chatIndex,
    AIFocus,
    ListContainer,
    MyEcharts
  },
  data() {
    return {
      showDelete: false,
      list: [],
      coinId: ''
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
    handleClick(item) {
      this.coinId = item.coinId
      this.list = []
      this.loadData()
      this.$nextTick(() => {
        this.$refs.echart.reload(item.coinId)
      })
    },
    showSelect() {
      this.$store.commit('coin/setAddCoinShow', true)
    },
    deleteFollow(item) {
      this.$store.dispatch('coin/removeFollow', item.id)
    },
    loadData() {
      this.$axios.get(analysisCoin, {params: {id: this.coinId}}).then(res => {
        let obj = res.data.data
        let dateList = Object.keys(obj)
        let newData = []
        dateList.forEach(item => {
          const d = parseTime(item)
          console.log(d)
          newData.push({
            date: d.date,
            isToday: d.isToday,
            weekDay: d.weekDay,
            time: d.time,
            list: obj[item]
          })
        })
        this.list = newData
      })
    }
  }
}
</script>
<style lang="less" scoped>

.Frame580 {
  margin-top: 24px;
  max-height: calc(100% - 220px);
  overflow-y: auto;
  margin-left: -8px;

  .delete-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .item {
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    cursor: pointer;
    justify-content: space-between;
    border-left: 3px solid transparent;
    box-sizing: border-box;
    padding-left: 8px;
  }

  .item-active {
    background: linear-gradient(90deg, rgba(172, 241, 216, 0.12) 0%, rgba(172, 241, 216, 0.00) 100%);
    border-left: 3px solid #ACF1D8;
  }

  .item-left {
    width: 154px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .Rectangle {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 32px;
    overflow: hidden;
  }

  .Bitcoin {
    flex: 1;
    padding: 0 12px;
    color: rgba(255, 255, 255, 1);
    font-family: Avenir-Heavy;
    font-size: 15px;
    text-transform: capitalize;
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
}

.page-content {
  max-width: 1152px;
  width: 1152px;
  height: 100%;
  text-align: left;
  display: inline-flex;
  border-radius: 31px 31px 0 0;
  background: rgba(38, 64, 64, 0.2);
  backdrop-filter: blur(200px);
  position: relative;

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
      padding: 0 40px 30px;
    }

    .rc-top {
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
