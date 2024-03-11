<template>
  <Dialog ref="modal">
    <template #header>
      <div>
        登录
        <span style="cursor: pointer" @click="hide">关闭</span>
      </div>
    </template>
    <template #body>
      <div style="width: 200px">
        <div style="width: 100px;height: 50px;margin-bottom:20px;background: red" @click="loginWithGoogle">Login with Google</div>
<!--        <div style="width: 100px;height: 50px;margin-bottom:20px;background: green" @click="loginWithTwitter">Login with twitter</div>-->
        <div style="width: 100px;height: 50px;margin-bottom:20px;background: blueviolet" @click="emailLogin">Login with email</div>
      </div>

    </template>
  </Dialog>
</template>
<script>
import {sendEmail,userRegister} from "~/common/home";
import {extractParametersFromUrl} from "~/utils";

export default {
  name: 'Login',
  data() {
    return {
      user: 'ta'
    }
  },
  mounted() {
    const url = window.location.href
    const query = extractParametersFromUrl(url)
    //
    // this.$socket.on('message', (data) => {
    //   console.log(data);
    // });
    if (query.access_token) {
      console.log('google login')
      this.$store.dispatch('user/googleLogin', query)
    } else if (this.$route.query.oauth_token) {
      console.log('twitter login',)
      this.$store.dispatch('user/twitterLogin', this.$route.query)
    }


  },
  methods: {
    loginWithGoogle() {
      console.log('login with google', this.$auth)
      this.$auth.loginWith('google')
    },
    loginWithTwitter() {
      this.$store.dispatch('user/twitterRedirectUrl',{})
      // res.url includes twitter's authentication link
    },
    emailLogin() {
      console.log('email login',this.$store)
      this.$store.dispatch('user/emailLogin',{account: "flynn.taurion@gmail.com", password: "123456"})
    },
    show() {
      this.$refs.modal.openModal()
    },
    hide() {
      this.$refs.modal.closeModal()
    },
  }
}
</script>
