var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
let app = getApp();

Page({
 data: {
  path:app.globalData.path,
  orderList: [],
  showType: 0
 },

 onPullDownRefresh() {
  wx.showNavigationBarLoading() //在标题栏中显示加载
  this.getOrderList();
  wx.hideNavigationBarLoading() //完成停止加载
  wx.stopPullDownRefresh() //停止下拉刷新
 },
//订单列表
 getOrderList() {
  let that = this;
   let url = api.OrderList;
   let data = {
     status: that.data.showType,
     user_id:this.data.user_id
   }
  util.request(url, data, 'POST').then(function(res) {
   if (res.code === 0) {
    that.setData({
      orderList: res.data.OrderList
    });
   }
  });
 },
 //切换类型
 switchTab: function(event) {
  let showType = event.currentTarget.dataset.index;
  this.setData({
   showType: showType
  });
  this.getOrderList();
 },

onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数  
  if (options.index){
    this.setData({
      showType: options.index
    })
  }

},
 onReady: function() {
  // 页面渲染完成
 },
 onShow: function() {
  // 页面显示
  this.setData({
    user_id: app.globalData.user_id
  })
  this.getOrderList();
 },
 onHide: function() {
  // 页面隐藏
 },
 onUnload: function() {
  // 页面关闭
 }
})