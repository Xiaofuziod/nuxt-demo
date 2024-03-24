<template>
  <button :class="{'loading': loading}" type="submit">
    <img class="img1" src="@/static/images/chat/send3.svg" alt="">
  </button>
</template>
<script>
export default {
  name: 'SendBtn',
  computed: {
    loading() {
      return this.$store.state.chat.messageStatus === 'loading' || this.$store.state.chat.messageStatus === 'concat'
    }
  },
}
</script>
<style scoped lang="less">
.img1 {
  width: 38px;
  height: 38px;
}

.loading .img1 {
  display: none;
}

.loading {
  border: 2px solid #5585ff;
}

@keyframes button-loading {

  0% {
  }

  20% {
    color: transparent;
    transform: scale(1, 1);
  }

  40% {
    border-color: #ACF0D8;
    background-color: transparent;
    transform: scale(1, 1);
  }

  60% {
    transform: scale(.7, 1.1);
    color: transparent;
    border-color:#ACF0D8;
    background-color:#ACF0D8;
  }

  80% {
    transform: scale(1, 1);
  }

  100% {

    background-color:#ACF0D8;
    border-color:#ACF0D8;
    color: transparent;
  }

}

@keyframes button-dot-intro {

  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
    transform: scale(1, 1);
  }

  100% {
    transform: scale(.75, .75);
  }

}

@keyframes button-dot-pulse {

  0% {
    opacity: 1;
    transform: scale(.75, .75);
  }

  15% {
    transform: scale(.85, .85);
  }

  45% {
    transform: scale(.75, .75);
  }

  55% {
    transform: scale(.95, .95);
  }

  85% {
    transform: scale(.75, .75);
  }

  100% {
    opacity: 1;
    transform: scale(.75, .75);
  }

}

@keyframes button-ready {

  0% {
  }

  10% {
    background-color:#ACF0D8;
    border-color:#ACF0D8;
  }

  70% {
    margin: 0;
    width: 7.25rem;
    background-color: #fff;
    transform: scale(1.1, 1.1);
  }

  100% {
    margin: 0;
    width: 7rem;
    border-color: #8cce1e;
    background-color: #fff;
  }

}

@keyframes button-dot-outro {

  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1, 1);
  }
}

@keyframes button-ready-label {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

}


button {

  position: relative;
  overflow: hidden;
  width: 42px;
  height: 42px;
  color:#CEB864;
  border:2px solid transparent;
  background-color: transparent;
  cursor: pointer;
  line-height: 2;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  text-transform: lowercase;
  outline: none;
  transition: transform .125s;

  &:active {
    transform: scale(.9, .9);
  }

  &:before,
  &:after {
    position: absolute;
    opacity: 0;

    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    margin-top: -1.125rem;
    margin-left: -1.125rem;
    width: 2.25rem;
    height: 2.25rem;

    content: '';
    z-index: 1;
  }

  &.loading {
    animation: button-loading .5s forwards;
  }

  &.loading:before {
    opacity: 1;
    animation: button-dot-intro .5s forwards;
  }

  &.loading:after {
    opacity: 0;
    animation: button-dot-pulse 1.5s infinite .5s;
  }

  &.ready {
    text-indent: 0;
    color: transparent;
    background-color: #8CB4BD;
    animation: button-ready .333s forwards;
  }


  &.ready:before {
    position: absolute;
    left: 0;
    right: 0;
    top: auto;
    margin: 0;
    width: auto;
    height: auto;
    border-radius: 0;
    background-color: transparent;
    color: #8cce1e;
    content: 'ready';
    opacity: 0;
    z-index: 2;
    animation: button-ready-label .5s forwards .275s;
  }

  &.ready:after {
    opacity: 1;
    animation: button-dot-outro .333s;
  }

}

</style>
