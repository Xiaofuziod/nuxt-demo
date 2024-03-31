<template>
  <Dialog ref="modal" width="422px">
    <template #header>
      <div class="header-box">
        <div class="login-title" v-if="step === 1">
          <span :class="{'active': type === 'login' }" @click="type = 'login'">{{ $t("Login_span_2") }}</span>
          <span :class="{'active': type === 'register'}" @click="type = 'register'">{{ $t("Login_span_1") }}</span>
        </div>
        <div class="back-icon" v-else @click="stepBack">
          <img src="@/assets/imgs/login/back.svg" alt="">
        </div>
      </div>
    </template>
    <template #body>
      <div>
        <!--登录/注册-->
        <div class="login-content" v-if="step === 1">
          <div class="input-label">{{ $t("LoginEmailAddress") }}</div>
          <input class="login-input" v-model="email" :placeholder="$t('LoginEnterYourEmail')" type="email">
          <div class="input-label">{{ $t('Password') }} <span @click="changePwd"
                                                              v-if="type === 'login'">{{ $t('ForgotPassword') }}</span>
          </div>
          <div class="login-input-box">
            <input class="login-input" :placeholder="$t(type === 'login' ? 'EnterYourPassword' : 'EnterLimit')" v-model="password"
                   :type="isPassword  ? 'password' : 'text'">
            <img src="@/assets/imgs/login/paw.svg" v-if="isPassword" alt="" @click="isPassword = !isPassword">
            <img src="@/assets/imgs/login/paw2.svg" v-else alt="" @click="isPassword = !isPassword">
          </div>
          <div class="login-btn" :class="{'login-btn-disable': btnDisable}" @click="handleClick">
            <img src="@/assets/imgs/ZKZg.gif" alt="" v-if="showLoading">
            {{ type === 'login' ? $t('Login') : $t('CreateAccount') }}
          </div>
          <div class="login-line">
            <div class="login-line-border"></div>
            <div class="login-line-text">{{ $t('OR') }}</div>
            <div class="login-line-border"></div>
          </div>
          <div class="other-box" @click="loginWithGoogle">
            <img src="@/assets/imgs/login/Google.svg" alt="">
            {{ $t('ContinueWithGoogle') }}
          </div>
          <div class="other-box" @click="loginWithTwitter">
            <img src="@/assets/imgs/login/X2.svg" alt="">
            {{ $t('ContinueWithX') }}
          </div>
        </div>

        <!--注册-->
        <div class="login-content" v-if="step === 21">
          <div class="login-email-box">
            <img src="@/assets/imgs/login/email.svg" alt="">
          </div>
          <div class="login-content-title">{{ $t('VerifyYourEmail') }}</div>
          <div class="login-content-desc">{{ $t('SenttoemailtoBefore') }} <span style="color: #CEB864">{{
              email
            }}</span>
            {{ $t('SenttoemailtoAfter') }}
          </div>
          <div class="login-content-tips">{{ $t('EnterverificationCode') }}</div>
          <div class="ver-code-box">
            <VerificationCodeInput ref="vInput" @validate="validateInputSuccess"/>
            <div class="ver-code-tips" v-if="false">{{ $t('VerificationCodeFailedTips') }}</div>
          </div>
          <div class="login-btn" @click="sendEmail(4)" v-if="nums < 1">
            <img src="@/assets/imgs/ZKZg.gif" alt="" v-if="showLoading">
            {{ $t('ResendEmail') }}
          </div>
          <div class="login-btn login-btn-disable" v-else>
            {{ $t('Sent') }}（{{ nums }}s）
          </div>
        </div>

        <!--修改密码输入电子邮箱-->
        <div class="login-content" v-if="step === 31">
          <div class="login-content-title">{{ $t('ResetEnterYourEmail') }}</div>
          <div class="login-content-desc2">{{ $t('ReceiveAVerification') }}</div>
          <div class="input-label">{{ $t('Email') }}</div>
          <input class="login-input" :placeholder="$t('ResetEmailTips')" style="margin-bottom: 8px" v-model="email"
                 type="email">
          <div class="login-btn" :class="{'login-btn-disable': btnDisable}" @click="sendEmail(2)">
            <img src="@/assets/imgs/ZKZg.gif" alt="" v-if="showLoading">
            {{ $t('Next') }}
          </div>
        </div>

        <!--修改密码-->
        <div class="login-content" v-if="step === 32">
          <div class="login-content-title">{{ $t('EnterNewPassword') }}</div>
          <div class="input-label">{{ $t('Password') }}</div>
          <div class="login-input-box" style="margin-bottom: 20px">
            <input class="login-input" :placeholder="$t('EnterYourPassword')"
                   v-model="password" :type="isPassword  ? 'password' : 'text'">
            <img src="@/assets/imgs/login/paw.svg" alt="" v-if="!isPassword" @click="isPassword = !isPassword">
            <img src="@/assets/imgs/login/paw2.svg" alt="" v-else @click="isPassword = !isPassword">
          </div>
          <div class="login-content-tips">{{ $t('EnterverificationCode') }}</div>
          <div class="ver-code-box">
            <VerificationCodeInput ref="vInput" @validate="validateInputSuccess"/>
            <div class="ver-code-tips" v-if="false">{{ $t('VerificationCodeFailedTips') }}</div>
          </div>
          <div class="login-btn" @click="sendEmail(2)" v-if="nums < 1">
            <img src="@/assets/imgs/ZKZg.gif" alt="" v-if="showLoading">
            {{ $t('ResendEmail') }}
          </div>
          <div class="login-btn login-btn-disable" v-else>
            {{ $t('Sent') }}（{{ nums }}s）
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script>
import VerificationCodeInput from "@/components/VerificationCodeInput.vue";
import {changePassword, sendEmail} from "@/common/home";


let timer = null
export default {
  name: 'Login',
  components: {
    VerificationCodeInput
  },
  data() {
    return {
      user: 'ta',
      email: "",
      password: "",
      isPassword: true,
      type: 'login', // login, register
      step: 1, // 1,  登录/注册   21, 注册验证码输入  31, 忘记密码 - 输入电子邮箱  32 忘记密码 - 输入新密码
      showLoading: false,
      nums: 0
    }
  },
  computed: {
    btnDisable() {
      if (this.step === 1) {
        return !this.email || !this.password
      }
      if (this.step === 31) {
        return !this.email
      }
    }
  },
  mounted() {
    // 处理事件
    this.$bus.$on('LOGON_SUCCESS', () => {
      this.showLoading = false
      this.$toast.success(this.$t('LoginSuccess'))
      this.hide()
      this.$reconnectSocket();
      this.$router.replace(this.localeRoute('/reporting'))
    });
    this.$bus.$on("REGISTER_SUCCESS", () => {
      this.showLoading = false
      this.$toast.success(this.$t('RegistrationSuccess'))
      this.hide()
      this.$reconnectSocket();
      this.$router.replace(this.localeRoute('/welcome'))
    });
    this.$bus.$on('LOGON_FAIL', () => {
      this.showLoading = false
    });
  },
  methods: {
    validateInputSuccess(captcha) {
      console.log('captcha', captcha)
      if (this.step === 21) {
        this.$loading.start()
        this.$store.dispatch('user/userRegister', {account: this.email, passwd: this.password, captcha})
        this.$loading.finish()
      }
      if (this.step === 32) {
        this.changePassword({
          account: this.email,
          passwd: this.password,
          captcha
        })
      }
    },
    stepBack() {
      if (this.step === 21 || this.step === 31) {
        this.password = ''
        this.email = ''
        this.step = 1
        return
      }
      if (this.step === 32) {
        this.step = 31
      }
    },
    handleClick() {
      if (this.btnDisable) return
      if (this.showLoading) return
      //  "1"登录 ,"2"修改密码 ,"4"注册
      if (!this.isEmailValid(this.email)) {
        this.$toast.show({content: this.$t('ErrorEmailTips'), type: 'error'})
        return
      }
      if (this.password.length < 6) {
        this.$toast.show({content: this.$t('EnterLimit'), type: 'error'})
        return
      }
      if (this.type === 'login') {
        this.showLoading = true
        this.$store.dispatch('user/emailLogin', {account: this.email, password: this.password})
      } else {
        this.sendEmail(4)
      }
    },
    async sendEmail(type) {
      if (this.showLoading || !this.isEmailValid(this.email)) return
      //  "1"登录 ,"2"修改密码 ,"4"注册
      this.$refs.vInput?.clearInputs()
      try {
        this.showLoading = true
        const res = await this.$axios.post(sendEmail, {account: this.email, type})
        this.showLoading = false
        if (res.data.code === 200) {
          this.$toast.success(this.$t('Sent'))
          if (type === 2) this.step = 32
          if (type === 4 && this.step !== 21) this.step = 21
          // 开始倒计时
          this.nums = 60
          timer = setInterval(() => {
            if (this.nums < 1) {
              clearInterval(timer)
            } else {
              this.nums--
            }
          }, 1000)

        } else {
          this.$toast.error(res.data.msg || this.$t('sentError'))
        }
      } catch (e) {
        this.showLoading = false
        console.log(e)
      }
    },
    async changePassword({account, passwd, captcha}) {
      try {
        this.$loading.start()
        const res = await this.$axios.post(changePassword, {account, passwd, captcha})
        if (res.data.code === 200) {
          this.$toast.show({content: this.$t('ResetSuccess'), type: 'success'})
          this.email = ''
          this.password = ''
          this.type = 'login'
          this.step = 1
        } else {
          this.$toast.show({content: res.data.msg, type: 'error'})
        }
        this.$loading.finish()
      } catch (e) {
        this.$loading.finish()
        console.log(e)
      }
    },
    loginWithGoogle() {
      const client_id = '86595109680-ago8qfvgdi7785110dp2f95uu3c2e002.apps.googleusercontent.com';
      const redirect_uri = `${window.location.origin}`;
      const response_type = 'code';
      const scope = 'email profile openid';
      window.location = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
    },
    loginWithTwitter() {
      this.$store.dispatch('user/twitterRedirectUrl', {})
    },
    show() {
      this.$refs.modal.openModal()
    },
    changePwd() {
      this.email = ''
      this.password = ''
      this.step = 31
    },
    hide() {
      this.$refs.modal.closeModal()
      this.email = ''
      this.password = ''
      this.step = 1
      this.showLoading = false
      clearInterval(timer)
    },
    isEmailValid(email) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    }
  },
  beforeDestroy() {
    this.$bus.$off('LOGON_SUCCESS')
    this.$bus.$off('LOGON_FAIL')
    this.$bus.$off('REGISTER_SUCCESS')
  }
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

  .ver-code-box {
    position: relative;

    .ver-code-tips {
      position: absolute;
      right: 0;
      bottom: -26px;
      color: #F44653;
      text-align: right;
      font-family: Avenir;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .login-email-box {
    width: 56px;
    height: 56px;
    background-color: rgba(140, 180, 189, .1);
    overflow: hidden;
    border-radius: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px auto;

    img {
      width: 28px;
      height: 28px;
    }
  }

  .login-content-title {
    color: #FFF;
    font-family: Avenir;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    //text-transform: capitalize;
    text-align: center;
    margin-bottom: 24px;
  }

  .login-content-desc {
    color: #FFF;
    //text-align: center;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 20px;
  }

  .login-content-desc2 {
    color: rgba(255, 255, 255, 0.40);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: -4px auto 20px;
  }

  .login-content-tips {
    color: #CEB864;
    text-align: center;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    //text-transform: capitalize;
    margin-bottom: 8px;
  }

  .login-line {
    height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    .login-line-border {
      width: 100%;
      height: 1px;
      background: rgba(140, 180, 189, 0.12);
    }

    .login-line-text {
      color: #8CB4BD;
      font-family: Avenir;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      padding: 0 24px;
    }
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
    //text-transform: capitalize;
    margin-bottom: 7px;

    span {
      cursor: pointer;
      color: #5D7B86;
      font-family: Avenir;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      //text-transform: capitalize;
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
    //text-transform: capitalize;

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

  .other-box {
    width: 100%;
    height: 52px;
    margin-top: 16px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid rgba(140, 180, 189, 0.50);

    color: #8CB4BD;
    font-family: Avenir;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    //text-transform: capitalize;

    img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }
  }

}

.header-box {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  position: relative;
  display: flex;

  .back-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .login-title {
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.40);
    font-family: Avenir;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    //text-transform: capitalize;
    padding-bottom: 24px;

    span {
      cursor: pointer;
      display: inline-block;
      padding: 0 24px;
    }

    .active {
      color: #CEB864;
    }
  }


  .close-btn {
    cursor: pointer;
    position: absolute;
    right: 10px;
  }
}

</style>
