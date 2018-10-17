var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

Page({
  data: {
    path:app.globalData.path,        //域名
    user_id:'',
    hasSpec: false,                  //规格选择界面显示隐藏，true显示，false隐藏
    isFooter:false,                  //判断是否售空
    goodsimgs:[],                    //商品主图
    productInfo:[],                  //商品信息
    Property:[],                     //商品属性
    answer: [],                      //常见问题
    num:1,                           //商品数量
    count:0,                         //评论数量
    cartNum:0,                       //购物车数量
    PropertyVal:'',                  //属性值
    hasIndex:-1,                     //判断是否选择属性
    product_id:'',                   //商品id
    CollectIcon:'',                  //收藏图标
    hasCollect:false,                //判断是否收藏
  },
  /**
   * 事件
   */
  // 获取商品信息
  getGoodsInfo: function () {
    let _that = this;
    let url = api.GoodsDetail;
    let data = {
      'product_id': this.data.product_id
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
          WxParse.wxParse('goodsDetail', 'html', res.data.contents.contents, _that);
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
      'product_id': this.data.product_id
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
    if(num < 1){
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
    if (!this.hasProperty()){
      util.showToast('请选择商品规格/属性');
      this.setData({
        hasSpec: true
      })
      return;
    }
    //判断是否登录
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
      return;
    }
    let url = api.CartAdd;
    let data = {
      'product_id': this.data.product_id,
      'user_id': this.data.user_id,
      'property_val': this.data.PropertyVal,
      'num': this.data.num,
    }
    util.request(url, data,'POST').then(function (res) {
      console.log(res)
      if(res.code==0){
        util.showToast(res.msg);
        this.setData({
          hasSpec: !this.data.hasSpec
        })
        this.onShow();
      }
    }.bind(this))
  },
  // 规格选择
  clickSkuValue: function (e) {
    let index = e.currentTarget.dataset.index;
    let name_id = e.currentTarget.dataset.nameId;
    let idx = e.currentTarget.dataset.idx;
    let property = this.data.property;
    console.log(property);
    property.map(function(v,i){
      if(i==index){
        v.value.map(function(val,k){
          if (k == idx){
            if (val.checked){
              val.checked = false;
              return;
            }
            val.checked = true;
          }else{
            val.checked = false;
          }
        })
      }
    })
    let PropertyVal = this.propertyVal().join();
    this.setData({
      property: property,
      PropertyVal: PropertyVal,
      name_id: name_id
    })
  },
  //获取规格的值
  propertyVal:function(){
    let property = this.data.property;
    let array = [];
    property.map(function(v,i){
      v.value.map(function(val,k){
        if(val.checked){
          array.push(val.value)
        }
      })
    })
    return array;
  },
  //判断规格是否有选择
  hasProperty:function(){
    console.log(this.data.property)
    return this.data.property.every(function (v, i) {
      return v.value.some(function (val, k) {
        if (val.checked) {
          return true;
        }
        return false;
      })
    })
  },
  //购物车商品件数
  cartCount:function(){
    let url = api.CartGoodsCount;
    let data = {
      'user_id':this.data.user_id
    }
    util.request(url, data, 'POST').then(function(res){
      if(res.code==0){
        this.setData({ cartNum:res.data})
      }
    }.bind(this))
  },
  //立即购买
  addFast: function () {
    //判断是否选择规格
    if (!this.hasProperty()) {
      util.showToast('请选择商品规格/属性');
      this.setData({
        hasSpec: true
      })
      return;
    }
    //判断是否登录
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/checkout/checkout?id='+this.data.product_id+"&num="+this.data.num+"&PropertyVal="+this.data.PropertyVal
    })
  },
  //判断商品是否收藏
  hasCollect:function(){
    let url = api.HasCollect;
    let data = { 'product_id': this.data.product_id, user_id: this.data.user_id}
    util.request(url,data,'POST').then(function(res){
      if(res.code===0){
        this.setData({ hasCollect: true, collect_id: res.data.collect_id })
      }
    }.bind(this))
  },
  //添加或是取消收藏
  addCollectOrNot: function () {
    //判断是否登录
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
      return;
    }
    let url,data;
    if (this.data.hasCollect) {//取消收藏操作
      url = api.DeleteCollect;
      data = { 'collect_id': this.data.collect_id, "product_id": this.data.product_id }
      util.request(url, data, 'POST').then(function (res) {
        if (res.code === 0) {
          this.setData({ hasCollect: false })
        }
        console.log(res)
      }.bind(this))
    } else {//收藏操作
      url = api.AddCollect;
      data = { 'user_id': this.data.user_id, "product_id": this.data.product_id}
      util.request(url,data,'POST').then(function(res){
        if(res.code === 0){
          this.setData({ hasCollect: true, collect_id: res.data.collect_id })
        }
        console.log(res)
      }.bind(this))
    }
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

  /**
   * app生命周期
   */
  onLoad: function (options) {
    let product_id = options.product_id;
    this.setData({
      product_id: product_id,
    })
    this.getGoodsInfo();
  },
  onShow: function () {
    this.setData({
      user_id: app.globalData.user_id
    })
    this.cartCount();
    this.hasCollect();
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