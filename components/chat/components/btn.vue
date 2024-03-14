<template>
  <div class="focus" :class="{'focus2':type === '2'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
  }
}
</script>
<style lang="less" scoped>
.focus {
  width: 100%;
  height: 100%;
  color: rgba(25, 40, 54, 1);
  font-size: 12px;
  background: rgba(206, 184, 100, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-transform: uppercase;
  overflow: hidden;
  font-family: Gruppe F;

  &::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: #111a21;
    position: absolute;
    top: -6px;
    left: -6px;
    transform: rotate(-45deg);
    z-index: 10;
  }

  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: #111a21;
    position: absolute;
    right: -6px;
    bottom: -6px;
    z-index: 10;
    transform: rotate(-45deg);
  }


  img {
    width: 16px;
    height: 16px;
    margin-left: 6px;
    margin-right: 2px;
  }
}

.focus2 {
  color: rgba(140, 180, 189, 1);
  border: 1px solid rgba(140, 180, 189, 1);
  background-color: transparent;
}
</style>
