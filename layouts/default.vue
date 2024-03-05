<template>
  <div class="main">
    <AppHeader></AppHeader>
    <div class="page-container">
      <nuxt/>
    </div>
    <div class="footer">
    </div>
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~/components/AppHeader/index.vue";
</script>

<style lang="less">
body {
  background: rgba(5, 15, 33, 1);
  font-family: Avenir;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  overflow: hidden;
  .page-container {
    height: calc(100vh - 104px);
    display: flex;
    justify-content: center;
    overflow: visible;
  }
}

</style>
