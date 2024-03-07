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
<script>
import AppHeader from "~/components/AppHeader/index.vue";
export default {
  components: {
    AppHeader
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getUserInfo')
  },
  methods: {

  }
}
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
    height: calc(100vh - 88px);
    display: flex;
    justify-content: center;
    overflow: visible;
  }
}

</style>
