<template>
  <header>
    <div class="header-box">
      <!-- Logo and title area -->
      <div class="logo">
        <img src="~/assets/imgs/logo.svg" alt="Taurion logo" />
      </div>

      <!-- Navigation area -->
      <nav v-if="userLoggedIn">
        <ul>
          <li ><a :class="`${routepath.includes('reporting') ? 'active' : ''}`" href="/zh/reporting">AI Reporting</a></li>
          <li><a :class="`${routepath.includes('monitoring') ? 'active' : ''}`" href="/zh/monitoring">AI Monitoring</a></li>
        </ul>
      </nav>

      <!-- User action area -->
      <div class="user-actions">
        <div class="vip-btn base-icon-btn" v-if="userLoggedIn && !isVip">
          <img src="~/assets/imgs/vip.svg" alt="Get Premium" />
          Get Premium
        </div>
        <div class="x-btn base-icon-btn" v-if="!userLoggedIn">
          <img src="~/assets/imgs/x.svg" alt="Get Premium" />
        </div>
        <div class="lang-btn base-icon-btn">
          <img src="~/assets/imgs/lang.svg" alt="User profile" />
        </div>
        <div v-if="!userLoggedIn" class="login-btn">
          LOGIN
        </div>
        <div v-else class="user-profile">
          <img   src="~/assets/imgs/user.svg" alt="">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userLoggedIn: true,
      isVip: false,
    };
  },
  methods: {
  },
  computed: {
    routepath() {
      return this.$route.path
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  .header-box {
    width: 1152px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: #fff;
  }
}

.logo img {
  height: 50px; /* Adjust the size as needed */
}

.login-btn {
  font-family: aifont;
  color: #FFF;
  width: 138px;
  height: 39px;
  font-size: 16px;
  line-height: 39px;
  text-align: center;
  background: url(~/assets/imgs/loginbtn.svg) no-repeat 100%;
  background-size: 100% 100%;
  cursor: pointer;
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
  margin: 0 16px;
}
.vip-btn {
  width: 167px;
  height: 44px;
  border-radius: 70px;
  margin: 0;
  background: rgba(138, 173, 188, 0.1);
}
nav {
  flex: 1;
  padding-left: 19px;
  ul {
    list-style: none;
    display: flex;
    gap: 1rem; /* Adjust the gap as needed */
    a {
      padding-left: 45px;
      color: rgba(140, 180, 189, 0.3);
      text-decoration: none;
      font-family: aifont;
      cursor: pointer;
      font-size: 14px;
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
  gap: 1rem;
}

.user-profile {
  border-left: 1px solid #8CB4BD;
  padding-left: 32px;
  overflow: visible;
  display: flex;align-items: center;
  justify-content: center;
  height: 24px;
  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }
}

.user-profile span {
  margin-left: 8px;
}
</style>
