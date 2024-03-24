<template>
  <Dialog ref="modal" width="455px">
    <template #body>
      <div class="login-content">
        <div class="login-content-title">{{ $t("Login_login-content-title_1") }}</div>
        <div class="input-label">{{ $t("Login_input-label_1") }}</div>
        <div class="login-input-box">
          <input class="login-input" :placeholder="$t('Login_login-input-placeholder_1')" v-model="nickname"
                 type="text"></div>
        <div class="login-btn" :class="{'login-btn-disable':btnDisable}" @click="handleClick">
          <img src="@/assets/imgs/ZKZg.gif" alt="" v-if="showLoading">
          {{$t('Login_login-btn_1')}}
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script>

import {updateUserInfo} from "@/common/home";

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      nickname: '',
      showLoading: false
    }
  },
  computed: {
    btnDisable() {
      return !this.nickname || this.nickname.length < 3
    }
  },
  mounted() {

  },
  methods: {
    async handleClick() {
      if (this.btnDisable) return
      try {
        this.showLoading = true
        const res = await this.$axios.post(updateUserInfo, {
          nickname: this.nickname
        })
        console.log(res.data, 'res.data.data')
        if (res.data.code === 200) {
          this.$toast.success(this.$t('EditSuccess'))
          this.$store.commit('user/updateNickname', this.nickname)
          this.hide()
        } else {
          this.$toast.error(res.data.msg || this.$t('EditError'))
        }
        this.showLoading = false
      } catch (e) {
        this.showLoading = false
        console.log(e)
      }
    },
    show() {
      this.nickname = this.$store.state.user.userInfo.nickname
      this.$refs.modal.openModal()
    },
    hide() {
      this.$refs.modal.closeModal()
    },
  },
}
</script>

<style lang="less">

.loading-login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.login-content {
  color: #000000;
  padding: 0 22px;

  .login-content-title {
    color: #FFF;
    font-family: Avenir;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 24px;
  }

  .input-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: #FFF;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
    margin-bottom: 7px;

    span {
      cursor: pointer;
      color: #5D7B86;
      font-family: Avenir;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
    }
  }

  .login-input-box {
    position: relative;

    .login-input {
      margin-bottom: 0;
    }

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      position: absolute;
      right: 16px;
      top: 14px;
    }
  }

  .login-input {
    width: 100%;
    height: 47px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 0.4px solid rgba(140, 180, 189, 0.30);
    color: #FFFFFF;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    box-sizing: border-box;
    padding: 14px 16px;
    outline: none;
    background-color: transparent;
  }

  .login-btn {
    width: 100%;
    height: 50px;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    background: var(--ceb-864, #CEB864);
    color: #000;
    font-family: Avenir;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    text-transform: capitalize;

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  .login-btn-disable {
    opacity: 0.4;
    cursor: not-allowed;
  }
}


</style>
