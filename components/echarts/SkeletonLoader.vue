<template>
  <div class="skeleton-content">
    <div class="skeleton-wrapper">
      <div class="skeleton-icon"></div>
      <div class="skeleton-title"></div>
    </div>
    <div class="skeleton-title"></div>
    <div class="skeleton-echart"></div>
  </div>

</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped>
.skeleton-content{
  padding: 0 40px;
}
.skeleton-wrapper {
  display: flex;
  align-items: center;

}

.skeleton-echart{
  height: 260px;
  background-color: #1C3C43;
  border-radius: 4px;
  margin-top: 20px;
}

.skeleton-title{
  background-color: #1C3C43;
  margin: 10px 0;
  border-radius: 4px;
}

.skeleton-title {
  height: 25px;
  width: 150px;
}

.skeleton-icon{
  width: 32px;
  height: 32px;
  background-color: #1C3C43;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
