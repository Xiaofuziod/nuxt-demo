<template>
  <div class="taurion-btn"
       :class="{'disable-btn': disable}"
       :style="{'cursor': cursor}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    cursor: {
      type: String,
      default: 'pointer'
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.taurion-btn {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  font-family: Gruppe F;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #192836;
  font-weight: 800;
  clip-path: polygon(var(--clipPath));
  --clipPath: 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px;
  --borderWidrh: 1;
  --color: rgba(206, 184, 100, 1);
  position: relative;
  background-color: var(--color);

  img {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
}

.disable-btn {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
