<template>
  <div class="user-box"
       :style="{top, left}">
    <div class="userinfo">
      <img src="~/assets/imgs/user-girl-1.png" alt="">
      <span class="name">{{ $t("pages_index_name_1") }}</span>
      <span class="phone">{{ $t("pages_index_phone_1") }}</span>
    </div>
    <p class="desc">
      <typing-text
          font-size="13px"
          font-family="Avenir"
          margin-bottom="1px"
          width="32ch"
          :lines="[
                { text: 'If someone loves you, it is your fantasy,' },
                { text: 'love them back unconditionally' },
                { text: 'not only because they love you' },
                { text: 'but because is no way no way' }
          ]"
      />
    </p>
    <div class="line"></div>
    <pulse-pin class="local"/>
  </div>
</template>

<script>
import PulsePin from "@/components/pageui/PulsePin.vue";

export default {
  name: 'userPop',
  components: {PulsePin},
  props: {
    top: {
      type: String
    },
    left: {
      type: String
    }
  }
}
</script>

<style scoped lang="less">
.userinfo, .desc {
  animation: bounceIn 1s forwards;
}
.user-box {
  position: absolute;
  width: 281px;
  height: 153px;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(2, 111, 114, 0.3);
  backdrop-filter: blur(200px);
  padding: 17px 20px;
  animation: scaleIn 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
  .userinfo {
    display: flex;
    align-items: end;
    img {
      width: 40px;
      height: 40px;
    }

    .name {
      width: 64px;
      height: 27px;
      font-family: 'Avenir';
      font-style: normal;
      font-weight: 900;
      font-size: 20px;
      line-height: 27px;
      color: #E4E6FB;
      margin: 0 8px;
    }

    .phone {
      width: 69px;
      height: 20px;
      font-family: 'Avenir';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #E4E6FB;
      opacity: 0.5;
    }

  }

  .desc {
    width: 244px;
    height: 72px;
    font-family: 'Avenir';
    margin-top: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #E4E6FB;
    opacity: 0.5;
  }

  .line {
    position: absolute;
    top: 150px;
    left: 19px;
    width: 1px;
    height: 62px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .local {
    position: absolute;
    top: 200px;
    left: 24px;
  }
}
@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounceIn {
  0%, 20%, 50%, 80%, 100% {
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

</style>
