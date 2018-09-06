var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  data: {
    path:app.globalData.path,
    brandList: [],
    page: 1,
    rows: 10,
  },
  /**
   * 事件
   */
  getBrandList: function () {
    let _that = this;
    let url = api.BrandList;
    let data = {
      page:this.data.page,
      rows:this.data.rows
    }
    util.showLoading(function(){
      util.request(url,data).then(function(res){
        if(res.code==0){
          wx.hideLoading();
          _that.setData({
            brandList:res.data
          })
        }
      })
    });
  },
  onReachBottom (){
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      return false;
    }

    this.getBrandList();
  },
  /**
   * 生命周期
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getBrandList();
  },
  onReady: function () {

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