<template>
  <div class="skeleton-wrapper">
    <div class="skeleton-icon"></div>
    <div class="skeleton-title"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped>
.skeleton-wrapper {
  display: flex;
  align-items: center;
}

.skeleton-title{
  background-color: #1C3C43;
  margin: 10px 0;
  border-radius: 4px;
}

.skeleton-title {
  height: 35px;
  width: 120px;
}

.skeleton-icon{
  width: 40px;
  height: 40px;
  background-color: #1C3C43;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
