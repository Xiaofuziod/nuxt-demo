<template>
  <div class="taurion-btn"
       :style="{ '--active-color': activeColor }"
       @click="$emit('click')">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'TaurionBtn',
  props: {
    activeColor: {
      type: String,
      default: 'rgba(140, 180, 189, 1)', // 这里是默认的颜色值
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {},
};
</script>

<style scoped lang="less">
.taurion-btn {
  display: flex;
  min-width: 93px;
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  font-family: aifontf;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  --active-color: rgba(140, 180, 189, 1);
  background: linear-gradient(135deg, transparent 6%, var(--active-color) 6%, var(--active-color) 94%, transparent 94%, transparent 100%)
}
</style>
