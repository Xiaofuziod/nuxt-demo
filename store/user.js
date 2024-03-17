import {
  sendEmail,
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
    state.userInfo = {...user, avatar: user.avatar || defaultUserAvatar, nickname: user.nickname || '神秘人士 ~'};
    this.$localStorage.setItem('token', state.userInfo.tokenInfo.tokenValue);
    this.$bus.$emit('LOGON_SUCCESS');
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
        await this.$router.replace('/')
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
        await this.$router.replace('/')
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
        commit('setUser', res.data.data);
      } else {
        this.$bus.$emit('LOGON_FAIL');
        this._vm.$toast.show({content: res.data.msg, type: 'error'})
      }
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async changePassword({commit}, {account, passwd,  captcha}) {
    try {
      const res = await this.$axios.post(changePassword, {account, passwd, captcha})
      commit('setUser', res.data.data);
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
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
