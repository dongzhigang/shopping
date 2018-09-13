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
    cartNum:0,                       //购物车数量
    PropertyVal:'',                  //属性值
    hasIndex:-1,                     //判断是否选择属性
    PropertyId:'',                   //属性id
    product_id:'',                   //商品id
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
          _that.cartCount();
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
      _that.setData({count:res.data.count})
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
  //添加到购物车
  addToCart: function () {
    //判断是否选择规格
    if (!this.data.PropertyId){
      util.showToast('请选择规格');
      return;
    }
    //判断是否选择数量
    if (!this.data.num){
      util.showToast('请选择数量');
      return;
    }
    let url = api.CartAdd;
    let data = {
      'product_id': this.data.product_id,
      'user_id': 1,
      'num': this.data.num,
      'property_id': this.data.PropertyId
    }
    console.log(data)
    util.request(url, data).then(function (res) {
      console.log(res)
      if(res.code==0){
        util.showToast(res.msg);
        this.setData({
          hasSpec: !this.data.hasSpec
        })
      }
    }.bind(this))
  },
  // 规格选择
  clickSkuValue: function (e) {
    let PropertyId = e.currentTarget.dataset.id;
    let PropertyVal = e.currentTarget.dataset.value;
    let hasIndex = e.currentTarget.dataset.index;
    let product_id = e.currentTarget.dataset.productid
    this.setData({
      hasProperty:true,
      PropertyId: PropertyId,
      PropertyVal: PropertyVal,
      hasIndex: hasIndex,
      product_id: product_id
    })
  },
  //购物车商品件数
  cartCount:function(){
    let url = api.CartGoodsCount;
    let data = {
      'user_id':this.data.user_id
    }
    util.request(url, data, 'POST').then(function(res){
      console.log(res)
      if(res.code==0){
        this.setData({ cartNum:res.data})
      }
    }.bind(this))
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
  /**
   * app生命周期
   */
  onLoad: function (options) {
    let id = options.id;
    let user_id = app.globalData.user_id;
    this.setData({
      id:id,
      user_id: user_id
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