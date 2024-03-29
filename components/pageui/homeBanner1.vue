<template>
  <div class="image-stack">
    <div
        v-for="(item, index) in piclist"
        :key="index"
        :class="`image-container image-${index+1}`"
    >
      <img :src="item" alt="">
    </div>
  </div>
</template>
<script>
import image_1 from '@/assets/imgs/banners/image_1.svg'
import image_2 from '@/assets/imgs/banners/image_2.svg'
import image_3 from '@/assets/imgs/banners/image_3.svg'
import image_4 from '@/assets/imgs/banners/image_4.svg'
import image_5 from '@/assets/imgs/banners/image_5.svg'
import image_6 from '@/assets/imgs/banners/image_6.svg'
export default {
  name: 'home-banner-1',
  data() {
    return {
      piclist: [
        image_1,
        image_2,
        image_3,
        image_4,
        image_5,
        image_6
      ]
    }
  }
}
</script>

<style scoped lang="less">
@rotate1: -3deg;
@rotate2: 6deg;
@rotate3: 7deg;
@rotate4: -10deg;
@rotate5: -12deg;
@rotate6: 6deg;

@translateY-hover: -10px;

// Generate animation keyframes using a mixin
.generate-keyframes(@name, @rotateValue) {
  @keyframes @name {
    0%, 100% {
      transform: translateY(0) rotate(@rotateValue);
    }
    50% {
      transform: translateY(@translateY-hover) rotate(@rotateValue);
    }
  }
}

// Use the mixin to create keyframes for each card
.generate-keyframes(baloon-1, @rotate1);
.generate-keyframes(baloon-2, @rotate2);
.generate-keyframes(baloon-3, @rotate3);
.generate-keyframes(baloon-4, @rotate4);
.generate-keyframes(baloon-5, @rotate5);
.generate-keyframes(baloon-6, @rotate6);

.image-stack {
  position: absolute;
  top: 280px;
  right: 0;
  width: 300px;
  height: 150px; /* This should be the size of the container */
}

.image-container {
  position: absolute;
  img {
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
  }
}

.image-1 {
  width: 500px;
  top: -25px;
  left: -40px;
  animation: baloon-1 3s infinite alternate;
  transform: rotate(@rotate1);
  z-index: 6;
  img {
    border-radius: 24px;
  }
}
.image-2 {
  width: 350px;
  top: 110px;
  left: -140px;
  z-index: 5;
  animation: baloon-2 3.5s infinite alternate;
  transform: rotate(@rotate2);
  animation-delay: 1s;
  img {
    border-radius: 18px;
  }
}
.image-3 {
  width: 340px;
  top: -120px;
  left: -90px;
  z-index: 4;
  animation: baloon-3 3s infinite alternate;
  transform: rotate(@rotate3);
  animation-delay: 1.5s;
  img {
    border-radius: 18px;
  }
}


.image-4 {
  width: 340px;
  top: 210px;
  left: -10px;
  z-index: 3;
  animation: baloon-4 3s infinite alternate;
  animation-delay: 2s;
  transform: rotate(@rotate4);
  img {
    border-radius: 18px;
  }
}

.image-5 {
  width: 340px;
  top: -30px;
  left: -220px;
  z-index: 2;
  animation: baloon-5 3s infinite alternate;
  animation-delay: 2.5s;
  transform: rotate(@rotate5);
  img {
    border-radius: 18px;
  }
}
.image-6 {
  width: 330px;
  top: 96px;
  left: 182px;
  z-index: 2;
  animation: baloon-6 3s infinite alternate;
  animation-delay: 2.8s;
  transform: rotate(@rotate6);
  img {
    border-radius: 18px;
  }
}

/* Keyframes for the floating effect */
@keyframes baloon_1 {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Ensure that the image paths are correct */
.image-container img {
  width: 100%;
  height: auto;
}
</style>
