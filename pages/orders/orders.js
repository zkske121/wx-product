//orders.js
//获取应用实例
var app = getApp()
Page({
  data: {
    orders: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    this.syncData = app.syncData(this);
  }
})
