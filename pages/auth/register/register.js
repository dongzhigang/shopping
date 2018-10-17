var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    username:'',
    password:'',
    confirmPassword:'',
  },

  //获取验证码
  sendCode: function () {

  },
  //提交表单
  startRegister: function () {
    if (!this.data.username){
      util.showToast('用户名不能为空');
      return;
    }
    if (!this.data.password) {
      util.showToast('密码不能为空');
      return;
    }
    if (this.data.password != this.data.confirmPassword) {
      util.showToast('两次密码不一致');
      return;
    }

    let url = api.AuthRegister;
    let data = {
      'userName': this.data.username,
      'password': this.data.password
    }
    util.request(url,data,'POST').then(function(res){
      if (res.code === 0) {
        wx.redirectTo({
          url: '/pages/auth/accountLogin/accountLogin'
        })
      }
    })
  },
  //获取用户名
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  //获取密码
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  //确认密码获取
  bindConfirmPasswordInput: function (e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },
  //获取手机号码
  bindMobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  //获取验证码
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
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
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-mobile':
        this.setData({
          mobile: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  },

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