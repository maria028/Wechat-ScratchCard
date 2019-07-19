const Luck = require("./luck.js");
const uilt = require('../../utils/util.js');
Page({
  data: {
    width: 200,
    height: 150,
  },
  onLoad() {
    const that = this
    let options = {
      canvasId: 'luck',
      width: that.data.width, //canvas宽
      height: that.data.height, //canvas高
      maskColor: '#dddddd', //遮罩的颜色
      size: 20, //清除轨迹的宽度
      scale: 0.75, //可以理解为手动清除面积上限，范围0~1
    }
    let options1 = {
      canvasId: 'luck1',
      width: that.data.width, //canvas宽
      height: that.data.height, //canvas高
      maskColor: '#dddddd', //遮罩的颜色
      size: 20, //清除轨迹的宽度
      scale: 0.75, //可以理解为手动清除面积上限，范围0~1
    }
    that.luck = new Luck(that, options);
    that.luck1 = new Luck(that, options1);


  }
})