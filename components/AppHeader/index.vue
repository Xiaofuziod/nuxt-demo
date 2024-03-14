<template>
  <header>
    <div class="header-box">
      <!-- Logo and title area -->
      <div class="logo">
        <img src="~/assets/imgs/logo.svg" alt="Taurion logo" @click="goHome"/>
      </div>

      <!-- Navigation area -->
      <nav v-if="userLoggedIn">
        <ul>
          <li><a :class="`${routepath.includes('reporting') ? 'active' : ''}`" href="/reporting">AI Reporting</a>
          </li>
          <li><a :class="`${routepath.includes('monitoring') ? 'active' : ''}`" href="/monitoring">AI Monitoring</a>
          </li>
        </ul>
      </nav>

      <!-- User action area -->
      <div class="user-actions">
        <div class="vip-btn base-icon-btn" v-if="userLoggedIn && !isVip">
          <img src="~/assets/imgs/vip.svg" alt="Get Premium"/>
          GET PREMIUM
        </div>
        <div class="x-btn base-icon-btn" v-if="!userLoggedIn">
          <img src="~/assets/imgs/x.svg" alt="Get Premium"/>
        </div>
        <div class="lang-btn base-icon-btn">
          <img src="~/assets/imgs/lang.svg" alt="User profile"/>
        </div>
        <div v-if="!userLoggedIn" class="login-btn" @click="showLogin">
          LOGIN
        </div>
        <div v-else class="user-profile">
          <img src="~/assets/imgs/user.svg" alt="">

          <!--        账户操作-->
          <div class="user-setting">
            <div @click="changeNickname">修改昵称</div>
            <div @click="logout">退出登录</div>
          </div>
        </div>
      </div>
      <login ref="loginRef"/>
    </div>
  </header>
</template>

<script>
import Login from "@/components/login/index.vue";

export default {
  components: {Login},
  data() {
    return {
      userLoggedIn: true,
      isVip: false,
      showUserSetting: false
    };
  },
  mounted() {
    // Check if user is logged in
    const token = this.$localStorage.getItem('token')
    this.userLoggedIn = !!token
    // Check if user is a VIP

    // 处理事件
    this.$bus.$on('LOGON_SUCCESS', () => {
      this.userLoggedIn = true
    });

    // this.showLogin()
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    showLogin() {
      this.$refs.loginRef.show()
    },
    changeNickname() {
      this.showUserSetting = false
    },
    logout() {
      this.$localStorage.removeItem('token')
      this.showUserSetting = false
      this.userLoggedIn = false
      this.$router.replace('/')
    }
  },
  computed: {
    routepath() {
      return this.$route.path
    }
  },
  beforeDestroy() {
    this.$bus.$off('LOGON_SUCCESS')
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
  cursor: pointer;
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
  font-family: 'Avenir';
  font-style: normal;
  font-size: 14px;
  color: #8CB4BD;
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
  position: relative;
}

.user-profile {
  padding-left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 24px;
    background: #8CB4BD;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }

  &:hover .user-setting {
    display: block;
  }

  .user-setting {
    position: absolute;
    top: 0;
    right: -20px;
    padding-top: 60px;
    width: 100px;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: none;

    div {
      text-align: center;
      color: #000;
      line-height: 40px;
      background: #fff;
      cursor: pointer;
      border-radius: 3px;
      margin-top: 1px;
    }
  }
}

.user-profile span {
  margin-left: 8px;
}
</style>
