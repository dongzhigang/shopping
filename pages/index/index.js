const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp();

Page({
 data: {
  newGoods: [],     //新品首发
  hotGoods: [],       //人气推荐
  topics: [],         //专题精选
  brands: [],       //品牌制造商直供
  groupons: [],     //优惠专区数组
  floorGoods: [],   //
  banner: [],       //首页轮播
  channel: []       //分类数组
 },
 onLoad: function(options) {

 },
 onReady: function() {
  // 页面渲染完成
 },
 onShow: function() {
  // 页面显示
 },
 onHide: function() {
  // 页面隐藏
 },
 onUnload: function() {
  // 页面关闭
 },
})