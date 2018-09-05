var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
 data: {
  
 },
 onLoad: function(options) {
  // 页面初始化 options为页面跳转所带来的参数
 },

 onPullDownRefresh() {
  
 },

 getOrderList() {
  
 },
 switchTab: function(event) {
  
 },
 onReady: function() {
  // 页面渲染完成
 },
 onShow: function() {
  // 页面显示
  this.getOrderList();
 },
 onHide: function() {
  // 页面隐藏
 },
 onUnload: function() {
  // 页面关闭
 }
})