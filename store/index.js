import {
  sendEmail,
  userLogin,
  userRegister,
  changePassword,
  googleLogin,
  twitterLogin,
  twitterRedirectUrl
} from "~/common/home";

export const state = () => ({
  user: {}
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
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

    }
  },
  async emailLogin({commit}, {account, password}) {
    try {
      const res = await this.$axios.post(userLogin, {account, passwd: password})
      commit('setUser', res.data.data);
    } catch (e) {

    }
  },

  async googleLogin({commit}, data) {
    try {
      let para = {
        "access_token": data.access_token,
        "expires_in": data.expires_in,
        "scope": data.scope,
        "token_type": data.token_type,
        "id_token": data.id_token
      }
      const res = await this.$axios.post(googleLogin, para)
      commit('setUser', res.data.data);
    } catch (e) {
      console.log('googleLogin error: ', e)
    }
  },
  async twitterLogin({commit}, data) {
    try {
      const res = await this.$axios.get(twitterLogin, {params:data})
      commit('setUser', res.data.data);
    } catch (e) {

    }
  },
  async twitterRedirectUrl({commit}, data) {
    try {
      const res = await this.$axios.post(twitterRedirectUrl, data)
      commit('setUser', res.data.data);
    } catch (e) {

    }
  },
  async userRegister({commit}, {email, password, code}) {
    try {
      const res = await this.$axios.post(userRegister, {email, password, captcha: code})
      commit('setUser', res.data.data);
    } catch (e) {

    }
  },
  async changePassword({commit}, {email, password, password1, code}) {
    try {
      const res = await this.$axios.post(changePassword, {email, password, password1, captcha: code})
      commit('setUser', res.data.data);
    } catch (e) {

    }
  }
};
