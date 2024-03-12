<!--google 登录成功 回跳地址-->
<template>
  <div>
    google login success

    <div class="back-btn" @click="backHome">back home</div>
  </div>
</template>
<script>
export default {
  layout: 'login',
  mounted() {
    const query = this.$route.query
    //
    // this.$socket.on('message', (data) => {
    //   console.log(data);
    // });
    if (query.code) {
      const redirect_uri = `${window.location.origin}/login/google`;
      this.$store.dispatch('user/googleLogin', {code:query.code, url: redirect_uri})
    } else {
      console.log('google login failed')
    }
  },
  methods: {
    backHome() {
      this.$router.replace('/' + this.$i18n.locale)
    }
  }
}

</script>

<style scoped>
.back-btn {
  color: #FFFFFF;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    color: #FFFFFF;
  }
}

</style>
