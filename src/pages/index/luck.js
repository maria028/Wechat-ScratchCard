class Luck {
  //构造器
  constructor(page, options) {
    this.page = page;
    this.canvasId = options.canvasId ;
    this.width = options.width;
    this.height = options.height;
    this.maskColor = options.maskColor;
    this.size = options.size;
    this.scale = options.scale;
    this.totalArea = this.width * this.height;
    this.init();
  }
  //初始化
  init() {
    this.show = false;
    this.clearPointsList = [];//清除的坐标点
    this.ctx = wx.createCanvasContext(this.canvasId, this);
    this.drawMask();
    this.bindTouch();
  }
  //创建遮罩
  drawMask() {
    this.ctx.setFillStyle(this.maskColor);
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.draw();
  }
  //清除操作
  eraser(e, bool) {
    let len = this.clearPointsList.length;
    let count = 0
    let x = e.touches[0].x, y = e.touches[0].y;
    let x1 = x - this.size;
    let y1 = y - this.size;
    if (bool) {
      this.clearPointsList.push({
        x1: x1,
        y1: y1,
        x2: x1 + this.size,
        y2: y1 + this.size
      })
    }
    for (let val of this.clearPointsList) {
      if (val.x1 > x || val.y1 > y || val.x2 < x || val.y2 < y) {
        count++;
      } else {
        break;
      }
    }
    if (len === count) {
      this.clearPointsList.push({
        x1: x1,
        y1: y1,
        x2: x1 + this.size,
        y2: y1 + this.size
      })
    }
    if (this.clearPointsList.length && this.size * this.size * this.clearPointsList.length > this.scale * this.totalArea) {
      this.show = true;
    }

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x + this.size, y + this.size, this.size, 0, 2 * Math.PI);
    this.ctx.clip();
    this.ctx.clearRect(x, y, 2 * this.size, 2 * this.size);
    this.ctx.restore();

    this.ctx.draw(true);
  }
  //操作手势
  bindTouch() {
    const _this = this;
    _this.page.onTouchStart = function (e) {
      _this.eraser(e, true);
    }
    _this.page.onTouchMove = function (e) {
      _this.eraser(e);
    }
    _this.page.onTouchEnd = function (e) {
      if (_this.show) {
        _this.ctx.clearRect(0, 0, _this.width, _this.height);
        _this.ctx.draw();
      }
    }
  }
}
module.exports = Luck;