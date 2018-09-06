var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./utils/user.js');

App({
  onLaunch: function () {
    let _this = this;
    //获取设备信息
    wx.getSystemInfo({
      success: res => {
        _this.globalData.Width = res.windowWidth;           //设备宽度
        _this.globalData.Height = res.windowHeight;         //设备高度
      }
    });
  },
  onShow: function (options) {
    
  },
  globalData:{
    path: api.WxApiRoot
  }

})