<template>
  <div class="banner-5">
    <div class="title1">Our AI Learns from the Best</div>
    <DirectionAwareHoverEffect/>
  </div>
</template>
<script>

import DirectionAwareHoverEffect from "@/components/pageui/DirectionAwareHoverEffect.vue";

export default {
  name: 'Banner5',
  components: {DirectionAwareHoverEffect},
}
</script>
<style lang="less">

.banner-5 {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 1198.3px;
  margin-top: 123px;
  align-items: center;
  justify-content: center;
  .title1 {
    width: 1198px;
    height: 86px;
    text-align: center;
    margin-bottom: 60px;
    font-family: aifont;
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 85px;
    text-transform: capitalize;
    color: #CEB864;
  }
}

</style>
