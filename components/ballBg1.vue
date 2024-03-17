<template>
  <div class="ball-bg">
    <div class="inner">
      <div class="deep-green-ball"></div>
      <div class="light-green-ball1"></div>
      <div class="light-green-ball2"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="less" scoped>
.ball-bg {
  position: absolute;
  z-index: -1;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .inner {
    width: 100%;
    left: 50%;
    position: absolute;
    top:0;
    height: 100%;
  }
}
.deep-green-ball {
  position: absolute;
  width: 658.8px;
  height: 689px;
  transform: rotate(43.419579deg);
  border-radius: 176px 254px 176px 176px;
  background: linear-gradient(266.83deg, rgba(8, 148, 150, 0.6) -5.97%, rgba(3, 114, 54, 0.6) 99.31%);
  filter: blur(153.5px);
  left: -880px;
  top: 107px;
}

.light-green-ball1 {
  /* Rectangle 34 */

  position: absolute;
  top: 286px;
  left: 510.5px;
  width: 555.9px;
  height: 567.5px;
  transform: rotate(149.400255deg) scale(1, -0.899109) skew(-23.640219deg, 0deg);
  opacity: 0.3;
  border-radius: 176px 254px 176px 176px;
  background: linear-gradient(266.83deg, rgba(8, 148, 150, 0.6) -5.97%, rgba(3, 114, 54, 0.6) 99.31%);
  filter: blur(153.5px);

}

.light-green-ball2 {
  position: absolute;
  top: 430px;
  left: 327.8px;
  width: 704.8px;
  height: 369.9px;
  transform: rotate(52deg) scale(1, 0.899109) skew(-23.640218deg, 0deg);
  border-radius: 285px;
  background: linear-gradient(265.6deg, rgba(139, 210, 184, 0.8) -5.37%, rgba(70, 186, 179, 0) 71.85%);
  filter: blur(48.7px);

}

</style>
