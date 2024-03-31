<template>
<!--  <p class="tooltip-container" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">-->
  <p class="tooltip-container">
    <!-- Trigger Text -->
    <span>{{ text }}</span>

    <span v-if="showTooltip" class="tooltip">
      {{ text }}
    </span>
  </p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Hover me'
    },
  },
  data() {
    return {
      showTooltip: true
    };
  }
};
</script>

<style lang="less">
.tooltip-container {
  position: relative;
}

.tooltip {
  position: absolute;
  background-color: black;
  color: white;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  z-index: 1;

  /* Position the tooltip text - change these values to suit your needs */
  bottom: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120px) to center the tooltip */
  width: 120px;
}

/* Optional: Adding some animations */
.tooltip {
  visibility: visible;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 12;
}

.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
