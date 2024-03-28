<template>
  <div class="video-container" :style="{opacity: videoEnded ? 0 : 1}">
    <video ref="videoPlayer" @ended="endend" autoplay muted
           src="https://pub-722766a33ba84f52a544b00c7e383773.r2.dev/test2.mp4"></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoEnded: false, // 视频是否播放结束
    };
  },
  mounted() {
    // 确保视频全屏
    this.makeVideoFullScreen();
    // 监听窗口大小变化，保持视频全屏
    window.addEventListener('resize', this.makeVideoFullScreen);
  },
  beforeDestroy() {
    // 组件销毁时移除监听器
    window.removeEventListener('resize', this.makeVideoFullScreen);
  },
  methods: {
    endend() {
      this.videoEnded = true;
      this.$emit('video-ended');
    },
    makeVideoFullScreen() {
      const video = this.$refs.videoPlayer;
      if (video) {
        // 设置视频宽高为视口宽高
        video.style.width = `${window.innerWidth}px`;
        video.style.height = `${window.innerHeight}px`;
      }
    },
  },
};
</script>

<style>
.video-container {
  position: fixed; /* 或absolute，取决于需求 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black; /* 视频加载时的背景色 */
  z-index: 10; /* 确保视频层位于最上面 */
  transition: opacity 1s; /* 过渡效果 */
}

video {
  object-fit: cover; /* 确保视频覆盖整个容器 */
}
</style>
