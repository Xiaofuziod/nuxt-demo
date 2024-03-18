<!--twitter 登录成功 回跳地址-->
<template>
  <div>
    twitter login success
    <div class="back-btn" @click="backHome">{{ $t("twitter_back-btn_1") }}</div>
  </div>
</template>
<script>
export default {
  layout: 'login',
  mounted() {
    const query = this.$route.query
    console.log('login', this.$route.query)
    if (query.oauth_token) {
      this.$store.dispatch('user/twitterLogin', this.$route.query)
    } else {
      console.log('google login failed')
    }
  },
  methods: {
    backHome() {
      this.$router.replace('/')
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
