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
    this.ctx.save();
    this.ctx.setFillStyle(this.maskColor);
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();

    this.ctx.draw();
  }
  //清除操作
  eraser(e, bool) {
    let ctx = wx.createCanvasContext(e.currentTarget.dataset.id, this);
    const that = this.page[e.currentTarget.dataset.id]
    let len = that.clearPointsList.length;
    let count = 0
    let x = e.touches[0].x, y = e.touches[0].y;
    let x1 = x - that.size;
    let y1 = y - that.size;
    if (bool) {
      that.clearPointsList.push({
        x1: x1,
        y1: y1,
        x2: x1 + that.size,
        y2: y1 + that.size
      })
    }
    for (let val of that.clearPointsList) {
      if (val.x1 > x || val.y1 > y || val.x2 < x || val.y2 < y) {
        count++;
      } else {
        break;
      }
    }
    if (len === count) {
      that.clearPointsList.push({
        x1: x1,
        y1: y1,
        x2: x1 + that.size,
        y2: y1 + that.size
      })
    }
    if (len && that.size * that.size * len > that.scale * that.totalArea) {
      that.show = true;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(x + that.size, y + that.size, that.size, 0, 2 * Math.PI);
    ctx.clip();
    ctx.clearRect(x, y, 2 * that.size, 2 * that.size);
    ctx.restore();

    ctx.draw(true);
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
      let ctx = wx.createCanvasContext(e.currentTarget.dataset.id, this);
      if (this[e.currentTarget.dataset.id].show) {
        ctx.clearRect(0, 0, _this.width, _this.height);
        ctx.draw();
      }
    }
  }
}
module.exports = Luck;