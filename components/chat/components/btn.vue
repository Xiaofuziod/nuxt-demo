<template>
  <div class="taurion-btn"
       :class="`taurion-btn-${type}`"
       :style="{'cursor': cursor,opacity: disable? '0.4' : 1 }">
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
  padding: 0 13px 0 8px;
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
    width: 16px;
    height: 16px;
    margin-right: 2px;
  }
}

.taurion-btn-returns{
  --color: rgba(244, 70, 83, .2);
}

.disable-btn {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
