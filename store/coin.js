import {addFollow, deleteFollow, getAssetList, getFollowList} from "@/common/home";

export const state = {
  coinList: [],
  userCoinList: [],
}

export const mutations = {
  setCoinList(state, coinList) {
    state.coinList = coinList;
  },
  setUserCoinList(state, userCoinList) {
    state.userCoinList = userCoinList;
  }
}

export const actions = {
  async fetchCoinList({commit}, keyword = '') {
    try {
      const res = await this.$axios.get(getAssetList, {params: {keyword, page: 1, size: 20}});
      if (res && res.data && res.data.data) {
        commit('setCoinList', res.data.data.records);
      }
    } catch (e) {
      console.error('fetchCoinList error:', e);
    } finally {

    }
  },
  async fetchUserCoinList({commit}, searchName = '') {
    try {
      const res = await this.$axios.get(getFollowList);
      if (res && res.data && res.data.data) {
        commit('setUserCoinList', res.data.data);
      }
    } catch (e) {
      console.error('fetchCoinList error:', e);
    }
  },
  async addFollow({commit, dispatch}, id) {
    try {
      const res = await this.$axios.get(addFollow, {params: {id}});
      if (res && res.data && res.data.data) {
        dispatch('fetchUserCoinList');
      }
    } catch (e) {
      console.error('fetchCoinList error:', e);
    } finally {
      this._vm.$loading.finish();
    }
  },
  async removeFollow({commit, dispatch}, id) {
    try {
      this._vm.$loading.start();
      const res = await this.$axios.get(deleteFollow, {params: {id}});
      if (res && res.data && res.data.data) {
        dispatch('fetchUserCoinList');
      }
    } catch (e) {
      console.error('fetchCoinList error:', e);
    } finally {
      this._vm.$loading.finish();
    }
  }
}
