<template>
  <div class="monitor-wrapper-bg">
    <div class="monitor-wrapper">
      <div class="monitor-header">
        <p class="text">{{ $t("addCoin_text_1") }}</p>
        <img class="header-close-btn" @click.stop="close()" src="@/assets/imgs/close.svg">
      </div>
      <div class="search-section">
        <input type="text" v-model="searchQuery" placeholder="搜索加密货币..." class="search-input" >
      </div>
      <main class="content">
        <!--        loading-->
        <div class="center-box loading-box" v-if="loading">
          <img src="@/assets/imgs/ZKZg.gif" alt="">
        </div>
        <div class="monitor-search-title" v-if="!loading && searchQuery">{{ $t("addCoin_monitor-search-title_1") }}</div>
        <div class="center-box empty-box" v-if="!loading && !coinList.length">
          <img src="@/assets/imgs/empty.svg" alt="">
          <span>{{ $t("addCoin_span_1") }}</span>
        </div>
        <template v-if="!loading && coinList.length">
          <coin-list
            @select="select"
            :select-ids="selectcoinList.map(i => i.id)"
          />
        </template>
      </main>
      <div class="monitoring-footer">
        <div class="add-monitoring-cards" >
          <small-coin-card
              v-for="monitor in selectcoinList"
              :key="monitor.id"
              :card="monitor"
              @remove="remove(monitor.id)"
          />
        </div>
        <taurion-btn  @click="addCoin" text="确认"  active-color="rgba(206, 184, 100, 1)"/>
      </div>
      <!-- 其余代码 -->
    </div>
  </div>
</template>

<script>

import MidMonitorCard from "~/components/monitor/MidMonitorCard.vue";
import SmallCoinCard from "~/components/report/smallMonitorCard.vue";
import CoinList from "~/components/report/coinList.vue";
let inputlock =  false;
export default {
  name: "addCoin",
  components: {
    CoinList,
    SmallCoinCard,
    MidMonitorCard
  },
  data() {
    return {
      searchQuery: '',
      selectcoinList:[],
      loading: false,
    };
  },

  computed: {
    coinList() {
      return this.$store.state.coin.coinList
    },
  },
  watch: {
    searchQuery() {
      if(inputlock) return
      inputlock = true
      setTimeout(() => {
        inputlock = false
        this.searchcoinList()
      },400)
    }
  },
  methods: {
    searchcoinList() {
      this.loading = true
      this.$store.dispatch('coin/fetchCoinList', {keyWord:this.searchQuery}).finally(()=> {
        this.loading = false
      });
    },
    select(coin){
      if(this.selectcoinList.length > 4) {
        this.$toast.error('同时间最多可添加5个')
      } else {
        // 去重复
        const isDuplicate = this.selectcoinList.some((item) => item.id === coin.id);
        if (isDuplicate) return
        this.selectcoinList = [...this.selectcoinList, coin];
      }
    },
    remove(id) {
      this.selectcoinList = this.selectcoinList.filter(i => i.id !== id)
    },
    addCoin() {
      this.$store.dispatch('coin/addFollow', this.selectcoinList.map(i => i.id))
    },
    close() {
      this.$store.commit("coin/setAddCoinShow", false)
    }
  },
  mounted() {
    this.searchcoinList();
  }
}
</script>


<style scoped lang="less">
.monitor-wrapper-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 100;
}
.monitor-wrapper {
  font-family: 'Arial', sans-serif;
  width: 657px;
  min-height: 568px;
  background: rgba(38, 64, 64, 0.3);
  backdrop-filter: blur(100px);
  border-radius: 32px;
  padding: 32px 36px 0 36px;
}

.content {
  margin: 0 auto;
  height: 326px;
  padding-bottom: 20px;
  overflow-y: scroll;
  width: 594px;
  .monitor-search-title {
    color: rgba(140, 180, 189, 0.60);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
  .loading-box {
    img {
      width: 32.757px;
      height: 32.972px;
    }
  }
  .empty-box {
    flex-direction: column;
    color: rgba(140, 180, 189, 0.60);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
    img {
      width: 64.757px;
      height: 76.972px;
    }
  }
}

.search-section {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
}

.search-input {
  flex-grow: 1;
  box-sizing: border-box;
  background: transparent;
  border: 0.4px solid rgba(140, 180, 189, 0.3);
  border-radius: 8px;
  height: 48px;
  line-height: 48px;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 15px 20px;
  color: #fff;
}

.search-btn, .add-monitor-btn {
  padding: 10px 20px;
  background-color: #5b9bd5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-monitoring-cards {
  width: 430px;
  display: flex;
  flex-wrap: wrap;
}
.search-btn:hover, .add-monitor-btn:hover {
  background-color: #457fca;
}
.monitor-title {
  /* 🔥 历史精华 X Space */

  font-family: aifontf;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 120%;
  text-transform: capitalize;
  color: #CEB864;
  margin-bottom: 12px;

}
.monitoring-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: scroll;
  .active {
    background: rgba(51, 140, 140, 0.5);
  }
}
.monitor-header {
  display: flex;
  justify-content: space-between;

  .text {
    font-family: aifont;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 27px;
    text-transform: uppercase;
    color: #CEB864;
  }

  .header-close-btn {
    cursor: pointer;
    font-family: 'Arial', sans-serif;
  }
}
.monitoring-footer {
  display: flex;
  padding-top: 20px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(140, 180, 189, 0.30);
}

/* Add additional styles below */
</style>
