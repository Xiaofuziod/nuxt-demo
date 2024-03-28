<template>
  <div class="home-wrapper" ref="homeWrapper">
    <div class="container">
      <div class="banner-1">
        <div class="banner-left">
          <div class="title1">YOUR CRYPTO</div>
          <div class="title2">AI CO-PILOT</div>
          <div class="desc-code">
            <typing-text
                font-size="29px"
                margin-bottom="12px"
                width="20ch"
                :lines="[
              { text: 'SIMPLE, EFFICIENT,' },
              { text: 'BARRIER FREE ' }        ]"
            />
          </div>
        </div>
        <home-banner1/>
      </div>
      <div class="banner-slide banner-slide-1">
        <div class="banner-left" :style="slideStyle1.left">
          <div class="title1">Analysis</div>
          <div class="title2">Taurion GPT</div>
          <div class="desc">Provide real-time AI-refined reports with
            prompts to enhance your decision-making efficiency.
          </div>
        </div>
        <img class="banner-center" src="~/assets/imgs/home-banner-2-center.svg" :style="slideStyle1.center" alt="">
        <img class="banner-right" src="~/assets/imgs/home-banner-2.svg" :style="slideStyle1.right" alt="">
      </div>
      <div class="banner-slide banner-slide-2">
        <div class="banner-left" :style="slideStyle2.left">
          <div class="title1">Execution</div>
          <div class="title2">Taurion Agent</div>
          <div class="desc">Let Taurion be your agent, handling tedious
            trading steps for you and increase your trading bandwidth.
          </div>
        </div>
        <img class="banner-center" src="~/assets/imgs/home-banner-3-center.svg" :style="slideStyle2.center" alt="">
        <img class="banner-right" src="~/assets/imgs/home-banner-3.svg" :style="slideStyle2.right" alt="">
      </div>
      <div class="banner-slide banner-slide-3">
        <div class="banner-left" :style="slideStyle3.left">
          <div class="title1">Ecosystem</div>
          <div class="title2">AI-driven Community</div>
          <div class="desc">AI-native info flow model where everyone can generate and share portfolios by prompts,
            and earn profits.
          </div>
        </div>
        <img class="banner-center" src="~/assets/imgs/home-banner-4-center.svg" :style="slideStyle3.center" alt="">
        <img class="banner-right" src="~/assets/imgs/home-banner-4.svg" :style="slideStyle3.right" alt="">
      </div>
      <div class="banner-4">
        <div class="title1">feedback</div>
        <div class="title2">from our Community</div>
        <user-pop v-if="banner4Visible1" :info="userPops[0]"/>
        <user-pop v-if="banner4Visible2" :info="userPops[1]"/>
        <user-pop v-if="banner4Visible3" :info="userPops[2]"/>
        <user-pop v-if="banner4Visible4" :info="userPops[3]"/>
      </div>
      <div class="banner-5">
        <div class="title1">Our AI Learns from the Best</div>
        <DirectionAwareHoverEffect/>
      </div>
      <app-footer/>
    </div>
  </div>
</template>
<script>
import UserPop from "@/components/pageui/userPop.vue";
import DirectionAwareHoverEffect from "@/components/pageui/DirectionAwareHoverEffect.vue";
import HomeBanner1 from "@/components/pageui/homeBanner1.vue";

const bannerStyles = {
  bannerLeftY: 100, // 初始从下到上的偏移量
  bannerLeftOpacity: 0, // 初始透明度
  bannerCenterScale: 0, // 初始缩放比例
  bannerRightX: 100, // 初始从右到左的偏移量
}
const transferStyle = (bannerStyles) => {
  return {
    left: {transform: `translateY(${bannerStyles.bannerLeftY}px)`, opacity: bannerStyles.bannerLeftOpacity},
    center: {transform: `scale(${bannerStyles.bannerCenterScale})`},
    right: {transform: `translateX(${bannerStyles.bannerRightX}px)`, opacity: bannerStyles.bannerLeftOpacity}
  }
}
export default {
  name: 'Home',
  components: {HomeBanner1, DirectionAwareHoverEffect, UserPop},
  data() {
    return {
      banner4Visible1: false,
      banner4Visible2: false,
      banner4Visible3: false,
      banner4Visible4: false,
      slideStyle1: transferStyle(bannerStyles),
      slideStyle2: transferStyle(bannerStyles),
      slideStyle3: transferStyle(bannerStyles),
      userPops: [
        {
          pic: '',
          name: 'Michael T.',
          title: 'Engineer',
          style: {
            top: "120px",
            left: "15px",
            width: "281px",
            height: "192px"
          },
          lines: [
            {text: 'Taurion transformed my approach to'},
            {text: 'crypto investment. As a newcomer to'},
            {text: 'web3, the overwhelming risks and'},
            {text: 'extensive research needed left me'},
            {text: 'feeling lost. Thanks to Taurion, I\'ve'},
            {text: 'found a solution to these challenges. '}
          ]
        },
        {
          pic: '',
          name: 'Alexander H.',
          title: 'Student',
          style: {
            top: "438px",
            left: "962px",
            width: "285px",
            height: "156px"
          },
          lines: [
            {text: 'This AI tool is truly amazing! It saves me a'},
            {text: 'lot of time and presents the most '},
            {text: 'important information for me every day.'},
            {text: 'it\'s an incredibly useful app'},
          ]
        },
        {
          pic: '',
          name: 'Валерия',
          title: 'Indie maker',
          style: {
            top: "165px",
            left: "755px",
            width: "300px",
            height: "210px"
          },
          lines: [
            {text: 'Шанс внести ясность в иногда хаотичную '},
            {text: 'криптоэкосистему, чувство контроля и надежная '},
            {text: 'вторая пара глаз, смотрящих на мой риптопортфель.'},
            {text: 'к Потрясающая идея и своевременное'},
            {text: ' исполнение! Держу пальцы скрещенными'},
            {text: ' за умелую команду и светлое будущее впереди!'}
          ]
        },
        {
          pic: '',
          name: 'José Silva',
          title: 'Sales',
          style: {
            top: "422px", left: "330px",
            width: "300px",
            height: "193px"
          },
          lines: [
            {text: 'A ideia da Taurion de combinar IA e investimento em '},
            {text: 'criptomoedas é fantástica e incentiva as pessoas a '},
            {text: 'serem mais cuidadosas com seus investimentos. Ela é '},
            {text: 'útil por si só e o potencial de crescimento é óbvio. '},
            {text: 'Esperamos que a Taurion continue a crescer e se torne'},
            {text: 'a plataforma de investimento preferida das massas!'}
          ]
        },
      ]
    }
  },
  beforeDestroy() {
    if (this.$refs.homeWrapper) {
      this.$refs.homeWrapper.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      const computeStyle = (initY) => {
        const rowscrollY = this.$refs.homeWrapper.scrollTop;
        const scrollY = Math.max(0, rowscrollY - initY);
        const bannerLeftY = Math.max(0, 200 - scrollY * 0.5);
        const bannerLeftOpacity = Math.min(1, scrollY * 0.003);
        const bannerCenterScale = Math.min(1, 0.1 + scrollY * 0.003);
        const bannerRightX = Math.max(0, 200 - scrollY * 0.5);
        return transferStyle({bannerLeftY, bannerLeftOpacity, bannerCenterScale, bannerRightX})
      }
      this.slideStyle1 = computeStyle(200)
      this.slideStyle2 = computeStyle(900)
      this.slideStyle3 = computeStyle(1800)
    },
  },
  mounted() {
    this.$refs.homeWrapper.addEventListener('scroll', this.handleScroll);
    const query = this.$route.query
    if (query.code) {
      const redirect_uri = `${window.location.origin}`;
      this.$store.dispatch('user/googleLogin', {code: query.code, url: redirect_uri})
    }

    if (query.oauth_token) {
      this.$store.dispatch('user/twitterLogin', this.$route.query)
    }


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.banner4Visible1 = true;
          }, 100)
          setTimeout(() => {
            this.banner4Visible2 = true;
          }, 1200)
          setTimeout(() => {
            this.banner4Visible3 = true;
          }, 2200)
          setTimeout(() => {
            this.banner4Visible4 = true;
          }, 3200)
        }
      });
    }, {threshold: 0.1});

    const element = this.$el.querySelector('.banner-4');
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

    .banner-left {
      padding: 181px 0 101px 64px;

      .desc-code {
        margin-top: 117px;
      }

      .title1 {
        width: 595px;
        font-family: aifont;
        text-transform: capitalize;
        color: #FFF;
        font-size: 78px;
        font-style: normal;
        font-weight: 400;
        line-height: 100px;
      }

      .title2 {
        color: rgba(206, 184, 100, 1);
        width: 595px;
        height: 100px;
        font-family: aifont;
        font-size: 80px;
        font-style: normal;
        line-height: 100px;
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


  .banner-slide {
    width: 1244px;
    height: 702.7px;
    margin-top: 123px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .banner-right {
      width: 310px;
    }

    .banner-center {
      width: 357px;
    }

    .banner-left {
      padding: 104px 0 101px 124px;
      position: relative;
      width: 520px;

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
        width: 500px;
        height: 132px;
        opacity: 0.5;
        color: rgba(255, 255, 255, 0.5);
        font-size: 24px;
        margin-top: 47px;
      }
    }

    &.banner-slide-3 {
      .title2 {
        font-size: 38px;
      }

      .banner-center {
        width: 390px;
      }

      .banner-right {
        width: 280px;
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
      font-size: 33px;
      text-transform: capitalize;
    }
  }

  .banner-5 {
    display: flex;
    flex-wrap: wrap;
    width: 1198.3px;
    margin-top: 123px;
    align-items: center;
    justify-content: center;
    .title1 {
      width: 1198px;
      height: 86px;
      text-align: center;
      margin-bottom: 60px;
      font-family: aifont;
      font-style: normal;
      font-weight: 400;
      font-size: 64px;
      line-height: 85px;
      text-transform: capitalize;
      color: #CEB864;
    }
  }
}
</style>

