var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    loginErrorCount: 0
  },
  /**
   * 事件函数
   */
  //登录
  accountLogin: function () {
    var that = this;
    if (!this.data.username) {
      util.showToast('用户名不能为空');
      return;
    }
    if (!this.data.password) {
      util.showToast('密码不能为空');
      return;
    }
    let url = api.AuthLoginByAccount;
    let data = {
      userName: that.data.username,
      password: that.data.password
    }
    util.request(url,data,'POST').then(function(res){
      if(res.code===0){
        //保存user_id
        wx.setStorageSync('userInfo', res.data)
        app.globalData.user_id = res.data.user_id; 
        app.globalData.hasLogin = true; 
        wx.navigateBack({
          delta: 2
        })
      }else{
        util.showToast(res.msg);
      }
    })
  },
  //获取账号值
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  //获取密码值
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  // bindCodeInput: function (e) {
  //   this.setData({
  //     code: e.detail.value
  //   });
  // },
  //账号密码为空
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
    }
  },



/**
 * 生命周期
 */
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
})