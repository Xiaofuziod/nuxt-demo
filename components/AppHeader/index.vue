<template>
  <header class="header-box-wrapper">
    <div class="header-box">
      <!-- Logo and title area -->
      <div class="logo">
        <img src="~/assets/imgs/logo.svg" alt="Taurion logo" @click="goHome"/>
      </div>

      <!-- Navigation area -->
      <nav v-if="userLoggedIn">
        <ul>
          <li><a :class="`${routepath.includes('reporting') ? 'active' : ''}`" href="/reporting">
            <span>{{$t("REPORTING")}}</span>
          </a>
          </li>
          <li><a :class="`${routepath.includes('monitoring') ? 'active' : ''}`" href="/monitoring">
            <span>{{$t("MONITORING")}}</span></a>
          </li>
        </ul>
      </nav>

      <!-- User action area -->
      <div class="user-actions">
<!--        <div class="vip-btn base-icon-btn" v-if="userLoggedIn && !isVip">-->
<!--          <img src="~/assets/imgs/vip.svg" alt="Get Premium"/>-->
<!--          GET PREMIUM-->
<!--        </div>-->
<!--        <div class="x-btn base-icon-btn" v-if="!userLoggedIn">-->
<!--          <img src="~/assets/imgs/x.svg" alt="Get Premium"/>-->
<!--        </div>-->
        <div class="lang-btn base-icon-btn">
          <img src="~/assets/imgs/lang.svg" alt="User profile"/>
          <div class="option-list">
            <div class="option-item" @click.stop="changeLanguage('en')">English</div>
            <div class="option-item" @click.stop="changeLanguage('zh')">中文</div>
          </div>
        </div>
        <div v-if="!userLoggedIn" class="login-btn" @click="showLogin">{{ $t("AppHeader_index_login-btn_1") }}</div>
        <div v-else class="user-profile">
          <img src="~/assets/imgs/user.svg" alt="">

          <!--        账户操作-->
          <div class="user-setting">
            <div class="user-setting-content">
              <div @click="changeNickname">{{ $t("AppHeader_index_div_1") }}</div>
              <div @click="logout">{{ $t("AppHeader_index_div_2") }}</div>
            </div>
          </div>
        </div>
      </div>
      <login ref="loginRef"/>
      <edit-username ref="editUsernameRef"/>
    </div>
  </header>
</template>

<script>
import Login from "@/components/login/index.vue";
import editUsername from "@/components/editUsername.vue";

export default {
  components: {Login,editUsername},
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
      this.$refs.editUsernameRef.show()
    },
    changeLanguage(lang) {
      this.$i18n.setLocale(lang);
      setTimeout(()=>{
        window.location.reload()
      },200)
    },
    logout() {
      this.$localStorage.removeItem('token')
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

<style scoped lang="less">
.header-box-wrapper {
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
  margin: 0 8px 0 0;

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
      color: rgba(206, 184, 100, 0.3);
      text-decoration: none;
      font-family: aifont;
      cursor: pointer;
      font-size: 14px;

      &.active {
        color: rgba(206, 184, 100, 1);
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
    border-radius: 16px;
    z-index: 10;
    padding-top: 60px;
    display: none;

    .user-setting-content {
      background: rgba(38, 64, 64, 0.30);
      backdrop-filter: blur(100px);
      padding: 20px;
      border-radius: 16px;
      div {
        color: #FFF;
        font-family: Avenir;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;

        &:first-child {
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(140, 180, 189, 0.12);
        }
      }
    }

  }
}

.user-profile span {
  margin-left: 8px;
}


.lang-btn {
  position: relative;
  .option-list {
    display: none; // Initially hide the option list
    position: absolute;
    left: 10px;
    top: 30px;
    background-color: rgba(68, 215, 182, 0.2);
    border-radius: 4px; // Optional: for rounded corners
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // Optional: for a slight shadow
    z-index: 100; // Ensure it's on top of other elements
    .option-item {
      padding: 8px 16px; // Example padding, adjust as needed
      cursor: pointer;
      color: #fff;
      &:hover {
        background-color: rgba(68, 215, 182, 0.5);
      }
    }
  }

  &:hover .option-list {
    display: block; // Show on hover
  }
}
</style>
