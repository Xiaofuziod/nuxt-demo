<template>
  <div class="dot-carousel"></div>
</template>
<style>

.dot-carousel {
  position: relative;
  display: inline-block;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #CEB864;
  color: #CEB864;
  box-shadow: 9984px 0 0 0 #CEB864, 9999px 0 0 0 #CEB864, 10014px 0 0 0 #CEB864;
  animation: dot-carousel 1.5s infinite linear;
}

@keyframes dot-carousel {
  0% {
    box-shadow: 9984px 0 0 -1px #CEB864, 9999px 0 0 1px #CEB864, 10014px 0 0 -1px #CEB864;
  }
  50% {
    box-shadow: 10014px 0 0 -1px #CEB864, 9984px 0 0 -1px #CEB864, 9999px 0 0 1px #CEB864;
  }
  100% {
    box-shadow: 9999px 0 0 1px #CEB864, 10014px 0 0 -1px #CEB864, 9984px 0 0 -1px #CEB864;
  }
}
</style>
