<template>
  <div class="focus-item">
    <div class="data-row">
      <div class="date">{{ coinData.date }}</div>
      <div class="date1">
        {{ coinData.isToday ? 'Today' : "" }}
        <div class="date2">
          {{ coinData.weekDay }}
        </div>
      </div>
    </div>
    <div class="list">
      <div class="focus">
        <btn>
          <img src="@/static/images/chat/s2.svg" alt="">
          <span>{{ $t("AIFocus_span_1") }}</span>
        </btn>
      </div>
      <div class="list-item" v-for="(item,index) in coinData.list"
           :style="{'opacity': item.trigger === 1 ? 0.4 : 1}"
           :key="item.id + '-' + index">
        <div class="list-item-top">
          <div class="list-item-top1">{{ item.lastUpdatedDate?.split(' ')[1] }}</div>
          <div class="list-item-top2">
            <img v-if="item.coverPhotoUrl" :src="item.coverPhotoUrl" alt="">
          </div>
          <div class="list-item-top3">{{ item.symbol }}</div>
        </div>

        <div class="list-item-content">
          <div class="list-item-title">{{ item.title }}</div>
          <button class="button">
              <span class="default">
                <img src="@/static/images/chat/ai2.svg" alt="">
              </span>
            <span class="success"></span>
            <div class="left"></div>
            <div class="right"></div>
          </button>
<!--          -->
<!--          <div class="list-item-icon" @click="handleClick(item)">-->
<!--            <img src="@/static/images/chat/ai2.svg" alt="">-->
<!--            -->
<!--          </div>-->
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import btn from "@/components/chat/components/btn.vue";
import { gsap } from 'gsap';


export default {
  name: 'AIFocus',
  components: {
    btn
  },
  props: {
    coinData: {
      type: Object,
      default: () => {
        return {
          date: '00/00',
          isToday: true,
          weekDay: 'Monday',
          list: []
        }
      }
    }
  },
  computed: {},
  data() {
    return {}
  },
  mounted() {
    this.animate()
  },
  methods: {
    handleClick(item) {
      const para = {
        text: item.title,
        context: {
          hook: {
            type: "FOCUS",
            id: item.id
          }
        },
      }
      this.$store.dispatch('chat/sendUserMessage', para)


      item.trigger = 1
      this.$emit('read', item.id)

    },
    animate() {
      document.querySelectorAll('.button').forEach(button => {
        let getVar = variable => getComputedStyle(button).getPropertyValue(variable);

        button.addEventListener('click', e => {

          if (!button.classList.contains('active')) {
            button.classList.add('active');

            gsap.to(button, {
              keyframes: [{
                '--left-wing-first-x': 50,
                '--left-wing-first-y': 100,
                '--right-wing-second-x': 50,
                '--right-wing-second-y': 100,
                duration: .2,
                onComplete() {
                  gsap.set(button, {
                    '--left-wing-first-y': 0,
                    '--left-wing-second-x': 40,
                    '--left-wing-second-y': 100,
                    '--left-wing-third-x': 0,
                    '--left-wing-third-y': 100,
                    '--left-body-third-x': 40,
                    '--right-wing-first-x': 50,
                    '--right-wing-first-y': 0,
                    '--right-wing-second-x': 60,
                    '--right-wing-second-y': 100,
                    '--right-wing-third-x': 100,
                    '--right-wing-third-y': 100,
                    '--right-body-third-x': 60
                  })
                }
              }, {
                '--left-wing-third-x': 20,
                '--left-wing-third-y': 90,
                '--left-wing-second-y': 90,
                '--left-body-third-y': 90,
                '--right-wing-third-x': 80,
                '--right-wing-third-y': 90,
                '--right-body-third-y': 90,
                '--right-wing-second-y': 90,
                duration: .2
              }, {
                '--rotate': 50,
                '--left-wing-third-y': 95,
                '--left-wing-third-x': 27,
                '--right-body-third-x': 45,
                '--right-wing-second-x': 45,
                '--right-wing-third-x': 60,
                '--right-wing-third-y': 83,
                duration: .25
              }, {
                '--rotate': 55,
                '--plane-x': -8,
                '--plane-y': 24,
                duration: .2
              }, {
                '--rotate': 40,
                '--plane-x': 45,
                '--plane-y': -180,
                '--plane-opacity': 0,
                duration: .3,
                onComplete() {
                  setTimeout(() => {
                    button.removeAttribute('style');
                    gsap.fromTo(button, {
                      opacity: 0,
                      y: -8
                    }, {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: .3,
                      onComplete() {
                        button.classList.remove('active');
                      }
                    })
                  }, 2000)
                }
              }]
            })

            gsap.to(button, {
              keyframes: [{
                '--text-opacity': 0,
                '--border-radius': 0,
                '--left-wing-background': getVar('--primary-darkest'),
                '--right-wing-background': getVar('--primary-darkest'),
                duration: .1
              }, {
                '--left-wing-background': getVar('--primary'),
                '--right-wing-background': getVar('--primary'),
                duration: .1
              }, {
                '--left-body-background': getVar('--primary-dark'),
                '--right-body-background': getVar('--primary-darkest'),
                duration: .4
              }, {
                '--success-opacity': 1,
                '--success-scale': 1,
                duration: .25,
                delay: .25
              }]
            })

          }

        })

      });

    }
  }
}

</script>

<style lang="less" scoped>

.button {
  --primary: #CEB864;
  --primary-dark: #CEB864;
  --primary-darkest: #CEB864;
  --text: #FFFFFF;
  --text-opacity: 1;
  --success: #2B3044;
  --success-scale: .2;
  --success-opacity: 0;
  --border-radius: 7;
  --overflow: hidden;
  --rotate: 0;
  --plane-x: 0;
  --plane-y: 0;
  --plane-opacity: 1;
  --left-wing-background: var(--primary);
  --left-wing-first-x: 0;
  --left-wing-first-y: 0;
  --left-wing-second-x: 50;
  --left-wing-second-y: 0;
  --left-wing-third-x: 0;
  --left-wing-third-y: 100;
  --left-body-background: var(--primary);
  --left-body-first-x: 50;
  --left-body-first-y: 0;
  --left-body-second-x: 50;
  --left-body-second-y: 100;
  --left-body-third-x: 0;
  --left-body-third-y: 100;
  --right-wing-background: var(--primary);
  --right-wing-first-x: 50;
  --right-wing-first-y: 0;
  --right-wing-second-x: 100;
  --right-wing-second-y: 0;
  --right-wing-third-x: 100;
  --right-wing-third-y: 100;
  --right-body-background: var(--primary);
  --right-body-first-x: 50;
  --right-body-first-y: 0;
  --right-body-second-x: 50;
  --right-body-second-y: 100;
  --right-body-third-x: 100;
  --right-body-third-y: 100;
  display: block;
  cursor: pointer;
  position: relative;
  border: 0;
  padding-top: 5px;
  min-width: 57px;
  text-align: center;
  margin: 0;
  font-family: inherit;
  font-weight: 500;
  font-size: 14px;
  background: none;
  outline: none;
  color: var(--text);
  transform: rotate(calc(var(--rotate) * 1deg)) translateZ(0);
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;

  .left,
  .right {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: var(--plane-opacity);
    transform: translate(calc(var(--plane-x) * 1px), calc(var(--plane-y) * 1px)) translateZ(0);

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: calc(var(--border-radius) * 1px);
      transform: translate(var(--x, .4%), var(--y, 0)) translateZ(0);
      z-index: var(--z-index, 2);
      background: var(--background, var(--left-wing-background));
      clip-path: polygon(calc(var(--first-x, var(--left-wing-first-x)) * 1%) calc(var(--first-y, var(--left-wing-first-y)) * 1%), calc(var(--second-x, var(--left-wing-second-x)) * 1%) calc(var(--second-y, var(--left-wing-second-y)) * 1%), calc(var(--third-x, var(--left-wing-third-x)) * 1%) calc(var(--third-y, var(--left-wing-third-y)) * 1%));
    }
  }

  .left:after {
    --x: 0;
    --z-index: 1;
    --background: var(--left-body-background);
    --first-x: var(--left-body-first-x);
    --first-y: var(--left-body-first-y);
    --second-x: var(--left-body-second-x);
    --second-y: var(--left-body-second-y);
    --third-x: var(--left-body-third-x);
    --third-y: var(--left-body-third-y);
  }

  .right:before {
    --x: -.4%;
    --z-index: 2;
    --background: var(--right-wing-background);
    --first-x: var(--right-wing-first-x);
    --first-y: var(--right-wing-first-y);
    --second-x: var(--right-wing-second-x);
    --second-y: var(--right-wing-second-y);
    --third-x: var(--right-wing-third-x);
    --third-y: var(--right-wing-third-y);
  }

  .right:after {
    --x: 0;
    --z-index: 1;
    --background: var(--right-body-background);
    --first-x: var(--right-body-first-x);
    --first-y: var(--right-body-first-y);
    --second-x: var(--right-body-second-x);
    --second-y: var(--right-body-second-y);
    --third-x: var(--right-body-third-x);
    --third-y: var(--right-body-third-y);
  }

  span {
    display: block;
    position: relative;
    z-index: 4;
    opacity: var(--text-opacity);

    &.success {
      z-index: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 8px;
      transform: rotate(calc(var(--rotate) * -1deg)) scale(var(--success-scale)) translateZ(0);
      opacity: var(--success-opacity);
      color: var(--success);
    }
  }
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}


.focus-item {
  box-sizing: border-box;

  .list {
    width: 305px;
    border-radius: 16px;
    background: rgba(38, 64, 64, 0.2);
    margin-top: 24px;
    position: relative;
    box-sizing: border-box;
    padding: 19px 24px 10px 24px;


    .list-item {
      box-sizing: border-box;
      border-bottom: 1px solid rgba(140, 180, 189, 0.12);
      padding: 8px 0 10px;

      &:last-child {
        border-bottom: none;
      }

      .list-item-top {
        display: flex;

        .list-item-top1 {
          height: 14px;
          color: rgba(255, 255, 255, 0.4);
          font-family: Avenir-Roman;
          font-size: 10px;
          text-transform: capitalize;
        }

        .list-item-top2 {
          width: 14px;
          height: 14px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 1);
          margin-left: 12px;
          margin-right: 8px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
          }
        }

        .list-item-top3 {
          height: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-family: Avenir-Roman;
          font-size: 10px;
          //text-transform: capitalize;
        }
      }

      .list-item-content {
        display: flex;
        align-items: center;
        margin-top: 12px;

        .list-item-title {
          flex: 1;
          color: rgba(255, 255, 255, 1);
          font-family: Avenir;
          font-weight: 500;
          font-size: 13px;
          //text-transform: capitalize;
        }

        .list-item-icon {
          width: 57px;
          height: 28px;
          border-radius: 4px;
          background: #CEB864;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          img {
            width: 18px;
            margin-top: 5px;
          }
        }
      }

    }

    .focus {
      min-width: 93px;
      height: 25px;
      color: rgba(25, 40, 54, 1);
      font-size: 12px;
      position: absolute;
      top: -12px;
      left: 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;

      img {
        width: 16px;
        height: 16px;
        margin-left: 6px;
        transform: translateX(-4px);
      }
    }
  }


  .data-row {
    display: flex;
    align-items: flex-end;

    .date {
      //height: 29px;
      color: rgba(206, 184, 100, 1);
      font-family: aifontF;
      font-size: 24px;
    }

    .date1 {
      color: rgba(206, 184, 100, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 10px;
      margin-left: 7px;
      display: flex;
      flex-direction: column;
    }

    .date2 {
      height: 11px;
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir-Roman;
      font-size: 8px;
    }
  }

}

</style>
