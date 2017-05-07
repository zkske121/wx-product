//index.js
//获取应用实例
var app = getApp();
var mock = require('../../mock/data.js');
var _ = require('../../utils/lodash.core.min.js')

Page({
  data: {
    currencyCode: '',
    currencyName: '',
    branchName: mock.branchName,
    mobile: null,
    currencyList: mock.currencyList.map(v => v.CurrencyCode + ' ' + v.CurrencyName),
    index: 0,
    products: mock.products.map(v => {
      return _.extend({
        count: 1
      }, v)
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  currencyCodeChange(e) {
    var [currencyCode, currencyName] = this.data.currencyList[e.detail.value].split(' ');
    this.syncData({
      index: e.detail.value,
      currencyCode: currencyCode,
      currencyName: currencyName
    })
  },
  productCountChange(e) {
    var {products} = this.data;
    var {index, value} = e.currentTarget.dataset;
    var item = products[index];

    if(!item.count && value == -1) return;
    if(item.count == item.MaxSellCount && value == 1) {
      wx.showToast({
        title: '已为最大购买数',
        duration: 500,
        icon: 'loading'
      })
      return;
    }

    item.count += parseInt(value);

    this.syncData({
      products: products
    });
  },
  inputChange(e) {
    this.syncData({
      [e.target.dataset.type]: e.detail.value
    });
  },
  onLoad: function () {
  },
  onShow: function() {
    this.syncData = app.syncData(this);
  }
})

