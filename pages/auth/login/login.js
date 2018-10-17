var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

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

  },
  //微信登录
  wxLogin: function (e) {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        console.log("获取登录用户的所有信息")
        console.log(res.userInfo)
      }
    })
    // if (e.detail.userInfo == undefined) {
    //   app.globalData.hasLogin = false;
    //   util.showErrorToast('微信登录失败');
    //   return;
    // }
    // user.checkLogin().catch(() => {
    //   user.loginByWeixin(e.detail.userInfo).then(res => {
    //     app.globalData.hasLogin = true;

    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   }).catch((err) => {
    //     app.globalData.hasLogin = false;
    //     util.showErrorToast('微信登录失败');
    //   });

    // });
  },
  //账号登录
  accountLogin: function () {
    wx.navigateTo({ url: "/pages/auth/accountLogin/accountLogin" });
  }
})