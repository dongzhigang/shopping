var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    addressList: [],                          //地址列表
    user_id:'',                               //用户id
  },
  /**
   * 事件函数
   */
  getAddressList() {
    let that = this;
    let url = api.AddressList;
    let data = {
      'user_id': this.data.user_id
    };
    util.request(api.AddressList,data,'POST').then(function (res) {
      if (res.code === 0) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },
  //添加
  addressAddOrUpdate:function(e) {
    //返回之前，先取出上一页对象，并设置addressId地址id
    console.log(e)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.route == "pages/checkout/checkout") {
      try {
        wx.setStorageSync('addressId', e.currentTarget.dataset.addressId);
      } catch (e) {

      }
      wx.navigateBack();
    } else {
      wx.navigateTo({
        url: '/pages/ucenter/addressAdd/addressAdd?id=' + e.currentTarget.dataset.addressId
      })
    }
  },
  //删除
  deleteAddress:function(e) {
    let that = this;
    let url = api.AddressDelete;
    let addressId = e.target.dataset.addressId;
    let data = {
      id: addressId
    };
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          util.request(url, data, 'POST').then(function (res) {
            if (res.code === 0) {
              //删除缓冲的地址id
              wx.removeStorage({
                key: 'addressId',
                success: function (res) {
                  //重新加载 
                  that.onLoad();
                },
              })
            }
          });
        }
      }
    })
    return false;
  },

  /**
   * 生命周期
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ user_id: app.globalData.user_id})
    this.getAddressList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})