<template>
  <div>
    hello taurion
    <div>
      {{ user }}
    </div>
    <div style="width: 100px;height: 200px;background: red" @click="loginWithGoogle">Login with Google</div>
    <div style="width: 100px;height: 200px;background: green" @click="loginWithTwitter">Login with twitter</div>

    <div @click="emailLogin">email login</div>
  </div>
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


    console.log(query)
    if (query.access_token) {
      console.log('google login')
      this.$store.dispatch('googleLogin', query)
    } else if (this.$route.query.oauth_token) {
      console.log('twitter login',)
      this.$store.dispatch('twitterLogin', this.$route.query)
    }


  },
  methods: {
    loginWithGoogle() {
      console.log('login with google', this.$auth)
      this.$auth.loginWith('google')
    },
    loginWithTwitter() {
      this.$store.dispatch('twitterRedirectUrl',{})
      // res.url includes twitter's authentication link
    },
    emailLogin() {
      console.log('email login',this.$store)
      this.$store.dispatch('emailLogin',{account: "flynn.taurion@gmail.com", password: "123456"})
    }
  }
}
</script>
