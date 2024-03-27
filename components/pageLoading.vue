<template>
  <div class="loading-overlay" v-show="show">
    <div class="loading">
      <div id="logo">
        <div class="symbol">
          <div>
            <img src="@/assets/imgs/login/l0.svg" alt="">
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="symbol">
          <div style="background: #8AC3B0">
            <img src="@/assets/imgs/login/l1.svg" alt="">
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="symbol">
          <div><img src="@/assets/imgs/login/l2.svg" alt=""></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="symbol">
          <div><img src="@/assets/imgs/login/l3.svg" alt=""></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="symbol">
          <div><img src="@/assets/imgs/login/l4.svg" alt=""></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0);
  transition: all 0.3s;
}

.symbol {
  position: relative;
  float: left;
  width: 4em;
  height: 4em;
  transition: transform 2s linear;
  transform-style: preserve-3d;
  transform-origin: 2em 2em;
  transition: all 1.5s ease-in-out;
  //animation: fall 3s ease-in-out infinite;
}

.loading .symbol {
  top: 0;
  //animation: rotateX 3s ease-in-out infinite;
}

.symbol:nth-child(1) {
  z-index: 1;
  animation-delay: 400ms;
}

.symbol:nth-child(2) {
  z-index: 2;
  animation-delay: 500ms;
}

.symbol:nth-child(3) {
  z-index: 3;
  animation-delay: 600ms;
}

.symbol:nth-child(4) {
  z-index: 2;
  animation-delay: 700ms;
}

.symbol:nth-child(5) {
  z-index: 1;
  animation-delay: 800ms;
}

@keyframes rotateX {
  0% {
    transform: rotateX(0deg);
  }
  75% {
    transform: rotateX(360deg);
  }
  100% {
    transform: rotateX(360deg);
  }
}

@keyframes fall {
  0% {
    transform: rotateX(0deg) translateY(0em);
    opacity: 1;
  }
  75% {
    transform: rotateX(120deg) translateY(60em);
    opacity: 0;
  }
  100% {
    transform: rotateX(120deg) translateY(60em);
    opacity: 0;
  }
}

.symbol > div {
  position: absolute;
  width: 4em;
  height: 4em;
  transform-style: preserve-3d;
  background-color: white;
}

.symbol div:nth-child(1) {
  transform: translateZ(2em);
}

.symbol div:nth-child(2) {
  transform: rotateY(90deg) translateZ(2em);
  background-color: #A0A0A0;
}

.symbol div:nth-child(3) {
  transform: rotateY(180deg) translateZ(2em);
  background-color: #D0D0D0;
}

.symbol div:nth-child(4) {
  transform: rotateY(-90deg) translateZ(2em);
  background-color: #A0A0A0;
}

.symbol div:nth-child(5) {
  transform: rotateX(-90deg) translateZ(2em) rotate(180deg);
  background-color: #E0E0E0;
}

.symbol div:nth-child(6) {
  transform: rotateX(90deg) translateZ(2em);
  background-color: #C0C0C0;
}

.symbol > div:first-child {
  background-color: #101010;
  border: .25em solid #8AC3B0;
}
</style>
