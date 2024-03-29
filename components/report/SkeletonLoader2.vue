<template>
  <div class="skeleton-wrapper">
    <div class="skeleton-title1"></div>
    <div class="skeleton-wrapper-box"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped>


.skeleton-title1{
  background-color: #1C3C43;
  border-radius: 4px;
  height: 25px;
  width: 120px;
  margin-bottom: 19px;
}

.skeleton-wrapper-box{
  width: 305px;
  height: 120px;
  background-color: #1C3C43;
  border-radius: 16px;
  padding: 19px 24px 10px 24px;
}

.skeleton-title{
  background-color: #1C3C43;
  margin: 10px 0;
  border-radius: 4px;
}

</style>
