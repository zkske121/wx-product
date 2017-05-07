//app.js
var _ = require('./utils/lodash.core.min.js')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // this.getUserInfo();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    currencyCode: 'USD',
    currencyName: '美元'
  },
  //保存数据，保存至页面data，并同步到全局数据及缓存数据
  syncData:function(page) {
    var app = this;

    meExtend(page.data, getStore());
    meExtend(page.data, app.globalData);

    page.setData(page.data);

    return function(source) {
      page.setData(source);
      meExtend(app.globalData, source);
      setStore(source);
    }
  }
})

//获取缓存数据
function getStore() {
  return wx.getStorageSync('store') || {
    mobile: 18217764963
  };;
}

//保存缓存数据
function setStore(source) {
  wx.setStorageSync('store', meExtend(getStore(), source));
}

//目标没有的键值不需要拷贝
function meExtend(target, source) {
  for(var key in target) {
    if(key in target && source[key] !== void 0) {
      target[key] = source[key];
    }
  }

  return target;
}