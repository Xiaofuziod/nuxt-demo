<template>
  <Dialog ref="modal" width="422px">
    <template #header>
      <div class="header-box">
        <div class="login-title" v-if="step === 1">
          <span :class="{'active': type === 'login' }" @click="type = 'login'">登录</span>
          <span :class="{'active': type === 'register'}" @click="type = 'register'">注册</span>
        </div>
        <div style="cursor: pointer" v-else @click="stepBack">返回</div>
      </div>
    </template>
    <template #body>
      <div>
        <!--登录/注册-->
        <div class="login-content" v-if="step === 1">
          <div class="input-label">电子邮箱地址</div>
          <input class="login-input" v-model="email" placeholder="输入你的电子邮箱地址" type="email">
          <div class="input-label">密码 <span @click="step = 31">忘记密码?</span></div>
          <div class="login-input-box">
            <input class="login-input" placeholder="输入大于6位字符的密码"
                   v-model="password" :type="isPassword  ? 'password' : 'text'">
            <img src="@/assets/imgs/login/paw.svg" alt="" @click="isPassword = !isPassword">
          </div>
          <div class="login-btn" @click="handleClick">{{ type === 'login' ? "登录" : "创建一个账户" }}</div>
          <div class="login-line">
            <div class="login-line-border"></div>
            <div class="login-line-text">or</div>
            <div class="login-line-border"></div>
          </div>
          <div class="other-box" @click="loginWithGoogle">
            <img src="@/assets/imgs/login/Google.svg" alt="">
            使用 Google 授权
          </div>
          <div class="other-box" @click="loginWithTwitter">
            <img src="@/assets/imgs/login/X2.svg" alt="">
            使用 X 授权
          </div>
        </div>

        <!--注册-->
        <div class="login-content" v-if="step === 21">
          <div class="login-content-title">验证您的电子邮箱</div>
          <div class="login-content-desc">我们已向 <span>{{ email }}</span> 发送了一封电子邮件，您可以输入电子邮件中的验证码完成注册
          </div>
          <div class="login-content-tips">输入验证码</div>
          <VerificationCodeInput @validate="validateInputSuccess"/>
          <!--          <div style="color: red;text-align: center">验证码错误，请重新输入</div>-->
          <div class="login-btn" @click="sendEmail(4)">重发电子邮件</div>
        </div>

        <!--修改密码输入电子邮箱-->
        <div class="login-content" v-if="step === 31">
          <div class="login-content-title">输入电子邮箱</div>
          <div class="login-content-desc">输入电子邮箱，您将收到用于重置密码的验证码</div>
          <div class="input-label">输入电子邮箱</div>
          <input class="login-input" v-model="email" type="email">
          <div class="login-btn" @click="sendEmail(2)">下一步</div>
        </div>

        <!--修改密码-->
        <div class="login-content" v-if="step === 32">
          <div class="login-content-title">输入新密码</div>
          <div class="input-label">密码</div>
          <div class="login-input-box">
            <input class="login-input" placeholder="输入大于6位字符的密码"
                   v-model="password" :type="isPassword  ? 'password' : 'text'">
            <img src="@/assets/imgs/login/paw.svg" alt="" @click="isPassword = !isPassword">
          </div>
          <div class="login-content-tips">输入验证码</div>
          <VerificationCodeInput @validate="validateInputSuccess"/>
          <!--          <div style="color: red;text-align: center">验证码错误，请重新输入</div>-->
          <div class="login-btn" @click="sendEmail(2)">重发电子邮件</div>
        </div>

      </div>


    </template>
  </Dialog>
</template>
<script>
import VerificationCodeInput from "@/components/VerificationCodeInput.vue";
import {sendEmail} from "@/common/home";

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
      step: 21, // 1,  登录/注册   21, 注册验证码输入  31, 忘记密码 - 输入电子邮箱  32 忘记密码 - 输入新密码
    }
  },
  mounted() {
    // 处理事件
    this.$bus.$on('LOGON_SUCCESS', () => {
      this.hide()
    });
  },
  methods: {
    validateInputSuccess(captcha) {
      console.log('validateInputSuccess', captcha, this.step)
      if (this.step === 21) {
        this.$store.dispatch('user/userRegister', {account: this.email, passwd: this.password, captcha})
      }
    },
    stepBack() {
      if (this.step === 21 || this.step === 31) {
        this.step = 1
        return
      }
      if (this.step === 32) {
        this.step = 31
      }
    },
    handleClick() {
      //  "1"登录 ,"2"修改密码 ,"4"注册
      if (!this.isEmailValid(this.email)) {
        this.$toast.show({content: '请输入正确的电子邮箱地址', type: 'error'})
        return
      }
      if (this.password.length < 6) {
        this.$toast.show({content: '密码长度不能小于6位', type: 'error'})
        return
      }
      if (this.type === 'login') {
        this.$store.dispatch('user/emailLogin', {account: this.email, password: this.password})
      } else {
        this.sendEmail(4)
        this.step = 21
      }
    },
    async sendEmail(type) {
      //  "1"登录 ,"2"修改密码 ,"4"注册
      if (!this.isEmailValid(this.email)) {
        this.$toast.error('请输入正确的电子邮箱地址')
        return
      }
      try {
        const res = await this.$axios.post(sendEmail, {account: this.email, type})
        if (res.data.code === 200) {
          this.$toast.success('发送成功')
          if (type === 2) this.step = 32
        } else {
          this.$toast.error(res.data.msg || '发送失败,请稍后重试！')
        }
      } catch (e) {
        console.log(e)
      }
    },
    loginWithGoogle() {
      const client_id = '86595109680-ago8qfvgdi7785110dp2f95uu3c2e002.apps.googleusercontent.com';
      const redirect_uri = `${window.location.origin}/login/google`;
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
    hide() {
      this.$refs.modal.closeModal()
    },
    isEmailValid(email) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    }
  },
  beforeDestroy() {
    this.$bus.$off('LOGON_SUCCESS')
  }
}
</script>

<style lang="less">

.login-content {
  color: #000000;

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

  .login-content-desc {
    color: #FFF;
    text-align: center;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
    margin-bottom: 20px;
  }

  .login-content-tips {
    color: #CEB864;
    text-align: center;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
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
    color: #5D7B86;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    box-sizing: border-box;
    padding: 14px 16px;
    outline: none;
    background-color: transparent;
  }

  .login-btn {
    width: 100%;
    height: 50px;
    margin-top: 32px;
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
    text-transform: capitalize;

    img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }
  }

}

.header-box {
  font-size: 20px;
  padding-bottom: 24px;
  font-weight: bold;
  color: #333;
  position: relative;
  display: flex;

  .login-title {
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.40);
    font-family: Avenir;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    text-transform: capitalize;

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
