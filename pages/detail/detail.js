//index.js
//获取应用实例
var app = getApp();
var mock = require('../../mock/data.js');
var _ = require('../../utils/lodash.core.min.js')

Page({
  data: {
    currencyCode: ''
  },
  onShow: function () {
    this.syncData = app.syncData(this);
  }
})

