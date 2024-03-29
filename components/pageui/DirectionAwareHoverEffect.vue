<template>
  <div class="slide-container">
    <div class="container">
      <ul>
        <li v-for="(item, i) in list" :key="i" @mouseover="update($event, 'in', i)" @mouseout="update($event, 'out', i)">
          <div class="partner"><img :src="item.pic" alt=""></div>
          <div class="info">
            <p>{{item.text}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import b1 from '@/assets/imgs/bannerfooter/1.png'
import b2 from '@/assets/imgs/bannerfooter/2.png'
import b3 from '@/assets/imgs/bannerfooter/img10.png'
import b4 from '@/assets/imgs/bannerfooter/img16.png'
import b5 from '@/assets/imgs/bannerfooter/img18.png'
import b6 from '@/assets/imgs/bannerfooter/img20.png'
export default {
  name: 'DirectionAwareHoverEffect',
  data() {
    return {
      list: [
        { pic :b1, text: this.$t('partner1')},
        { pic :b2, text: this.$t('partner2')},
        { pic :b3, text: this.$t('partner3')},
        { pic :b4, text: this.$t('partner4')},
        { pic :b5, text: this.$t('partner5')},
        { pic :b6, text: this.$t('partner6')}
      ]
    }
  },
  methods: {
    update(event, prefix, index) {
      const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
      const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

      const getDirectionKey = (ev, node) => {
        const { width, height, top, left } = node.getBoundingClientRect();
        const l = ev.pageX - (left + window.pageXOffset);
        const t = ev.pageY - (top + window.pageYOffset);
        const x = (l - (width / 2) * (width > height ? (height / width) : 1));
        const y = (t - (height / 2) * (height > width ? (width / height) : 1));
        return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 3;
      }
      const li = event.currentTarget; // 当前的 li 元素
      const info = li.querySelector('.info'); // 寻找 .info 子元素
      li.classList.remove(...classNames); // 首先移除所有方向相关的类
      const direction = getDirectionKey(event, li);
      const className = `${prefix}-${directions[direction]}`; // 构建类名字符串
      li.classList.add(className);
    }
  }
}

</script>
<style lang="less" scoped>
@duration: 300ms;
@timing-fn: ease;
@turquoise: #094b42;
@wet-asphalt: #34495E;
@midnight-blue: #2C3E50;
@clouds: #ECF0F1;
.slide-container {
  padding-left: 65px;
}
/* the important bits */
li {
  perspective: 400px;
}

.info {
  // hide-initial-state
  transform: rotate3d(1, 0, 0, 90deg);

  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 32px;
  background: #8CB4BD;
  backdrop-filter: blur(103.42799377441406px);
  color: #081E36;

  font-family: Avenir;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: capitalize;
  padding: 64px 40px;
}

.in-top .info {
  transform-origin: 50% 0%;
  animation: in-top 300ms @timing-fn 0ms 1 forwards;
}
.in-right .info {
  transform-origin: 100% 0%;
  animation: in-right @duration @timing-fn 0ms 1 forwards;
}
.in-bottom .info {
  transform-origin: 50% 100%;
  animation: in-bottom @duration @timing-fn 0ms 1 forwards;
}
.in-left .info {
  transform-origin: 0% 0%;
  animation: in-left @duration @timing-fn 0ms 1 forwards;
}

.out-top .info {
  transform-origin: 50% 0%;
  animation: out-top @duration @timing-fn 0ms 1 forwards;
}
.out-right .info {
  transform-origin: 100% 50%;
  animation: out-right @duration @timing-fn 0ms 1 forwards;
}
.out-bottom .info {
  transform-origin: 50% 100%;
  animation: out-bottom @duration @timing-fn 0ms 1 forwards;
}
.out-left .info {
  transform-origin: 0% 0%;
  animation: out-left @duration @timing-fn 0ms 1 forwards;
}

@keyframes in-top {
  from {transform: rotate3d(-1, 0, 0, 90deg)}
  to   {transform: rotate3d(0, 0, 0, 0deg)}
}
@keyframes in-right {
  from {transform: rotate3d(0, -1, 0, 90deg)}
  to   {transform: rotate3d(0, 0, 0, 0deg)}
}
@keyframes in-bottom {
  from {transform: rotate3d(1, 0, 0, 90deg)}
  to   {transform: rotate3d(0, 0, 0, 0deg)}
}
@keyframes in-left {
  from {transform: rotate3d(0, 1, 0, 90deg)}
  to   {transform: rotate3d(0, 0, 0, 0deg)}
}

@keyframes out-top {
  from {transform: rotate3d(0, 0, 0, 0deg)}
  to   {transform: rotate3d(-1, 0, 0, 124deg)}
}
@keyframes out-right {
  from {transform: rotate3d(0, 0, 0, 0deg)}
  to   {transform: rotate3d(0, -1, 0, 124deg)}
}
@keyframes out-bottom {
  from {transform: rotate3d(0, 0, 0, 0deg)}
  to   {transform: rotate3d(1, 0, 0, 124deg)}
}
@keyframes out-left {
  from {transform: rotate3d(0, 0, 0, 0deg)}
  to   {transform: rotate3d(0, 1, 0, 124deg)}
}

/* you can ignore this ones */
ul {
  padding: 0;
  margin: 0 0 50px;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

li {
  position: relative;
  float: left;
  width: 345px;
  height: 345px;
  margin: 5px;
  padding: 0;
  list-style: none;
  overflow: hidden;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .partner {
    width: 345px;
    height: 345px;
    border-radius: 32px;
    background: rgba(153, 188, 138, 0.10);
    backdrop-filter: blur(103.42799377441406px);
    overflow: hidden;
    position: relative;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
    }
  }
  a {
    display: inline-block;
    vertical-align: top;
    text-decoration: none;
    border-radius: 4px;
  }

  .normal {
    width: 100%;
    height: 100%;
    background-color: @clouds;
    color: rgba(red(@wet-asphalt), green(@wet-asphalt), blue(@wet-asphalt), 0.4);
    box-shadow: inset 0 2px 20px darken(@clouds, 2);
    text-align: center;
    font-size: 50px;
    line-height: 345px;
  }
}


.container {
  margin: 0 auto;
}

header {
  text-align: center;
  margin: 50px 0 25px;
  color: @wet-asphalt;

  p {
    margin: 0;
    color: rgba(red(@wet-asphalt), green(@wet-asphalt), blue(@wet-asphalt), 0.6);
  }
}

</style>
