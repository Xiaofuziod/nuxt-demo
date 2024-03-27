<template>
  <div class="bread-path">
    <span class="ai-font" @click="$emit('click')">{{ $t("breadcrumb_ai-font_1") }}</span>
    <span class="split-icon">{{ $t("breadcrumb_split-icon_1") }}</span>
    <img :src="user.avatar" alt="">
    <span>{{user.nickname}}</span>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
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
  font-size: 14px;
  margin-bottom: 40px;
  color: rgba(140, 180, 189, 0.6);
  display: flex;
  align-items: center;

  .ai-font {
    font-family: aifontf;
    margin-right: 4px;
    cursor: pointer;
  }

  img {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin: 0 4px;
  }
}
</style>
