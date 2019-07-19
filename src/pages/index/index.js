
const Luck = require("./luck.js");
const uilt = require('../../utils/util.js');
Page({
  data: {
    width: 300,
    height: 200,
  },
  onLoad() {
    let options = {
      canvasId:'luck',
      width: this.data.width,//canvas宽
      height: this.data.height,//canvas高
      maskColor: '#dddddd',//遮罩的颜色
      size:20,//清除轨迹的宽度
      scale:0.75,//可以理解为手动清除面积上限，范围0~1
    }
    this.luck = new Luck(this, options);
  }
})