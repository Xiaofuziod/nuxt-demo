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
  // "1"登录 ,"2"修改密码 ,"4"注册
  async sendEmail({commit}, {email, type}) {
    try {
      const res = await this.$axios.post(sendEmail, {account: email, type})
      commit('setUser', res.data.data);
      console.log(res)
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
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
      commit('setUser', res.data.data);
      await this.$router.replace('/')
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
      console.log('googleLogin error: ', e)
    }
  },
  async twitterLogin({commit}, data) {
    try {
      const res = await this.$axios.get(twitterLogin, {params: data})
      commit('setUser', res.data.data);
      await this.$router.replace('/')
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async twitterRedirectUrl({commit}, data) {
    try {
      const res = await this.$axios.post(twitterRedirectUrl, data)
      window.location.href = res.data.data;
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async userRegister({commit}, {account, passwd, captcha}) {
    try {
      const res = await this.$axios.post(userRegister, {account, passwd, captcha})
      commit('setUser', res.data.data);
    } catch (e) {
      this.$bus.$emit('LOGON_FAIL');
    }
  },
  async changePassword({commit}, {email, passwd, password1, captcha}) {
    try {
      const res = await this.$axios.post(changePassword, {email, passwd, password1, captcha})
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
