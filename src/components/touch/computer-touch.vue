<template>
  <div class="computer-touch-wrapper">
    <div class="computer-value">
      <div class="computer-value-num">
        <i class="computer-tap del" @click="del"></i>
        <input type="number"
               class="computer-value-text"
               @input="emitFlag = true"
               @keydown="keydown($event, currentValueA)"
               v-model="currentValueA">{{this.unit || ''}}
        <i class="computer-tap add" @click="add"></i>
      </div>
      <div class="computer-value-line">
        <div class="half-circle-wrapper"><i></i></div>
        <i class="tick-line"></i>
      </div>
    </div>
    <div class="computer-touch">
      <div class="rules-touch" @touchmove="onTouchMove" @touchend="onTouchEnd">
        <ul class="rules" :style="isEmptyObject(leftStyle) ? {left: getLeft(0)} : leftStyle">
          <p class="last-value">{{this.max | fixed(2)}}</p>
          <li class="section" v-for="r, index in tickLength">
            <i v-for="i in smTickLength"
               :style="{'margin-right': mgRight + 'px'}">
            </i>
            <span class="rules-num">{{min + tickInterval * index | fixed(2)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import tool from '@/common/js/tool.js'
  export default {
    name: 'ComputerTouch',
    props: {

      // 最小值
      min: {
        type: Number,
        default() {
          return 0;
        }
      },

      // 最大值
      max: {
        type: Number,
        default() {
          return 100;
        }
      },

      // 当前值
      currentValue: {
        type: Number,
        default() {
          return 50;
        }
      },

      // 单位
      unit: {
        type: String,
        default() {
          return '';
        }
      },

      // 内边距，默认为30，按实际情况传，不然会对不齐
      padding: {
        type: Number,
        default() {
          return 30;
        }
      },

      // 多少个刻度
      tickLength: {
        type: Number,
        default() {
          return 50;
        }
      }
    },
    data() {
      return {
        leftStyle: {},
        keydown: tool.filterInput,
        currentValueA: 0,
        smTickLength: 10,
        mgRight: 12,
        startX: 0,
        offsetX: 0,
        emitFlag: false,
        isEmptyObject: $.isEmptyObject,

        // 移动灵敏度（越小越灵敏）
        touchInterval: 10
      }
    },
    computed: {
      tickInterval() {
        return (this.max - this.min) / this.tickLength;
      }
    },
    mounted() {
      this.currentValueA = this.currentValue;
    },
    watch: {
      currentValueA() {
        if (this.currentValueA[this.currentValueA.length - 1] !== '.') {
          this.currentValueA = Number(Number(this.currentValueA).toFixed(2));
        }
        this.changeValue();
      },
      offsetX() {

        if (this.offsetX > this.touchInterval) {
          this.emitFlag = true;
          this.currentValueA = Number(this.currentValueA) - this.tickInterval / this.smTickLength;
        }
        if (this.offsetX < -this.touchInterval) {
          this.emitFlag = true;
          this.currentValueA = Number(this.currentValueA) + this.tickInterval / this.smTickLength;
        }
      }
    },
    methods: {
      changeValue() {
        if (this.currentValueA < this.min) {
          this.currentValueA = this.min
        }
        if (this.currentValueA > this.max) {
          this.currentValueA = this.max
        }

        if (this.currentValueA >= this.min && this.currentValueA <= this.max && this.emitFlag) {
          this.$emit('changeValue')
        }

        this.onTouchEnd();
        this.initLeft();
      },
      initLeft() {
        this.leftStyle = {

          // 这里mgRight + 1是因为每个tick有1px的宽度
          left: this.getLeft(this.currentValueA)
        }
      },
      getLeft(value) {
        return (window.innerWidth - this.padding) / 2 - (value - this.min) / this.tickInterval * this.smTickLength * (this.mgRight + 1) + 'px'
      },
      del() {
        this.emitFlag = true;
        this.currentValueA = Number(this.currentValueA) - this.tickInterval / this.smTickLength;
      },
      add() {
        this.emitFlag = true;
        this.currentValueA = Number(this.currentValueA) + this.tickInterval / this.smTickLength;
      },
      onTouchMove(e) {
        if (this.startX) {
          this.offsetX += (e.changedTouches[0].pageX - this.startX);
        }
        this.startX = e.changedTouches[0].pageX;
      },
      onTouchEnd() {
        this.startX = 0;
        this.offsetX = 0;
      }
    }
  }
</script>

<style lang="less" scoped>
  .computer-touch-wrapper {
    width: 100%;
    position: relative;
    top: 50px;
    height: 100px;
    .computer-value {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -49px;
      .computer-value-num {
        width: 160px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        &:after {
          content: '';
          display: block;
          position: absolute;
          width: 104PX;
          height: 1PX;
          background: #e4e4e4;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleY(.5);
        }
        .computer-tap {
          display: block;
          width: 16PX;
          height: 16PX;
          &.add {
            background: url("../../images/icon_plus@2x.png");
            background-size: cover;
          }
          &.del {
            background: url("../../images/icon_minus@2x.png");
            background-size: cover;
          }
        }
        .computer-value-text {
          font-size: 32px;
          font-family: DIN;
          color: #3388ff;
          width: 90px;
          background: #fff;
          text-align: center;
        }
      }
      .computer-value-line {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        transform: translateX(.5px);
        top: 39px;
        .half-circle-wrapper {
          width: 10PX;
          height: 5PX;
          overflow: hidden;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          i {
            content: '';
            display: block;
            width: 10PX;
            height: 10PX;
            background: #3388ff;
            border-radius: 100%;
            transform: translateY(-5PX);
          }
        }
        .tick-line {
          display: block;
          width: 1PX;
          height: 60px;
          background: #3388ff;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .computer-touch {
      position: relative;
      .rules-touch {
        height: 50px;
        overflow: hidden;
        position: relative;
        .rules {
          display: flex;
          position: absolute;
          bottom: 0;
          .last-value {
            font-size: 13px;
            color: #333;
            position: absolute;
            bottom: 10px;
            right: 0;
            transform: translateX(50%);
          }
          .section {
            display: flex;
            align-items: flex-end;
            position: relative;
            .rules-num {
              font-size: 13px;
              color: #333;
              position: absolute;
              bottom: 10px;
              transform: translateX(-50%);
            }
            &:before {
              content: '';
              display: block;
              width: 100%;
              height: 1PX;
              background: #749EFF;
              position: absolute;
              bottom: 0;
              left: 0;
              transform: scaleY(.5);
            }
            &:last-child {
              &:after {
                content: '';
                display: block;
                width: 1PX;
                height: 7px;
                background: #749EFF;
              }
            }
            i {
              &:first-child {
                height: 7px;
              }
              display: block;
              width: 1PX;
              height: 4px;
              background: #749EFF;
            }
          }
        }
      }
    }
  }

</style>
