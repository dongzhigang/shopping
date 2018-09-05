var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

Page({
  data: {
    hasSpec: false,                  //规格选择界面显示隐藏，true显示，false隐藏
    isFooter:false
  },

  // 页面分享
  onShareAppMessage: function() {
    
  },

  shareFriendOrCircle: function() {
    
  },

  // 保存分享图
  saveShare: function() {
    
  },

  //从分享的团购进入
  getGrouponInfo: function(grouponId) {
    
  },

  // 获取商品信息
  getGoodsInfo: function() {
    
  },

  // 获取推荐商品
  getGoodsRelated: function() {
    
  },

  // 团购选择
  clickGroupon: function(event) {
    
  },

  // 规格选择
  clickSkuValue: function(event) {
    
  },

  //获取选中的团购信息
  getCheckedGrouponValue: function() {
    
  },

  //获取选中的规格信息
  getCheckedSpecValue: function() {
    
  },

  //判断规格是否选择完整
  isCheckedAllSpec: function() {
    
  },

  getCheckedSpecKey: function() {
    
  },

  // 规格改变时，重新计算价格及显示信息
  changeSpecInfo: function() {
    
  },

  // 获取选中的产品（根据规格）
  getCheckedProductItem: function(key) {
    
  },

  onLoad: function(options) {
    
  },
  onShow: function() {
    
  },

  //添加或是取消收藏
  addCollectOrNot: function() {
    

  },

  //立即购买（先自动加入购物车）
  addFast: function() {
    
  },

  //添加到购物车
  addToCart: function() {
    
  },

  cutNumber: function() {
    
  },
  addNumber: function() {
    
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  switchAttrPop: function() {
    
  },
  closeAttr: function() {
    
  },
  closeShare: function() {
    
  },
  openCartPage: function() {
    
  },
  onReady: function() {
    // 页面渲染完成

  },
  // 下拉刷新
  onPullDownRefresh() {
    
  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function() {

  },

})