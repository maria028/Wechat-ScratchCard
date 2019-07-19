
const Luck = require("./luck.js");
const uilt = require('../../utils/util.js');
Page({
  data: {
    width: '',
    height: ''
  },
  onLoad() {
    this.luck = new Luck(this);
  }
})