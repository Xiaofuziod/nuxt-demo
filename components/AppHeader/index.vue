<template>
  <header class="header-box-wrapper">
    <div class="header-box">
      <!-- Logo and title area -->
      <div class="logo">
        <img src="~/assets/imgs/logo.svg" alt="Taurion logo" @click="goHome"/>
      </div>

      <!-- Navigation area -->
      <nav v-if="userLoggedIn && !routepath.includes('welcome')">
        <ul>
          <li><a :class="`${routepath.includes('reporting') ? 'active' : ''}`" :href="`${langPath}/reporting`">
            <span>{{$t("REPORTING")}}</span>
          </a>
          </li>
          <li><a :class="`${routepath.includes('monitoring') ? 'active' : ''}`" :href="`${langPath}/monitoring`">
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
<!--          <img v-else src="~/assets/imgs/lang.svg"  alt="User profile"/>-->
          <span v-if="$i18n.locale === 'en'">EN</span>
          <span v-if="$i18n.locale === 'pt-br'">PT</span>
          <span v-if="$i18n.locale === 'zh'">ZH</span>
          <div class="lang-setting"  v-if="!changing">
            <div class="lang-setting-content">
              <div class="option-item" :class="$i18n.locale === 'en' ? 'active':''" @click.stop="changeLanguage('en')">English</div>
              <div class="option-item" :class="$i18n.locale === 'pt-br' ? 'active':''" @click.stop="changeLanguage('pt-br')">Português Brasil</div>
              <div class="option-item" :class="$i18n.locale === 'zh' ? 'active':''" @click.stop="changeLanguage('zh')">中文</div>
            </div>
          </div>
        </div>
        <div v-if="!userLoggedIn" class="login-btn" @click="showLogin">{{ $t("AppHeader_index_login-btn_1") }}</div>
        <div v-else class="user-profile">
          <img :src="user.avatar" alt="">

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
  components: {Login, editUsername},
  data() {
    return {
      userLoggedIn: true,
      isVip: false,
      showUserSetting: false,
      changing: false
    };
  },
  mounted() {
    // Check if user is logged in
    const token = this.$localStorage.getItem('token')
    this.userLoggedIn = !!token

    // 处理事件
    this.$bus.$on('LOGON_SUCCESS', () => {
      this.userLoggedIn = true
    });
    this.$bus.$on('REGISTER_SUCCESS', () => {
      this.userLoggedIn = true
    });


    // this.showLogin()

    const query = this.$route.query
    if (query && query.t === 'login') {
      this.showLogin()
    }
  },
  methods: {
    goHome() {
      this.$router.push(this.localeRoute('/'))
    },
    showLogin() {
      this.$refs.loginRef.show()
    },
    changeNickname() {
      this.$refs.editUsernameRef.show()
    },
    async changeLanguage(lang) {
      this.$loading.start(this.$t('languageSwitch'));
      this.changing = true
      await this.$i18n.setLocale(lang);
      this.changing = false
      this.$loading.finish();
      setTimeout(()=>{
        window.location.reload()
      },200)
    },
    logout() {
      this.$localStorage.removeItem('token')
      this.userLoggedIn = false
      this.$store.dispatch('chat/clearMessageList')
      this.$router.replace('/')
    }
  },
  computed: {
    user() {
      return this.$store.state.user.userInfo
    },
    routepath() {
      return this.$route.path
    },
    langPath() {
      return this.$i18n.locale === "en" ? '' : `/${this.$i18n.locale}`
    }
  },
  beforeDestroy() {
    this.$bus.$off('LOGON_SUCCESS')
    this.$bus.$off('REGISTER_SUCCESS')
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


.logo {
  height: 30px;
  width: 109px;
  img {
    width: 109px;
    cursor: pointer;
  }
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
      cursor: pointer;
      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgba(140, 180, 189, 0.12);
      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: none
      }
    }
  }

}
.user-profile span {
  margin-left: 8px;
}


.lang-btn {
  position: relative;
  color: #CEB864;
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: capitalize;

  &:hover .lang-setting {
    display: block;
  }
}

.lang-setting {
  position: absolute;
  top: 0;
  right: -60px;
  border-radius: 16px;
  z-index: 10;
  padding-top: 60px;
  display: none;

  .lang-setting-content {
    background: rgba(38, 64, 64, 0.30);
    backdrop-filter: blur(100px);
    padding: 10px 20px;
    border-radius: 16px;
    overflow: hidden;
    .option-item {
      color: #FFF;
      font-family: Avenir;
      width: 120px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
      cursor: pointer;
      padding: 8px 12px;
      border-bottom: 1px solid rgba(140, 180, 189, 0.12);
      &.active {
        color: #CEB864;
      }
      &:hover {
        //background: rgba(65, 110, 110, 0.5);
        color: #CEB864;
      }
      &:first-child {
        //padding-top: 12px;
      }
      &:last-child {
        //padding-bottom: 12px;
        border-bottom: none
      }
    }
  }

}
</style>
