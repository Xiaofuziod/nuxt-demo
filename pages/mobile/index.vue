<template>
  <div class="mobile-wrapper" :class="listShow ? 'nobg' :''">
    <div class="header">
      <div class="logo">
        <img src="@/assets/imgs/logo.svg" alt="">
      </div>
      <div class="list" @click="toggleShow">
        <img src="@/assets/imgs/mobile/list.svg" v-if="!listShow" alt="" >
        <img src="@/assets/imgs/mobile/close.svg" v-else alt="" >
      </div>
    </div>
    <div class="mobile-content" v-if="!listShow">
      <mobile-banner1/>
      <div class="start-btn-mobile"  @click="boxShow=true">
        <div class="chat-top-image">
          <img class="mic-icon" src="@/assets/imgs/user/default.png" alt="">
        </div>
        <span class="text">{{$t('MobileLunch')}}</span>
        <img class="go-icon" src="@/assets/imgs/mobile/mobilego.svg" alt="">
      </div>
      <!--      <div class="footer-box">-->
      <!--        <div class="user-actions">-->
      <!--          <a class="x-btn base-icon-btn" href="https://twitter.com/TaurionLab"  target="_blank">-->
      <!--            <img src="~/assets/imgs/x.svg" alt="Get Premium" />-->
      <!--          </a>-->
      <!--          <a class="facebook-btn base-icon-btn" href="https://discord.gg/2rfu26pVtS" target="_blank">-->
      <!--            <img src="~/assets/imgs/facebook.svg" alt="User profile" />-->
      <!--          </a>-->
      <!--          <a class="ins-btn base-icon-btn" href="https://t.me/Taurion" target="_blank">-->
      <!--            <img src="~/assets/imgs/ins.svg" alt="User profile" />-->
      <!--          </a>-->
      <!--        </div>-->

      <!--        <div class="footer-mobile">-->
      <!--          © 2024 <span class="green">{{ $t("AppFooter_green_1") }}</span> ALL RIGHTS RESERVED.-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="mobile-option" v-else>
      <p class="title">{{ $t("mobile-home") }}</p>
      <a class="bottom-link" :href="privacyLink" target="_blank">{{ $t("AppFooter_bottom-link_1") }}</a>
      <a class="bottom-link" :href="termsLink" target="_blank">{{ $t("AppFooter_bottom-link_2") }}</a>
    </div>


    <div class="tips-box" v-if="boxShow">
      <div class="box-content">
        <div class="chat-top-image">
          <img class="mic-icon" src="@/assets/imgs/user/default.png" alt="">
        </div>
        <img src="@/assets/imgs/mobile/close2.svg" class="close-icon"  @click="boxShow=false" alt="" >
        <div class="pc-btn" @click="copyText">
          <img src="@/assets/imgs/mobile/ling.svg" alt="">
          <span class="text">https://taurion.ai</span>
        </div>
        <div class="tip">
          {{$t('pcOnly')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MobileBanner1 from "@/components/pageui/mobileBanner1.vue";

export default {
  name: "mobile",
  components: {MobileBanner1},
  data() {
    return {
      listShow: false,
      boxShow: false
    }
  },
  computed: {
    privacyLink() {
      return this.localeRoute('/mobile/privacy').fullPath
    },
    termsLink() {
      return this.localeRoute('/mobile/terms').fullPath
    },
  },
  methods: {
    toggleShow() {
      this.listShow = !this.listShow
    },
    copyText() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText("https://taurion.ai")
            .then(() => {
              this.$toast.success('copy success')
            })
            .catch((err) => {
              console.error('Failed to copy text: ', err);
            });
      } else {
        // Fallback 方法，使用较旧的 document.execCommand() 方法
        let textArea = document.createElement("textarea");
        textArea.value = "https://taurion.ai";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          this.$toast.success('copy success')
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
      }
    }
  },
};
</script>

<style scoped lang="less">
.mobile-wrapper {
  background: url("@/assets/imgs/mobile/bg.svg") no-repeat;
  &.nobg {
    background: none
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .header {
    display: flex;
    padding: 1rem 1rem;
    width: 100vw;
    justify-content: space-between;
  }
  .mobile-content {
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 68px);
  }
  .start-btn-mobile {
    width: 310px;
    height: 64px;
    margin-top: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 70px;
    background: rgba(140, 180, 189, 0.20);
    backdrop-filter: blur(108.94999694824219px);
    .go-icon {
      padding-right: 8px;
    }
    .text {
      color: #8CB4BD;
      font-family: Avenir;
      font-size: 16px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
    }
    .chat-top-image {
      width: 64px;
      height: 64px;
      border-radius: 64px;
      background: rgba(140, 180, 189, 0.20);
      padding: 8px;
      flex-shrink: 0;
      position: relative;
      &:after {
        content: " ";
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 80px;
        background: rgba(140, 180, 189, 0.20);
        top: -8px;
        left: -8px;
      }
      .mic-icon {
        width: 48px;
        height: 48px;
        border-radius: 48px;
      }

    }
  }
}
.user-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 176px;
  margin-top: 77px;
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
.footer-mobile {
  padding-top: 27px;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 1);
  font-family: Avenir-Roman;
  font-size: 10px;
  padding-bottom: 20px;
  .green {
    color: rgba(173, 241, 217, 1);
  }
}
.footer-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
}
.mobile-option {
  color: #FFF;
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  width: 100vw;
  .title {
    color: #CEB864;
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 21px */
  }
  .title,
  .bottom-link {
    display: block;
    height: 48px;
    line-height: 48px;
    width: 100vw;
    flex-shrink: 0;
    padding-left: 24px;
  }
}

.tips-box {
  background: rgba(0, 0, 0, 0.90);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-content {
    width: 327px;
    height: 204px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    border-radius: 32px;
    background:  #0f1516;
    backdrop-filter: blur(100px);
    padding-top: 50px;
    .close-icon {
      position: absolute;
      top: 16px;
      right: 16px;
    }
    .pc-btn {
      width: 179px;
      height: 48px;
      background: rgba(138, 173, 188, 0.20);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px 16px 16px 0;
      .text {
        color: #CEB864;
        font-family: Avenir;
        font-size: 16px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        padding-left: 5px;
        text-decoration-line: underline;
      }
    }
    .chat-top-image {
      position: absolute;
      top: -50px;
      width: 100px;
      height: 100px;
      border-radius: 100px;
      background: #182325;
      padding: 10px;
      flex-shrink: 0;
      &:after {
        content: " ";
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 120px;
        background: #141d1b;
        top: -10px;
        left: -10px;
        z-index: -1;
      }
      .mic-icon {
        width: 80px;
        height: 80px;
        border-radius: 48px;
        z-index: 0;
      }

    }
    .tip {
      color: rgba(255, 255, 255, 0.50);
      font-family: Avenir;
      font-size: 12px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      margin-top: 37px;
    }
  }
}

@media (min-height: 800px) {
  .footer-box {
    position: absolute;
    left: 0px;
    bottom: 20px;
  }
}
</style>
