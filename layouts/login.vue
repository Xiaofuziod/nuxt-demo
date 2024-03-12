<template>
  <div class="login-main">
    <nuxt/>
  </div>
</template>
<script>
export default {
  name: 'LoginLayout',
  data() {
    return {};
  },
  mounted() {

  },
  methods: {}
}
</script>

<style lang="less" scoped>
body {
  background: linear-gradient(180deg, rgba(5, 14, 32, 1) 0%, rgba(8, 35, 61, 1) 100%);
  font-family: Avenir;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-main {
  height: 100vh;
  font-size: 18px;
  color: #FFFFFF;
  text-align: center;
  box-sizing: border-box;
  padding-top: 100px;
}

</style>
