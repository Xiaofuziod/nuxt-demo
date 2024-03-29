<template>
  <div class="home-wrapper" ref="homeWrapper">
    <div class="container">
      <DynamicVisualSlider/>
      <app-footer/>
    </div>
  </div>
</template>
<script>
import UserPop from "@/components/pageui/userPop.vue";
import DirectionAwareHoverEffect from "@/components/pageui/DirectionAwareHoverEffect.vue";
import HomeBanner1 from "@/components/pageui/homeBanner1.vue";

import DynamicVisualSlider from "@/components/pageui/DynamicVisualSlider.vue";
export default {
  name: 'Home',
  components: {DynamicVisualSlider, HomeBanner1, DirectionAwareHoverEffect, UserPop},
  data() {
    return {

    }
  },
  methods: {
  },
  mounted() {
    const query = this.$route.query
    if (query.code) {
      const redirect_uri = `${window.location.origin}`;
      this.$store.dispatch('user/googleLogin', {code: query.code, url: redirect_uri})
    }

    if (query.oauth_token) {
      this.$store.dispatch('user/twitterLogin', this.$route.query)
    }
  }
}
</script>
<style lang="less" scoped>
.home-wrapper {
  position: relative;
  overflow: scroll;
  width: 100%;
  z-index: 0;
  padding-top: 16px;
  text-align: center;

  .container {
    position: relative;
    z-index: 1;
    text-align: left;
    display: inline-block;
  }
}
</style>

