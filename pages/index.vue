<template>
  <div class="home-wrapper">
    <div class="container">
      <div class="banner-1">
        <div class="banner-left">
          <div class="title1">YOUR INVESTMENT</div>
          <div class="title2">Co-Pilot</div>
          <div class="banner-1-btn"></div>
          <img class="desc-img" src="~/assets/imgs/banner-1-desc.svg" alt="">
        </div>
        <img src="~/assets/imgs/home-banner-1.svg" alt="">
      </div>
      <div class="banner-2">
        <div class="banner-left">
          <div class="title1">AI REPORTING</div>
          <div class="title2">FUNCTION</div>
          <div class="desc">
            If someone loves you,love them back unconditionally, not only because they love you,but because in a way,
            they are teaching you to love and how
          </div>
          <img class="arc-line" src="~/assets/imgs/banner-arc-line.png" alt="">
        </div>
        <img src="~/assets/imgs/home-banner-2.svg" alt="">
      </div>
      <div class="banner-3">
        <img src="~/assets/imgs/home-banner-3.svg" alt="">
        <div class="banner-right">
          <div class="title1">AI MONITORING</div>
          <div class="title2">FUNCTION</div>
          <div class="desc">
            If someone loves you,love them back unconditionally, not only because they love you,but because in a way,
            they are teaching you to love and how
          </div>
          <img class="arc-line" src="~/assets/imgs/banner-arc-line.png" alt="">
        </div>
      </div>
      <div class="banner-4">
        <div class="title1">FEEDBACK</div>
        <div class="title2">FROM OUR USER</div>
        <div class="user-box position-1">
          <div class="userinfo">
            <img src="~/assets/imgs/user-girl-1.png" alt="">
            <span class="name">Wilson</span>
            <span class="phone">18,XXXXX</span>
          </div>
          <p class="desc">
            If someone loves you,love them back unconditionally, not only because they love you,but because in a way,
            they are teaching you to love and how
          </p>
          <div class="line"></div>
        </div>
        <div class="user-box position-2">
          <div class="userinfo">
            <img src="~/assets/imgs/user-girl-2.png" alt="">
            <span class="name">Wilson</span>
            <span class="phone">18,XXXXX</span>
          </div>
          <p class="desc">
            If someone loves you,love them back unconditionally, not only because they love you,but because in a way,
            they are teaching you to love and how
          </p>
          <div class="line"></div>
        </div>
        <div class="user-box position-3">
          <div class="userinfo">
            <img src="~/assets/imgs/user-boy-1.png" alt="">
            <span class="name">Wilson</span>
            <span class="phone">18,XXXXX</span>
          </div>
          <p class="desc">
            If someone loves you,love them back unconditionally, not only because they love you,but because in a way,
            they are teaching you to love and how
          </p>
          <div class="line"></div>
        </div>
        <div class="user-box position-4">
          <div class="userinfo">
            <img src="~/assets/imgs/user.svg" alt="">
            <span class="name">Wilson</span>
            <span class="phone">18,XXXXX</span>
          </div>
          <p class="desc">
            If someone loves you,love them back unconditionally, not only because they love you,but because in a way,
            they are teaching you to love and how
          </p>
          <div class="line"></div>
        </div>
      </div>
      <div class="banner-5">
        <div class="title1">OUR PARTNERS</div>
        <div class="partner" style="margin-left: 57px"><img src="~/assets/imgs/partner1.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner2.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner3.png" alt=""></div>
        <div class="partner" style="margin-left: 167px"><img src="~/assets/imgs/partner1.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner2.png" alt=""></div>
        <div class="partner"><img src="~/assets/imgs/partner3.png" alt=""></div>
      </div>
      <app-footer/>

    </div>
    <ball-bg2/>
<!--    <add-coin/>-->
<!--    <add-monitoring/>-->
  </div>
</template>
<script setup lang="ts">
import AddCoin from "~/components/report/addCoin.vue";
import AddMonitoring from "~/components/monitor/addMonitoring.vue";
</script>
<style lang="less" scoped>
.home-wrapper {
  position: relative;
  overflow:scroll;
  width: 100%;
  z-index: 0;
  padding-top: 16px;
  text-align: center;
  .container {
    z-index: 1;
    text-align: left;
    display: inline-block;
  }

  .banner-1 {
    width: 1244px;
    height: 702.7px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .banner-left {
      padding: 181px 0 101px 64px;

      .title1 {
        width: 595px;
        height: 100px;
        color: rgba(255, 255, 255, 1);
        font-family: aifont;
        font-size: 61.1px;
        line-height: 120px;
        text-transform: capitalize;
      }

      .title2 {
        color: rgba(206, 184, 100, 1);
        font-size: 118px;
        width: 595px;
        height: 100px;
        font-family: aifont;
        line-height: 120px;
        text-transform: capitalize;
      }

      .banner-1-btn {
        width: 298px;
        height: 71px;
        border-radius: 51px;
        background: rgba(217, 217, 217, 1);
        margin: 20px 0;
      }

      .desc-img {
        height: 96px;
      }
    }

    &:after {
      background: rgba(11, 14, 12, 0.3);
      backdrop-filter: blur(100px);
      content: '';
      position: absolute;
      width: 1427px;
      height: 1468px;
      transform: rotate(45deg);
      left: 5px;
      top: -375px;
      z-index: -1;
    }
  }


  .banner-2 {
    width: 1244px;
    height: 702.7px;
    margin-top: 123px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .arc-line {
      position: absolute;
      top: 100px;
      right: 50px;
    }

    .banner-left {
      padding: 104px 0 101px 124px;
      position: relative;

      .arc-line {
        position: absolute;
        top: 221px;
        right: 45px;
        width: 171px;
      }

      .title1 {
        width: 595px;
        height: 85px;
        color: rgba(206, 184, 100, 1);
        font-family: aifont;
        font-size: 72px;
        line-height: 120px;
        text-transform: capitalize;
      }

      .title2 {
        color: rgba(217, 217, 217, 1);
        font-size: 56px;
        width: 595px;
        height: 94px;
        font-family: aifont;
        line-height: 120px;
        text-transform: capitalize;
      }

      .desc {
        top: 1252px;
        left: 160px;
        width: 523px;
        height: 132px;
        opacity: 0.5;
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        margin-top: 47px;
      }
    }
  }

  .banner-3 {
    width: 1244px;
    height: 702.7px;
    margin-top: 123px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding-left: 124px;

    .arc-line {
      position: absolute;
      top: 100px;
      right: 50px;
    }

    .banner-right {
      padding: 104px 0px 101px 0px;
      position: relative;

      .arc-line {
        position: absolute;
        top: 221px;
        right: 45px;
        width: 171px;
      }

      .title1 {
        width: 595px;
        height: 85px;
        color: rgba(206, 184, 100, 1);
        font-family: aifont;
        font-size: 72px;
        line-height: 120px;
        text-transform: capitalize;
      }

      .title2 {
        color: rgba(217, 217, 217, 1);
        font-size: 56px;
        width: 595px;
        height: 94px;
        font-family: aifont;
        line-height: 120px;
        text-transform: capitalize;
      }

      .desc {
        top: 1252px;
        left: 160px;
        width: 523px;
        height: 132px;
        opacity: 0.5;
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        margin-top: 47px;
      }
    }
  }

  .banner-4 {
    width: 1198.3px;
    height: 799.57px;
    background: url(~/assets/imgs/map.png) no-repeat no-repeat;
    background-size: 100%;
    background-position: bottom;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin-top: 123px;
    .title1 {
      width: 372px;
      height: 68px;
      color: rgba(206, 184, 100, 1);
      font-family: aifont;
      font-size: 72px;
      text-transform: capitalize;
    }

    .title2 {
      width: 376px;
      height: 42px;
      color: rgba(255, 255, 255, 1);
      font-family: aifont;
      font-size: 44px;
      text-transform: capitalize;
    }

    .user-box {
      position: absolute;
      width: 281px;
      height: 153px;
      border-radius: 20px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      background: rgba(2, 111, 114, 0.3);
      backdrop-filter: blur(200px);
      padding: 17px 20px;

      &.position-1 {
        top: 155px;
        left: 15px;
      }
      &.position-2 {
        top: 472px;
        left: 330px;
      }
      &.position-3 {
        top: 488px;
        left: 962px;
      }
      &.position-4 {
        top: 212px;
        left: 755px;
      }
      .userinfo {
        display: flex;
        align-items: end;

        img {
          width: 40px;
          height: 40px;
        }

        .name {
          width: 64px;
          height: 27px;
          font-family: 'Avenir';
          font-style: normal;
          font-weight: 900;
          font-size: 20px;
          line-height: 27px;
          color: #E4E6FB;
          margin: 0 8px;
        }

        .phone {
          width: 69px;
          height: 20px;
          font-family: 'Avenir';
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
          color: #E4E6FB;
          opacity: 0.5;
        }

      }

      .desc {
        width: 244px;
        height: 72px;
        font-family: 'Avenir';
        margin-top: 8px;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #E4E6FB;
        opacity: 0.5;
      }

      .line {
        position: absolute;
        top: 150px;
        left: 19px;
        width: 1px;
        height: 62px;
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: -5px;
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        &:after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: -3px;
          width: 6px;
          height: 6px;
          background: rgba(56, 110, 113, 1);
          border-radius: 6px;
        }
      }
    }
  }

  .banner-5 {
    display: flex;
    flex-wrap: wrap;
    width: 1198.3px;
    margin-top: 123px;
    .title1 {
      width: 1198px;
      height: 86px;
      margin-bottom: 60px;
      font-family: aifont;
      font-style: normal;
      font-weight: 400;
      font-size: 90px;
      line-height: 85px;
      text-transform: capitalize;
      color: #CEB864;
    }
    .partner {
      width: 322.8px;
      height: 322.8px;

      margin: 10px;
      overflow: hidden;
      position: relative;
      z-index: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 300px;
      }
      &:after {
        background: rgba(153, 188, 138, 0.1);
        content: '';
        position: absolute;
        width: 375px;
        height: 683px;
        transform: rotate(45deg);
        left: -67px;
        top: -135px;
        z-index: -1;
      }
    }
  }
}
</style>

