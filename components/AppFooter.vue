<template>
  <footer class="footer-wrapper" :class="show? 'footer-visible' : ''">
    <div class="footer-box">
      <!-- Logo and title area -->
      <div class="logo">
        <img src="~/assets/imgs/logo.svg" alt="Taurion logo" />
      </div>

      <!-- Navigation area -->
      <nav v-if="userLoggedIn">
        <ul>
<!--          <li ><a href="/reporting">{{ $t("AppFooter_a_1") }}</a></li>-->
<!--          <li><a href="/monitoring">{{ $t("AppFooter_a_2") }}</a></li>-->
<!--          <li><a href="/monitoring">{{ $t("AppFooter_a_3") }}</a></li>-->
        </ul>
      </nav>

      <!-- User action area -->
      <div class="user-actions">
        <a class="x-btn base-icon-btn" href="https://twitter.com/TaurionLab"  target="_blank">
          <img src="~/assets/imgs/x.svg" alt="Get Premium" />
        </a>
        <a class="facebook-btn base-icon-btn" href="https://discord.gg/2rfu26pVtS" target="_blank">
          <img src="~/assets/imgs/facebook.svg" alt="User profile" />
        </a>
        <a class="ins-btn base-icon-btn" href="https://t.me/Taurion" target="_blank">
          <img src="~/assets/imgs/ins.svg" alt="User profile" />
        </a>
      </div>
    </div>
    <div class="footer-box-2">
      <div class="left">
        © 2024 <span class="green">{{ $t("AppFooter_green_1") }}</span> ALL RIGHTS RESERVED.
      </div>
      <div class="right">
        <a class="bottom-link" :href="privacyLink" target="_blank">{{ $t("AppFooter_bottom-link_1") }}</a>
        <a class="bottom-link" :href="termsLink" target="_blank">{{ $t("AppFooter_bottom-link_2") }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "appFooter",
  props: {
    show: Boolean
  },
  data() {
    return {
      userLoggedIn: true,
      isVip: false,
    };
  },
  methods: {
  },
  computed: {
    privacyLink() {
      return "/privacy"
    },
    termsLink() {
      return '/terms'
    },
  }
};
</script>

<style scoped lang="less">
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  bottom: 20px;
  height: 100px;
  left: 0;
  width: 100vw;
  z-index: 3;
  transform: translateY(120%) scale(0.3); /* 初始状态：隐藏在视图下方 */
  transition: transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1); /* 贝塞尔缓动效果 */
  animation-delay: 3s;
  will-change: transform; /* 提示浏览器该属性将会变化，可能有助于性能优化 */
  &.footer-visible {
    transform: translateY(0) scale(0.9); /* 动画结束状态：完全可见 */
  }
  .footer-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-bottom: 16px;
    color: #fff;
    width: 1075px;
    border-bottom: 1px solid;
    border-image-source: linear-gradient(90deg, rgba(144, 170, 194, 1) 0%, rgba(173, 217, 241, 0) 100%);
    border-image-slice: 1;
    border-image-outset: 0.5px;
  }
}

.logo img {
  height: 38px; /* Adjust the size as needed */
}

.base-icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 70px;
  background: rgba(138, 173, 188, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.vip-btn {
  width: 167px;
  height: 44px;
  border-radius: 70px;
  margin: 0;
  background: rgba(138, 173, 188, 0.1);
}
nav {
  padding-left: 19px;
  ul {
    list-style: none;
    display: flex;
    gap: 1rem; /* Adjust the gap as needed */
    a {
      padding-left: 89px;
      font-family: 'Avenir';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height */
      text-transform: capitalize;
      text-decoration: none;
      color: #FFFFFF;


      &.active {
        color: rgba(140, 180, 189, 1);
        font-family: aifontf;
        font-size: 16px;
        font-weight: 800;
      }
    }
  }
}

.user-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 176px;
}

.user-profile span {
  margin-left: 8px;
}

.footer-box-2 {
  padding-top: 27px;
  width: 1075px;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 1);
  font-family: Avenir-Roman;
  font-size: 14px;
  text-transform: capitalize;
  .green {
    color: rgba(173, 241, 217, 1);
    text-transform: uppercase;
  }
  .right {
    display: flex;
    width: 300px;
    justify-content: space-between;
  }
}
</style>
