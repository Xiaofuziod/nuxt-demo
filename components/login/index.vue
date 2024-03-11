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
<!--        <div style="width: 100px;height: 50px;margin-bottom:20px;background: red" @click="loginWithGoogle">Login with Google</div>-->
<!--        <div style="width: 100px;height: 50px;margin-bottom:20px;background: green" @click="loginWithTwitter">Login with twitter</div>-->
        <div style="width: 100px;height: 50px;margin-bottom:20px;background: blueviolet" @click="emailLogin">Login with email</div>
      </div>
    </template>
  </Dialog>
</template>
<script>
import {extractParametersFromUrl} from "~/utils";

export default {
  name: 'Login',
  data() {
    return {
      user: 'ta'
    }
  },
  mounted() {
    const query = this.$route.query
    //
    // this.$socket.on('message', (data) => {
    //   console.log(data);
    // });
    console.log('login', this.$route.query)
    if (query.code) {
      console.log('google login')
      this.$store.dispatch('user/googleLogin', this.$route.query)
    } else if (query.oauth_token) {
      console.log('twitter login',)
      this.$store.dispatch('user/twitterLogin', this.$route.query)
    }
  },
  methods: {
    loginWithGoogle() {
      const client_id = '86595109680-ago8qfvgdi7785110dp2f95uu3c2e002.apps.googleusercontent.com';
      const redirect_uri = 'http://localhost:9898';
      const response_type = 'code';
      const scope = 'email profile openid';
      window.location = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
      // console.log('login with google', this.$auth)
      // this.$auth.loginWith('google')
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
