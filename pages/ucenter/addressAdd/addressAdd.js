var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    address: {
      user_id: app.globalData.user_id,      //用户id
      provinceName: '',                     //省份名称
      cityName: '',                         //城市名称
      areaName: '',                         //区/县名称
      address: '',                          //详细
      code:'',                              //邮政编码
      name: '',                             //姓名                             
      mobile: '',                           //手机号码
      phone:'',                             //座机号码
      Default: 0,                           //判断是否默认，0、1
    },
    region: ['省', '市', '区/县'],           //地区数据
    addressId: 0,                           //地址id
  },
  /**
   * 事件函数
   */
  //获取手机数据
  bindinputMobile:function(e) {
    let address = this.data.address;
    address.mobile = e.detail.value;
    this.setData({
      address: address
    });
  },
  //获取座机数据
  bindinputPhone:function(e) {
    let address = this.data.address;
    address.phone = e.detail.value;
    this.setData({
      address: address
    });
  },
  //获取姓名数据
  bindinputName:function(e) {
    let address = this.data.address;
    address.name = e.detail.value;
    this.setData({
      address: address
    });
  },
  bindRegionChange: function (e){
    let area = e.detail.value;
    let provinceName = area[0];
    let cityName = area[1];
    let areaName = area[2];
    let address = this.data.address;
    address.provinceName = provinceName;
    address.cityName = cityName;
    address.areaName = areaName;
    this.setData({
      address: address
    });
    console.log(address)
  },
  //获取详细地址数据
  bindinputAddress:function(e){
    let address = this.data.address;
    address.address = e.detail.value;
    this.setData({
      address: address
    });
  },
  //获取是否默认数据
  bindIsDefault:function(){
    let address = this.data.address;
    address.Default = !address.Default;
    if (address.Default){
      address.Default = 1;
    }else{
      address.Default = 0;
    }
    this.setData({
      address: address
    });
  },
  //获取邮政编码
  bindinputCode:function(e){
    let address = this.data.address;
    address.code = e.detail.value;
    this.setData({
      address: address
    });
  },
  //保存地址
  saveAddress:function() {
    let regular = '';
    let address = this.data.address;
    if (address.name == '') {
      util.showErrorToast('请输入姓名');
      return false;
    }
    regular = /^1[3|4|5|7|8][0-9]{9}$/;
    if (address.mobile == '' || !regular.test(address.mobile.trim())) {
      util.showErrorToast('请输入手机号码');
      return false;
    }
    if (address.address == '') {
      util.showErrorToast('请输入详细地址');
      return false;
    }
    regular = /^[0-9]{6}$/;
    if (address.code == '' || !regular.test(address.code.trim())) {
      util.showErrorToast('请输入邮政编码');
      return false;
    }
    if (address.provinceName == '' || address.cityName == '' || address.areaName == '') {
      util.showErrorToast('请输入地区');
      return false;
    }
    let that = this;
    let url = api.AddressSave;
    let data = {
      user_id: address.user_id,
      name: address.name,
      mobile: address.mobile,
      phone: address.phone,
      address: address.address,
      Default: address.Default,
      provinceName: address.provinceName,
      cityName: address.cityName,
      areaName: address.areaName,
      code:address.code,
    }
    if (this.data.addressId){
      data.id = this.data.addressId
    }
    util.request(url, data, 'POST').then(function (res) {
      if (res.code === 0) {
        wx.navigateBack();
      } else if (res.code === 1){
        util.showToast(res.msg)
      }else{
        util.showToast(res.msg)
      }
    });

  },
  //取消
  cancelAddress() {
    wx.navigateBack();
  },
  //加载地址数据
  getAddressDetail:function(){
    let that = this;
    let url = api.AddressDetail;
    let data = {
      addressId: this.data.addressId
    }
    util.request(url, data, 'POST').then(function (res) {
      console.log(res)
      if (res.code === 0) {
        that.setData({ address:res.data})
      }
    });
  },

  /**
   * 生命周期
   */
  //页面加载中
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数地址id
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id,
      });
      console.log(options.id)
      this.getAddressDetail();
    }
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