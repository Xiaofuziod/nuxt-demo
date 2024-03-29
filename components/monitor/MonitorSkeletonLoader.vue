<template>
  <div class="skeleton-wrapper" v-show="show">
    <div class="center-box">
      <div class="skeleton-1"></div>
      <div class="skeleton-2"></div>
      <div class="skeleton-3"></div>
      <div class="skeleton-4"></div>
      <div class="skeleton-5"></div>
      <div class="skeleton-6"></div>
      <div class="skeleton-7"></div>
      <div class="skeleton-8"></div>
      <div class="skeleton-9"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonitorSkeletonLoader",
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped lang="less">


.skeleton-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 10;
  justify-content: center;
  .center-box {
    position: relative;
    width: 1152px;
    height: 100vh;
  }
  .skeleton-1{
    position: absolute;
    background-color: #1C3C43;
    border-radius: 4px;
    height: 50px;
    width: 210px;
    top: 300px;
    left: 18px;
  }
  .skeleton-2{
    position: absolute;
    background-color: #1C3C43;
    border-radius: 56px;
    height: 56px;
    width: 56px;
    top: 15px;
    right: 15px;
  }
  .skeleton-3{
    position: absolute;
    background-color: #1C3C43;
    border-radius: 10px;
    height: 110px;
    width: 390px;
    left: 290px;
    top: 261px;
  }
  .skeleton-4{
    position: absolute;
    background-color: #1C3C43;
    border-radius: 10px;
    height: 110px;
    width: 390px;
    left: 695px;
    top: 261px;
  }
  .skeleton-5 {
    position: absolute;
    background-color: #1C3C43;
    border-radius: 20px;
    height: 22px;
    width: 22px;
    left: 300px;
    top: 129px;
  }
  .skeleton-6 {
    position: absolute;
    background-color: #1C3C43;
    height: 20px;
    width: 100px;
    left: 325px;
    top: 130px;
  }

  .skeleton-7{
    position: absolute;
    background-color: #1C3C43;
    border-radius: 10px;
    height: 110px;
    width: 390px;
    left: 290px;
    top: 388px;
  }
  .skeleton-8 {
    position: absolute;
    background-color: #1C3C43;
    border-radius: 10px;
    height: 110px;
    width: 390px;
    left: 695px;
    top: 388px;
  }
  .skeleton-9 {
    position: absolute;
    background-color: #1C3C43;
    border-radius: 10px;
    height: 110px;
    width: 390px;
    left: 290px;
    top: 515px;
  }
}




</style>
