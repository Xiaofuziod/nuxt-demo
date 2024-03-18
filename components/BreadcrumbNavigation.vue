<template>
  <div class="bread-path">
    <span class="ai-font">{{ $t("breadcrumb_ai-font_1") }}</span>
    <span class="split-icon">{{ $t("breadcrumb_split-icon_1") }}</span>
    <img src="~/assets/imgs/user.svg" alt="">
    <span>{{user.account}}</span>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    pic: {
      type: String,
      default() {
        return "~/assets/imgs/user.svg";
      },
    },
    name: {
      type: String,
      default() {
        return "user";
      },
    },
  },
  computed:{
    user() {
      return this.$store.state.user.userInfo
    }
  },
}
</script>
<style scoped lang="less">
.bread-path {
  font-size: 9px;
  margin-bottom: 49px;
  color: rgba(140, 180, 189, 0.6);
  display: flex;
  align-items: center;

  .ai-font {
    font-family: aifontf;
    margin-right: 4px;
  }

  img {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    margin: 0 4px;
  }
}
</style>
