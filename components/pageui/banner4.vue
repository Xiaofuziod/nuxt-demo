<template>
  <div class="banner-4">
    <div class="title1">feedback</div>
    <div class="title2">from our Community</div>
    <user-pop v-if="banner4Visible1" :info="userPops[0]"/>
    <user-pop v-if="banner4Visible2" :info="userPops[1]"/>
    <user-pop v-if="banner4Visible3" :info="userPops[2]"/>
    <user-pop v-if="banner4Visible4" :info="userPops[3]"/>
  </div>
</template>
<script>
import HomeBanner1 from "@/components/pageui/homeBanner1.vue";
import UserPop from "@/components/pageui/userPop.vue";
import pop1 from "@/assets/imgs/userpop/1.svg"
import pop2 from "@/assets/imgs/userpop/2.svg"
import pop3 from "@/assets/imgs/userpop/3.svg"
import pop4 from "@/assets/imgs/userpop/4.svg"

export default {
  name: 'Banner4',
  components: {UserPop, HomeBanner1},
  mounted() {
    setTimeout(() => {
      this.banner4Visible1 = true;
    }, 100)
    setTimeout(() => {
      this.banner4Visible2 = true;
    }, 500)
    setTimeout(() => {
      this.banner4Visible3 = true;
    }, 700)
    setTimeout(() => {
      this.banner4Visible4 = true;
    }, 1000)
  },
  data() {
    return {
      banner4Visible1: false,
      banner4Visible2: false,
      banner4Visible3: false,
      banner4Visible4: false,
      userPops: [
        {
          pic: pop1,
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
          pic: pop2,
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
          pic: pop3,
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
          pic: pop4,
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
  }
}
</script>
<style lang="less">
.banner-4 {
  width: 1198.3px;
  height: 799.57px;
  margin: auto;
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

</style>
