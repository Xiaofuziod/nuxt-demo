<template>
  <div class="app-content">
    <div class="header">
    </div>
    <nuxt/>
    <div class="footer">
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 100px;
}

.app-content {
  min-height: 100vh;
  background-color: rgba(5, 15, 33, 1);
  position: relative;
}

</style>
