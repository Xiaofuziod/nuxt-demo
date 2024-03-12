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
    const token = this.$localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('user/getUserInfo')
    }
  },
  methods: {}
}
</script>

<style lang="less">
body {
  background: linear-gradient(180deg, rgba(5, 14, 32, 1) 0%, rgba(8, 35, 61, 1) 100%);
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
  overflow-x: auto;
  overflow-y: hidden;

  .page-container {
    height: calc(100vh - 88px);
    position: relative;
    display: flex;
    justify-content: center;
  }
}

</style>
