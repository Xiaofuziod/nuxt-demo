<template>
  <Dialog ref="modal" width="500px">
    <template #header>
      <div class="header-box">
        <div class="login-title" v-if="step === 1">
          <span @click="type = 'login'">登录</span> | <span @click="type = 'register'">注册</span>
        </div>
        <div style="cursor: pointer" v-else @click="stepBack">返回</div>

        <div class="close-btn" @click="hide">关闭</div>
      </div>
    </template>
    <template #body>
      <div>
        <!--登录/注册-->
        <div class="login-content" v-if="step === 1">
          <div class="input-label">电子邮箱地址</div>
          <input class="login-input" v-model="email" type="email">
          <div class="input-label">密码 <span @click="step = 31">忘记密码</span></div>
          <input class="login-input" v-model="password" type="password">
          <div class="login-btn" @click="handleClick">{{ type === 'login' ? "登录" : "创建一个账户" }}</div>
          <div style="text-align: center">或者</div>
          <div class="other-box" @click="loginWithGoogle">Login with Google</div>
          <div class="other-box" @click="loginWithTwitter">Login with twitter</div>
        </div>

        <!--注册-->
        <div class="login-content" v-if="step === 21">
          <div style="text-align: center">验证您的电子邮箱</div>
          <div style="text-align: center">我们已向 <span>{{ email }}</span> 发送了一封电子邮件，您可以输入电子邮件中的验证码完成注册
          </div>
          <div>输入验证码</div>
          <VerificationCodeInput @validate="validateInputSuccess"/>
          <div style="color: red;text-align: center">验证码错误，请重新输入</div>
          <div class="login-btn" @click="sendEmail(4)">重发电子邮件</div>
        </div>

        <!--修改密码输入电子邮箱-->
        <div class="login-content" v-if="step === 31">
          <div style="text-align: center">输入电子邮箱</div>
          <div style="text-align: center">输入电子邮箱，您将收到用于重置密码的验证码</div>
          <div>输入电子邮箱</div>
          <input class="login-input" v-model="email" type="email">
          <div class="login-btn" @click="sendEmail(2)">下一步</div>
        </div>

        <!--修改密码-->
        <div class="login-content" v-if="step === 32">
          <div>输入新密码</div>
          <div>密码</div>
          <input v-model="password" class="login-input" type="password">
          <div>输入验证码</div>
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
        this.$store.dispatch('user/userRegister', {account: this.email, password: this.password, captcha})
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

  .input-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      cursor: pointer;
    }
  }

  .login-input {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .login-btn {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    background: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .other-box {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

}

.header-box {
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  position: relative;
  display: flex;

  .login-title {
    width: 100%;
    text-align: center;

    span {
      cursor: pointer;
      display: inline-block;
      padding: 0 10px;
    }
  }


  .close-btn {
    cursor: pointer;
    position: absolute;
    right: 10px;
  }
}

</style>
