<template>
  <div>
    hello taurion
    <div>
      {{ user }}
    </div>
    <div style="width: 100px;height: 200px;background: red" @click="loginWithGoogle">Login with Google</div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return{
      user: 'ta'
    }
  },
  methods: {
    loginWithGoogle() {
      console.log('login with google',this.$auth)
      this.$auth.loginWith('google')

    }
  }
}
</script>
