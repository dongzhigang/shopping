var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    path:app.globalData.path,
    brand: {},
    goodsList: [],
    page: 1,
    rows: 10
  },
  /**
   * 事件
   */
  getBrand: function () {
    let _that = this;
    let url = api.BrandDetail;
    let data = {
      id:this.data.id
    }
    util.showLoading(function(){
      util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            brand: res.data.brand,
            goodsList: res.data.brandList
          });
          wx.hideLoading();
        }
      });
    })
  },
  /**
   * 生命周期
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
    });
    this.getBrand();
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})