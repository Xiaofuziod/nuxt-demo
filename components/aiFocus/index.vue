<template>
  <div class="focus-item">
    <div class="data-row">
      <div class="date">2/20</div>

      <div class="date1">
        Today
        <div class="date2">
          Mon
        </div>
      </div>
    </div>

    <div class="list">

      <div class="focus">
        <img src="@/static/images/chat/s2.svg" alt="">
        AI focus
      </div>

      <div class="list-item" v-for="item in 3">

        <div class="list-item-top">
          <div class="list-item-top1">2:00</div>
          <div class="list-item-top2"></div>
          <div class="list-item-top3">Ethereum</div>
        </div>

        <div class="list-item-content">
          <div class="list-item-title">If someone loves you,love them back unconditionally</div>
          <div class="list-item-icon">
            <img src="@/static/images/chat/ai2.svg" alt="">
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<style lang="less">

.focus-item {
  margin-top: 20px;
  box-sizing: border-box;

  .list {
    width: 305px;
    height: 293px;
    border-radius: 16px;
    background: rgba(38, 64, 64, 0.2);
    margin-top: 24px;
    position: relative;
    box-sizing: border-box;


    .list-item{
      box-sizing: border-box;
      padding: 26px 24px 0;

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
        }
        .list-item-top3 {
          height: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-family: Avenir-Roman;
          font-size: 10px;
          text-transform: capitalize;
        }
      }

      .list-item-content {
        display: flex;
        align-items: center;
        margin-top: 12px;
        .list-item-title {
          flex: 1;
          height: 36px;
          color: rgba(255, 255, 255, 1);
          font-family: Avenir;
          font-weight: 500;
          font-size: 13px;
          text-transform: capitalize;
        }
        .list-item-icon {
          width: 36px;
          height: 36px;
          border-radius: 70px;
          background: rgba(138, 173, 188, 0.1);
          backdrop-filter: blur(100px);
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 18px;
          }
        }
      }

    }

    .focus {

      width: 93px;
      height: 25px;
      color: rgba(25, 40, 54, 1);
      font-size: 12px;
      line-height: 120.000005%;
      background: rgba(206, 184, 100, 1);
      backdrop-filter: blur(108px);
      position: absolute;
      top: -12px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      text-transform: uppercase;
      overflow: hidden;

      &::after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background-color: black;
        position: absolute;
        top: -6px;
        left: -6px;
        transform: rotate(-45deg);
      }
      &::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background-color: black;
        position: absolute;
        right: -6px;
        bottom: -6px;
        transform: rotate(-45deg);
      }


      img {
        width: 16px;
        height: 16px;
        margin-left: 6px;
        margin-right: 2px;
      }
    }
  }


  .data-row {
    display: flex;
    align-items: flex-start;

    .date {
      height: 29px;
      color: rgba(206, 184, 100, 1);
      font-family: aifontF;
      font-size: 24px;
      text-transform: uppercase;
    }
    .date1{
      height: 14px;
      color: rgba(206, 184, 100, 1);
      font-family: Avenir;
      font-weight: 500;
      font-size: 10px;
      text-transform: uppercase;
      margin-top: 7px;
      margin-left: 7px;
    }

    .date2 {
      height: 11px;
      color: rgba(140, 180, 189, 0.6);
      font-family: Avenir-Roman;
      font-size: 8px;
      text-transform: uppercase;
    }
  }

}

</style>
