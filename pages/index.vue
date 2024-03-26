<template>
  <div class="home-wrapper">
    <div class="container">
      <div class="banner-1">
        <div class="banner-left">
          <div class="title1">{{ $t("MONITORING") }}</div>
          <div class="title2">{{ $t("pages_index_title2_1") }}</div>
          <div class="banner-1-btn"></div>
          <div class="desc-code">
            <typing-text
                :lines="[
              { text: 'BUILD        THE  ' },
              { text: 'BEST   WEB3' },
              { text: 'INVESTMENT PRODUCTS' },
        ]"
            />
          </div>
        </div>
        <img src="~/assets/imgs/home-banner-1.svg" alt="">
      </div>
      <div class="banner-2">
        <div class="banner-left">
          <div class="title1">{{ $t("REPORTING") }}</div>
          <div class="title2">{{ $t("pages_index_title2_2") }}</div>
          <div class="desc">{{ $t("pages_index_desc_1") }}</div>
          <img class="arc-line" src="~/assets/imgs/banner-arc-line.png" alt="">
        </div>
        <img src="~/assets/imgs/home-banner-2.svg" alt="">
      </div>
      <div class="banner-3">
        <img src="~/assets/imgs/home-banner-3.svg" alt="">
        <div class="banner-right">
          <div class="title1">{{ $t("FEEDBACK") }}</div>
          <div class="title2">{{ $t("pages_index_title2_3") }}</div>
          <div class="desc">{{ $t("pages_index_desc_1") }}</div>
          <img class="arc-line" src="~/assets/imgs/banner-arc-line.png" alt="">
        </div>
      </div>
      <div class="banner-4">
        <div class="title1">{{ $t("pages_index_title1_4") }}</div>
        <div class="title2">{{ $t("pages_index_title2_3") }}</div>
        <user-pop v-if="banner4Visible1" top="155px" left="15px" />
        <user-pop v-if="banner4Visible2" top="488px" left="962px" />
        <user-pop v-if="banner4Visible3" top="215px" left="755px" />
        <user-pop v-if="banner4Visible4" top="472px" left="330px" />
      </div>
      <div class="banner-5">
        <div class="title1">{{ $t("pages_index_title1_5") }}</div>
        <div class="partner" style="margin-left: 57px"><img src="~/assets/imgs/partner1.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner2.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner3.png" alt=""></div>
        <div class="partner" style="margin-left: 167px"><img src="~/assets/imgs/partner1.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner2.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner3.png" alt=""></div>
      </div>
      <app-footer/>
    </div>
  </div>
</template>
<script>
import UserPop from "@/components/pageui/userPop.vue";

export default {
  name: 'Home',
  components: {UserPop},
  data() {
    return {
      banner4Visible1: false,
      banner4Visible2: false,
      banner4Visible3: false,
      banner4Visible4: false,
    }
  },
  mounted() {
    // 一点登录的逻辑
    const query = this.$route.query
    if (query.code) {
      const redirect_uri = `${window.location.origin}`;
      this.$store.dispatch('user/googleLogin', {code:query.code, url: redirect_uri})
    }

    if (query.oauth_token) {
      this.$store.dispatch('user/twitterLogin', this.$route.query)
    }


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {this.banner4Visible1 = true;},200)
          setTimeout(() => {this.banner4Visible2 = true;},1200)
          setTimeout(() => {this.banner4Visible3 = true;},2200)
          setTimeout(() => {this.banner4Visible4 = true;},3200)
        }
      });
    }, { threshold: 0.3 }); // threshold 表示元素有10%出现在视口中时触发

    const element = this.$el.querySelector('.banner-4'); // 或者直接使用 user-pop 的 class 或 id
    observer.observe(element);
  }
}
</script>
<style lang="less" scoped>
.home-wrapper {
  position: relative;
  overflow: scroll;
  width: 100%;
  z-index: 0;
  padding-top: 16px;
  text-align: center;

  .container {
    position: relative;
    z-index: 1;
    text-align: left;
    display: inline-block;
  }

  .banner-1 {
    width: 1244px;
    height: 702.7px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .desc-code {
    }
    .banner-left {
      padding: 181px 0 101px 64px;

      .title1 {
        width: 595px;
        height: 100px;
        color: rgba(255, 255, 255, 1);
        font-family: aifont;
        font-size: 61.1px;
        line-height: 120px;
        text-transform: capitalize;
      }

      .title2 {
        color: rgba(206, 184, 100, 1);
        font-size: 118px;
        width: 595px;
        height: 100px;
        font-family: aifont;
        line-height: 120px;
        text-transform: capitalize;
      }

      .banner-1-btn {
        width: 298px;
        height: 71px;
        border-radius: 51px;
        background: rgba(217, 217, 217, 1);
        margin: 20px 0;
      }

      .desc-img {
        height: 96px;
      }
    }

    &:after {
      background: rgba(11, 14, 12, 0.3);
      backdrop-filter: blur(100px);
      content: '';
      position: absolute;
      width: 1427px;
      height: 1468px;
      transform: rotate(45deg);
      left: 5px;
      top: -375px;
      z-index: -1;
    }
  }


  .banner-2 {
    width: 1244px;
    height: 702.7px;
    margin-top: 123px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .arc-line {
      position: absolute;
      top: 100px;
      right: 50px;
    }

    .banner-left {
      padding: 104px 0 101px 124px;
      position: relative;

      .arc-line {
        position: absolute;
        top: 221px;
        right: 45px;
        width: 171px;
      }

      .title1 {
        width: 595px;
        height: 85px;
        color: rgba(206, 184, 100, 1);
        font-family: aifont;
        font-size: 72px;
        line-height: 120px;
        text-transform: capitalize;
      }

      .title2 {
        color: rgba(217, 217, 217, 1);
        font-size: 56px;
        width: 595px;
        height: 94px;
        font-family: aifont;
        line-height: 120px;
        text-transform: capitalize;
      }

      .desc {
        top: 1252px;
        left: 160px;
        width: 523px;
        height: 132px;
        opacity: 0.5;
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        margin-top: 47px;
      }
    }
  }

  .banner-3 {
    width: 1244px;
    height: 702.7px;
    margin-top: 123px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding-left: 124px;

    .arc-line {
      position: absolute;
      top: 100px;
      right: 50px;
    }

    .banner-right {
      padding: 104px 0px 101px 0px;
      position: relative;

      .arc-line {
        position: absolute;
        top: 221px;
        right: 45px;
        width: 171px;
      }

      .title1 {
        width: 595px;
        height: 85px;
        color: rgba(206, 184, 100, 1);
        font-family: aifont;
        font-size: 72px;
        line-height: 120px;
        text-transform: capitalize;
      }

      .title2 {
        color: rgba(217, 217, 217, 1);
        font-size: 56px;
        width: 595px;
        height: 94px;
        font-family: aifont;
        line-height: 120px;
        text-transform: capitalize;
      }

      .desc {
        top: 1252px;
        left: 160px;
        width: 523px;
        height: 132px;
        opacity: 0.5;
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        margin-top: 47px;
      }
    }
  }

  .banner-4 {
    width: 1198.3px;
    height: 799.57px;
    background: url(~/assets/imgs/map.png) no-repeat no-repeat;
    background-size: 100%;
    background-position: bottom;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin-top: 123px;

    .title1 {
      width: 372px;
      height: 68px;
      color: rgba(206, 184, 100, 1);
      font-family: aifont;
      font-size: 72px;
      text-transform: capitalize;
    }

    .title2 {
      width: 376px;
      height: 42px;
      color: rgba(255, 255, 255, 1);
      font-family: aifont;
      font-size: 44px;
      text-transform: capitalize;
    }
  }

  .banner-5 {
    display: flex;
    flex-wrap: wrap;
    width: 1198.3px;
    margin-top: 123px;

    .title1 {
      width: 1198px;
      height: 86px;
      margin-bottom: 60px;
      font-family: aifont;
      font-style: normal;
      font-weight: 400;
      font-size: 90px;
      line-height: 85px;
      text-transform: capitalize;
      color: #CEB864;
    }

    .partner {
      width: 322.8px;
      height: 322.8px;

      margin: 10px;
      overflow: hidden;
      position: relative;
      z-index: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 300px;
      }

      &:after {
        background: rgba(153, 188, 138, 0.1);
        content: '';
        position: absolute;
        width: 375px;
        height: 683px;
        transform: rotate(45deg);
        left: -67px;
        top: -135px;
        z-index: -1;
      }
    }
  }
}
</style>

