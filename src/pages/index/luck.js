class Luck {
  //构造器
  constructor(page, options) {
    this.page = page;
    this.canvasId = options.canvasId ;
    this.width = options.width;
    this.height = options.height;
    this.maskColor = options.maskColor;
    this.size = options.size;
    this.r = this.size * 2;
    this.area = this.r * this.r;
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
        x2: x1 + this.r,
        y2: y1 + this.r
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
        x2: x1 + this.r,
        y2: y1 + this.r
      })
    }
    if (this.clearPointsList.length && this.r * this.r * this.clearPointsList.length > this.scale * this.totalArea) {
      this.show = true;
    }
    this.ctx.clearRect(x1, y1, this.r, this.r);
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