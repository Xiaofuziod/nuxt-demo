<template>
  <div class="wrapper">
    <template
        v-for="(line, index) in lines">
      <div
          v-if="index < activeIndex"
          class="typing-demo"
          :class="`${(index+1) < activeIndex ? 'finished' :''}`"
          :style="{
            fontSize,
            fontFamily,
            marginBottom,
            width
          }"
      >
        {{ line.text }}
      </div>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    lines: Array,
    fontSize: String,
    fontFamily: String,
    marginBottom: String,
    width: String,
  },
  data() {
    return {
      activeIndex: 1
    }
  },
  methods: {
    lineStyle(index) {
      const line = this.lines[index];
      const steps = line.text.length;
      return {
        // animation: `typing ${2 + index}s steps(${steps}), blink .5s step-end infinite alternate`,
      };
    },
  },
  mounted() {
    this.$emit('animation-started');
    setInterval(() => {
      this.activeIndex++
    }, 2000)
  },
};
</script>

<style scoped>
.wrapper {
  //height: 100%;
  /*This part is important for centering*/
  //display: grid;
  //place-items: center;
}

.typing-demo {
  width: 22ch;
  animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  font-family: aifontf;
  white-space: nowrap;
  overflow: hidden;
  color: #fff;
  border-right: 3px solid #fff;
  font-size: 1.5rem;
  margin-bottom: 10px;
  &.finished {
    border-right: none
  }
}

@keyframes typing {
  from {
    width: 0
  }
}

@keyframes blink {
  50% {
    border-color: transparent
  }
}



</style>
