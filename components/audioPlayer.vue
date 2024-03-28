<template>
  <div class="audio-player">
    <audio ref="player"
           @timeupdate="updateProgress"
           @loadedmetadata="metadataLoaded"
           @waiting="showLoading"
           @playing="hideLoading"
           @seeking="showLoading"
           @seeked="hideLoading"
    >
      <source :src="audioSrc" type="audio/mpeg"/>
      Your browser does not support the audio element.
    </audio>
    <div class="controls">
      <img class="play-btn" src="@/assets/imgs/audioplayer/pause.svg" @click="togglePlay" v-if="isPlaying && !isLoading" alt="">
      <img class="play-btn" src="@/assets/imgs/audioplayer/play.svg" @click="togglePlay" v-if="!isPlaying && !isLoading" alt="">
      <img class="play-btn" src="@/assets/imgs/ZKZg.gif" v-if="isLoading" alt="">
      <input class="range-slider" type="range" min="0" :max="duration" step="0.1" :value="currentTime" :disabled="isLoading"
             :style="{ '--progress-percentage': ((currentTime / duration) * 100) + '%' }"
             @input="seekAudio"/>
      <div class="time">{{ currentTimeFormatted }} / {{ durationFormatted }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "audioPlayer",
  props: {
    audioSrc: {
      type: String
    }
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isLoading: false, // 新增加载状态
    };
  },
  computed: {
    loading() {
      return loading
    },
    currentTimeFormatted() {
      return this.formatTime(this.currentTime);
    },
    durationFormatted() {
      return this.formatTime(this.duration);
    }
  },
  mounted() {
    this.$refs.player.addEventListener('loadeddata', () => {
      this.updateDuration();
      this.updateProgress();
    });
  },
  methods: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
    metadataLoaded() {
      this.duration = this.$refs.player.duration;
      this.updateProgress();
    },
    togglePlay() {
      const audio = this.$refs.player;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
    updateProgress() {
      this.currentTime = this.$refs.player.currentTime;
    },
    updateDuration() {
      this.duration = this.$refs.player.duration;
    },
    seekAudio(event) {
      if (this.isLoading) return
      const audio = this.$refs.player;
      audio.currentTime = event.target.value;
      if (this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time - minutes * 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }
};
</script>

<style scoped lang="less">
@thumb-height: 0px;
@thumb-width: @thumb-height;
@track-height: 10px;
@played-color: rgba(140, 180, 189, 1);;
@unplayed-color: rgba(140, 180, 189, 0.2);
@backgroup-color: rgba(140, 180, 189, 0.30);

.audio-player {
  padding: 14px 16px 14px 24px;
  gap: 10px;
  width: 100%;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.20);
}
.controls {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .play-btn {
    width: 24px;
    height: 24px;
    margin-right: 9px;
    cursor: pointer;
  }
  .time {
    margin-left: 9px;
    color: @played-color;
    font-family: Avenir;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }
  .range-slider {
      -webkit-appearance: none;
      flex:1;
       position: relative;
      background: transparent;
      &:focus {
        outline: none;
      }
      //&:after {
      //  content: "";
      //  width: 100%;
      //  position: absolute;
      //  left: 0;
      //  background: @backgroup-color;
      //  height: 2px;
      //  bottom: 0px;
      //  pointer-events: none;
      //}

    // Track styles
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: @track-height;
        cursor: pointer;
        animate: 0.2s;
        background: linear-gradient(to right, @played-color 0%, @played-color var(--progress-percentage), @unplayed-color var(--progress-percentage), @unplayed-color 100%) no-repeat;
        background-size: 100% 50%;
        background-position: bottom;
      }

      &::-moz-range-track {
        width: 100%;
        height: @track-height;
        cursor: pointer;
        animate: 0.2s;
        background: linear-gradient(to right, @played-color 0%, @played-color var(--progress-percentage), @unplayed-color var(--progress-percentage), @unplayed-color 100%);
        background-size: 100% 50%;
        background-position: bottom;
      }

      &::-ms-track {
        width: 100%;
        height: @track-height;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        border-width: @thumb-width 0;
        color: transparent;
      }

    // Thumb styles
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        margin-top: -((@thumb-height - @track-height) / 2);
        height: @thumb-height;
        width: @thumb-width;
        border-radius: 50%;
        background: @played-color;
        cursor: pointer;
      }

      &::-moz-range-thumb {
        height: @thumb-height;
        width: @thumb-width;
        border: none;
        border-radius: 50%;
        background: @played-color;
        cursor: pointer;
      }

      &::-ms-thumb {
        height: @thumb-height;
        width: @thumb-width;
        border-radius: 50%;
        background: @played-color;
        cursor: pointer;
      }

    // IE specific styles
      &::-ms-fill-lower {
        background: @played-color;
        border-radius: @track-height / 2;
      }

      &::-ms-fill-upper {
        background: @unplayed-color;
        border-radius: @track-height / 2;
      }
  }
}


</style>
