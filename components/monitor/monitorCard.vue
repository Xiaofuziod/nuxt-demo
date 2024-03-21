<template>
  <div class="card" :class="`${card.status === 1 ? 'disable' : ''}`" @click="cardClick()">
    <img class="card-img" :src="card?.logo || bianPic" alt="">
    <div class="card-header">
      <h3 class="title1">{{ card?.title }}</h3>
      <h3 class="title2">{{ card?.author }}</h3>
      <p class="timestamp">{{ card?.time }}</p>
    </div>
    <img class="remove-btn" src="@/assets/imgs/close.svg" @click.stop="deleteMonitor(card.id)" alt="">
  </div>
</template>
<script>
import bianPic from '@/assets/imgs/bian.png'

export default {
  name: "monitorCard",
  props: {
    showAction: {
      type: Boolean,
    },
    card: {
      type: Object,
    },
  },
  data() {
    return {
      bianPic,
      optionShow: false
    }
  },
  methods: {
    deleteMonitor(id) {
      this.$store.dispatch('monitor/deleteUserMonitor', id);
    },
    cardClick() {
      if (this.card.status === 1) {
        this.$toast.warning('The activity you are monitoring has not yet concluded.')
      } else if(this.card.status === 7) {
        this.$toast.warning('The activity you are monitoring has canceled.')
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>
<style scoped lang="less">
.card {
  padding: 16px 20px;
  width: 389px;
  height: 130px;
  border-radius: 16px;
  margin: 8px;
  background: rgba(38, 64, 64, 0.2);
  cursor: pointer;
  position: relative;
  display: inline-flex;
  .remove-btn {
    position: absolute;
    top: 13px;
    right: 13px;
    height: 13px;
    width: 13px;
    cursor: pointer;
  }

  //.option-box {
  //  position: absolute;
  //  top: 10px;
  //  right: 20px;
  //  .hover-point {
  //    // Styles for the hover-point like padding, font-size, etc.
  //    // Ensure it's large enough to be easily hovered over
  //    font-size: 24px;
  //    color: rgba(255, 255, 255, 0.76);
  //  }
  //
  //  .option-list {
  //    display: none; // Initially hide the option list
  //    position: absolute;
  //    left: 0;
  //    top: 20px;
  //    background-color: rgba(68, 215, 182, 0.2);
  //    border-radius: 4px; // Optional: for rounded corners
  //    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // Optional: for a slight shadow
  //    z-index: 100; // Ensure it's on top of other elements
  //    .option-item {
  //      padding: 8px 16px; // Example padding, adjust as needed
  //      cursor: pointer;
  //      color: #fff;
  //      &:hover {
  //        background-color: rgba(68, 215, 182, 0.5);
  //      }
  //    }
  //  }
  //
  //  &:hover .option-list {
  //    display: block; // Show on hover
  //  }
  //}


  .card-img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }

  .card-header {
    padding-left: 17px;
    width: 265px;

    .title1 {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
      line-height: 15px;
      height: 15px;
      width: 100%;
      // 超出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title2 {
      color: rgba(255, 255, 255, 1);
      font-size: 15px;
      line-height: 25px;
    }

    .timestamp {
      color: rgba(140, 180, 189, 1);
      font-size: 12px;
    }

    .other {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
    }
  }
}
</style>
