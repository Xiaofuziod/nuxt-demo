<template>
  <div class="page-content-wrapper">
    <div class="page-content">
      <div class="report-left">
        <div class="Account">{{ $t("Home_Account_1") }}</div>
        <div @click="handleClick({coinId:''})">
          <user-info :is-active="!coinId" :avator="avatarPic"/>
        </div>
        <div class="Account Selected">{{ $t("Selected") }}{{ followList?.length ? ` (${followList?.length})` : '' }}
          <span style="cursor: pointer"
                v-if="followList && followList?.length > 0"
                @click="showDelete = !showDelete">{{
              showDelete ? $t("OK") : $t("Edit")
            }}</span>
        </div>
        <!--    自选币  -->
        <div class="Frame580">
          <div class="item"
               v-for="s in 5"
               v-if="followLoading">
            <SkeletonLoader/>
          </div>
          <div class="item"
               :style="{opacity: followList && followList.length > 0 ? 1 : 0}"
               v-for="item in followList" :key="item.id"
               :class="{ 'item-active': item.coinId === coinId}"
               @click="handleClick(item)">
            <div class="item-left">
              <img class="Rectangle" :src="item.icon" alt="" v-if="item.icon">
              <div class="Bitcoin ellipsis">{{ item.name }}</div>
              <div class="BTC">{{ item.symbol }}</div>
            </div>
            <img class="delete-icon"
                 v-if="showDelete" src="@/assets/imgs/report/delete.svg"
                 @click.stop="deleteFollow(item)"
                 alt="">
          </div>
          <img v-if="!followLoading && followList && followList?.length < 1"
               class="empty-image" src="@/assets/imgs/report/empty.png"
               alt="">
        </div>
        <div class="AddaNewCoin" @click="showSelect">{{ $t("Home_AddaNewCoin_1") }}</div>
      </div>

      <div class="report-center">
        <!--面包屑-->
        <div class="rc-top">
          <div class="rc-account">{{ !!coinId ? $t("Selected") : $t("Home_rc-account_1") }}</div>
          <span>{{ $t("Home_span_1") }}</span>
          <template v-if="coinId">
            <div class="pic">
              <img :src="coinData.icon" v-if="coinData.icon" alt="">
            </div>
            <span class="top-account">{{ coinData.name }}</span>
          </template>
          <template v-else>
            <div class="pic">
              <img :src="user.avatar" v-if="user.avatar" alt="">
            </div>
            <span class="top-account">{{ user.nickname || user.account }}</span>
          </template>
        </div>
        <!--      资讯-->
        <div class="focus-list-box">
          <list-container @loadMore="loadMore"
                          :isLoading="loading">
            <!--      图表-->
            <template v-if="coinId">
              <my-echarts ref="echart"></my-echarts>
            </template>
            <!--加载态-->
            <div class="focus-list" v-if="loading && list.length < 1">
              <SkeletonLoader2/>
            </div>
            <div class="focus-list" v-if="list.length > 0">
              <div v-for="item in list" :key="item.id">
                <AIFocus :coin-data="item"/>
              </div>
            </div>

            <!--空态-->
            <div class="empty-box"
                 v-if="!loading && !list.length && !coinId">
              <img src="@/assets/imgs/empty.svg" alt="">
              <span>{{ followList.length ? $t("report-empty-text2") : $t("report-empty-text") }}</span>
            </div>
          </list-container>

        </div>
      </div>
      <div class="right">
        <ChatIndex/>
      </div>
    </div>
    <PageLoading v-if="showWelcomeLoading" :show="pageLoading"/>
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
import BoxLoading from "@/components/boxLoading.vue";
import PageLoading from '@/components/pageLoading.vue'
import avatarPic from '@/assets/imgs/reportAvator.svg'
import SkeletonLoader from "@/components/report/SkeletonLoader.vue";
import SkeletonLoader2 from "@/components/report/SkeletonLoader2.vue";


let timer = Date.now() + 2 * 1000 * 3
export default {
  name: 'Home',
  components: {
    AddCoin,
    ChatIndex: chatIndex,
    AIFocus,
    ListContainer,
    MyEcharts,
    BoxLoading,
    PageLoading,
    SkeletonLoader,
    SkeletonLoader2
  },
  data() {
    return {
      avatarPic,
      showDelete: false,
      list: [],
      coinId: '',
      coinData: {},
      followLoading: true,
      loading: true,
      hasMore: true,
      pageLoading: true,
      queryParams: {
        id: '',
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    followList() {
      return this.$store.state.coin.userCoinList
    },
    user() {
      return this.$store.state.user.userInfo
    },
    showWelcomeLoading() {
      return this.$store.state.chat.showWelcomeLoading
    }
  },
  watch: {
    followList: {
      handler(val) {
        if (val.length && !!this.coinId) {
          const item = val.find(item => item.coinId === this.coinId)
          if (!item) this.handleClick(val[0])
        } else {
          this.handleClick({coinId: '', force: true})
        }
      },
      immediate: true
    }
  },
  async mounted() {
    this.loadData()
    await this.$store.dispatch('coin/fetchUserCoinList')
    this.followLoading = false
    this.$store.commit('chat/setPageName', 'report')
  },
  methods: {
    handleClick(item) {
      if (item.coinId === this.coinId && !item.force) return
      this.coinId = item.coinId
      this.queryParams.id = item.coinId
      this.queryParams.page = 1
      this.list = []
      this.loadData()
      if (item.coinId) {
        this.coinData = item
        this.$nextTick(() => {
          this.$refs.echart?.reload(item.coinId)
        })
      }
    },
    showSelect() {
      this.$store.commit('coin/setAddCoinShow', true)
    },
    deleteFollow(item) {
      this.$store.dispatch('coin/removeFollow', item.id)
    },
    loadMore() {
      if (!this.hasMore || this.loading) return
      this.queryParams.page++
      this.loadData()
    },
    loadData() {
      this.loading = true
      this.$axios.get(analysisCoin, {params: this.queryParams}).then(res => {
        if (res.data.data && res.data.data.records?.length > 0) {
          this.list = this.groupByDate(res.data.data.records)
        } else {
          this.hasMore = false
        }
      }).finally(() => {
        this.loading = false
        if (this.showWelcomeLoading) {
          let num = Date.now() - timer
          setTimeout(() => {
            this.pageLoading = false
          }, num > 0 ? 0 : -num)
        }
      })
    },
    groupByDate(items) {
      const groupedList = this.list;
      items.forEach((item) => {
        const d = parseTime(item?.createdDate)
        if (groupedList.every((group) => group.date !== d.date)) {
          groupedList.push({
            date: d.date,
            isToday: d.isToday,
            weekDay: d.weekDay,
            time: d.time,
            year: d.year,
            list: [item],
          });
        } else {
          groupedList.find((group) => group.date === d.date).list.push(item);
        }
      });
      return groupedList;
    }
  }
}
</script>
<style lang="less" scoped>


.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


.empty-box {
  max-width: 80%;
  height: 100%;
  margin: 0 auto;
  flex-direction: column;
  color: rgba(140, 180, 189, 0.60);
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
  }
}

.item-active {
  background: linear-gradient(90deg, rgba(172, 241, 216, 0.12) 0%, rgba(172, 241, 216, 0.00) 100%);
  border-left: 3px solid #ACF1D8 !important;
}


.Frame580 {
  margin-top: 24px;
  max-height: calc(100% - 220px);
  overflow-y: auto;
  margin-left: -8px;
  overflow-x: hidden;
  position: relative;
  -ms-overflow-style: none; /* 针对IE和Edge */

  &::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }

  .empty-image {
    width: 226px;
    margin-top: 30px;
  }

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
      bottom: 25px;
      padding-top: 5px;
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


  }

  .report-center {
    width: 384px;
    overflow: hidden;
    border-right: 2px solid rgba(140, 180, 189, 0.12);
    display: flex;
    flex-direction: column;

    .focus-list-box {
      width: 100%;
      flex: 1;
      overflow: hidden;
      box-sizing: inherit;
      position: relative;
    }

    .focus-list {
      padding: 0 40px 30px;
    }

    .rc-top {
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 32px 40px 16px;


      span {
        display: block;
        width: 7px;
        text-align: center;
      }

      .top-account {
        display: block;
        width: 180px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .rc-account {
        color: rgba(140, 180, 189, 0.6);
        font-family: aifontF;
        font-size: 14px;
        text-transform: uppercase;
        margin-right: 4px;
      }

      .pic {
        width: 20px;
        height: 20px;
        border-radius: 20px;
        margin-right: 4px;
        margin-left: 4px;
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
