import {
  userLogin,
  userRegister,
  changePassword,
  googleLogin,
  twitterLogin,
  twitterRedirectUrl, getUserInfo
} from "~/common/home";

import defaultUserAvatar from "assets/imgs/user.svg";

export const state = () => ({
  userInfo: {},
});

export const mutations = {
  setUser(state, user) {

    state.userInfo = {...user, avatar: user.avatar || defaultUserAvatar, nickname: user.nickname};
    this.$localStorage.setItem('token', state.userInfo.tokenInfo.tokenValue);
    // times 如果大于0就是首次登陆
    if (user.times && user.times > 0) {
      this.$bus.$emit('REGISTER_SUCCESS');
    } else {
      this.$bus.$emit('LOGON_SUCCESS');
    }
  },
  updateNickname(state, nickname) {
    state.userInfo.nickname = nickname;
  }
};

export const actions = {
  async emailLogin({commit}, {account, password}) {
    try {
      const res = await this.$axios.post(userLogin, {account, passwd: password})
      console.log(res.data)
      if (res.data.code === 200) {
        commit('setUser', res.data.data);
      } else {
        this.$bus.$emit('LOGON_FAIL');
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
      console.log(e)
    }
  },

  async googleLogin({commit}, data) {
    try {
      const res = await this.$axios.get(googleLogin, {params: {...data}})
      if (res.data.code === 200) {
        commit('setUser', res.data.data);
      } else {
        this.$bus.$emit('LOGON_FAIL');
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
      console.log('googleLogin error: ', e)
    }
  },
  async twitterLogin({commit}, data) {
    try {
      const res = await this.$axios.get(twitterLogin, {params: data})
      if (res.data.code === 200) {
        commit('setUser', res.data.data);
      } else {
        this.$bus.$emit('LOGON_FAIL');
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async twitterRedirectUrl({commit}, data) {
    try {
      const res = await this.$axios.post(twitterRedirectUrl, data)
      if (res.data.code === 200) {
        window.location.href = res.data.data;
      } else {
        this.$bus.$emit('LOGON_FAIL');
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async userRegister({commit}, {account, passwd, captcha}) {
    try {
      const res = await this.$axios.post(userRegister, {account, passwd, captcha})
      if (res.data.code === 200) {
        commit('setUser', {...res.data.data, times: 1});
      } else {
        this.$bus.$emit('LOGON_FAIL');
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async changePassword({commit}, {account, passwd, captcha}) {
    try {
      const res = await this.$axios.post(changePassword, {account, passwd, captcha})
      if (res.data.code === 200) {
        this._vm.$toast.show({content: "ResetSuccess", type: 'success'})

      } else {
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getUserInfo({commit}) {
    try {
      const res = await this.$axios.get(getUserInfo)
      commit('setUser', res.data.data);
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  }
};
