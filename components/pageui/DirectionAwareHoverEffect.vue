<template>
  <div class="container">
    <div class="container">
      <ul>
        <li v-for="i in 6" :key="i" @mouseover="update($event, 'in', i)" @mouseout="update($event, 'out', i)">
          <div class="partner"><img src="~/assets/imgs/partner2.png" alt=""></div>
          <div class="info">
            <h3>Single-origin coffee whatever</h3>
            <p>Williamsburg tofu polaroid, 90's Bushwick irony locavore ethnic meh messenger bag Truffaut jean shorts.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectionAwareHoverEffect',
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
  border-radius: 4px;
  pointer-events: none;
  background-color: rgba(red(@turquoise), green(@turquoise), blue(@turquoise), 0.9);
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
  width: 320px;
  height: 320px;
  margin: 5px;
  padding: 0;
  list-style: none;
  overflow: hidden;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  a {
    display: inline-block;
    vertical-align: top;
    text-decoration: none;
    border-radius: 4px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: rgba(red(#fff), green(#fff), blue(#fff), 0.1);
  }

  p {
    font-size: 12px;
    line-height: 1.5;
    color: rgba(red(#fff), green(#fff), blue(#fff), 0.2);
  }

  .normal {
    width: 100%;
    height: 100%;
    background-color: @clouds;
    color: rgba(red(@wet-asphalt), green(@wet-asphalt), blue(@wet-asphalt), 0.4);
    box-shadow: inset 0 2px 20px darken(@clouds, 2);
    text-align: center;
    font-size: 50px;
    line-height: 320px;
  }
}


.container {
  width: 1198px;
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
