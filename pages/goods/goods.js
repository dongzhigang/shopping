var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

Page({
  data: {
    path:app.globalData.path,        //域名
    hasSpec: false,                  //规格选择界面显示隐藏，true显示，false隐藏
    isFooter:false,                  //判断是否售空
    goodsimgs:[],                    //商品主图
    productInfo:[],                  //商品信息
    Property:[],                     //商品属性
    answer: [],                      //常见问题
    num:0,                           //商品数量
    count:0,                         //评论数量
  },
  /**
   * 事件
   */
  // 获取商品信息
  getGoodsInfo: function () {
    let _that = this;
    let url = api.GoodsDetail;
    let data = {
      'product_id':this.data.id
    }
    util.showLoading(function () {
      util.request(url, data, 'POST').then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            goodsimgs: res.data.master,
            productInfo: res.data.productInfo,
            property: res.data.property,
            parameter: res.data.parameter,
            answer: res.data.answer,
            commentlist: res.data.commentlist
          })
          _that.getCount();
          wx.hideLoading();
        }
      });
    })
  },
  //获取评论总数
  getCount:function(){
    let _that = this;
    let url = api.CommentCount;
    let data = {
      'product_id': this.data.id
    }
    util.request(url,data).then(function(res){
      console.log(res)
      _that.setData({count:res.data})
    })
  },
  //选择规格切换
  switchAttrPop: function () {
    this.setData({
      hasSpec: !this.data.hasSpec
    })
  },
  //改变数量
  inputNunber:function(e){
    let num = e.detail.value;
    this.setData({ num: num });
  },
  //数量减少
  cutNumber: function () {
    let num = this.data.num;
    num-=1;
    if(num < 0){
      return;
    }
    this.setData({num:num})

  },
  //数量增加
  addNumber: function () {
    let num = this.data.num;
    num += 1;
    this.setData({ num: num })
  },

  closeAttr: function () {
  },
  closeShare: function () {
  },
  openCartPage: function () {
  },
  // 下拉刷新
  onPullDownRefresh() {
  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {
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
  //添加或是取消收藏
  addCollectOrNot: function() {
  },
  //立即购买（先自动加入购物车）
  addFast: function() {  
  },
  //添加到购物车
  addToCart: function() {
  },
  /**
   * app生命周期
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id:id
    })
    this.getGoodsInfo();
  },
  onShow: function () {

  },
  onHide: function() {
    // 页面隐藏

  },
  onReady: function () {
    // 页面渲染完成

  },
  onUnload: function() {
    // 页面关闭

  },

})