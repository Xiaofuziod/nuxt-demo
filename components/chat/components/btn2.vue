<template>
  <div class="taurion-btn">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.taurion-btn {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 13px 0 13px;
  font-family: Gruppe F;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #8CB4BD;
  font-weight: 800;
  border: 2px solid #8CB4BD;;
  position: relative;
  clip-path: polygon(var(--clipPath));
  --clipPath: 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px;
}

.taurion-btn:after {
  content: ' ';
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #8CB4BD;
  transform: rotate(-45deg) translate(0px, -11px);
  //background: rgba(38, 64, 64, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.taurion-btn:before {
  content: ' ';
  display: block;
  width: 10px;
  height: 10px;
  border-top: 2px solid #8CB4BD;
  transform: rotate(-45deg) translate(0px, 11px);
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
}
</style>
