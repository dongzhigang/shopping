var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
var app = getApp();
Page({
 data: {
   path:app.globalData.path,
   hasLogin:false,              //判断是否登录
   cartGoods:[],                //购物车列表
   cartStatus:[],               //选择状态数据
   isEditCart:false,            //编辑和完成切换
   price:0,                     //价格
   totalPrice:0,                //总价
   checkedAll:false,            //全选
   selectNumber:0,              //选择个数
 },
 /**
  * 事件
  */
//查询列表
cartList:function(){
  let _that = this;
  let url = api.CartList;
  let data = { 'user_id': this.data.user_id};
  util.showLoading(function(){
    util.request(url, data).then(function (res) {
      console.log(res)
      if (res.code == 0) {
        _that.setData({
          cartGoods: res.data,
          cartStatus: res.data,           //状态数据
        })
      }
      wx.hideLoading();
    })
  })  
},
//更新购物车
updateCart:function(){
  let _that = this;
  let cartGoods = this.data.cartGoods;
  let arrayId = this.returnId().join();
  let arrayNum = this.returnNum().join();
  let url = api.CartUpdate;
  let data = { 'id': arrayId, 'num': arrayNum};
  util.request(url,data).then(function(res){
    if(res.code == 0){
      util.showToast(res.msg);
      _that.onShow();
    }else{
      util.showToast(res.msg)
    }
  }.bind(this))
},
//删除购物车
deleteCart:function(){
  let cartGoods = this.data.cartGoods;
  let arrayId = this.returnId().join();
  let url = api.CartDelete;
  let data = { 'id': arrayId};
  let _that = this;
  util.request(url, data).then(function (res) {
    if (res.code == 0) {
      util.showToast(res.msg)
      setTimeout(function(){
        _that.onShow()
        _that.setData({
          isEditCart: false,
          selectNumber:0
        })
      },1000)
    } else {
      util.showToast(res.msg)
    }
  })
},
//编辑
editCart:function(e){
  let id = e.currentTarget.id;
  if (this.data.isEditCart){    
    switch(id){
      case "edit":
        if (this.isEditCart()===true){
          //更新购物车
          this.updateCart();
        }else{
          util.showToast('请选择商品');
          return;
        }
      break;
      case "del":
        //删除购物车
        this.deleteCart();
      break;
    }
    //调用全选函数，全部初始化
  }
  //调用全选函数，全部初始化
  this.setData({
    isEditCart: !this.data.isEditCart
  })
},
//取消
cancelCart:function(){
  let cartGoods = this.data.cartGoods;
  cartGoods.map(function (v, i) {
    v.checked = false;
  })
  this.setData({ 
    isEditCart:false,
    checkedAll:false,
    cartGoods: cartGoods
  })
},
//选择
checkedItem:function(e){
  let index = e.currentTarget.dataset.index;
  let cartGoods = this.data.cartGoods;
  let selectNumber = this.data.selectNumber;
  let totalPrice = this.data.totalPrice;
  cartGoods.map(function (v, i) {
    if (i == index) {
      if (v.checked){
        v.checked = false;
        selectNumber -= 1;
        totalPrice -= v.num * parseInt(v.product_msg.at_price);
        return;
      }
      v.checked = true;
      selectNumber+=1;
      totalPrice += v.num * parseInt(v.product_msg.at_price);
    } 
  })
  if (this.data.isEditCart){
    this.setData({
      isEditCart: this.isEditCart()
    })
  }
  this.setData({
    cartGoods: cartGoods,
    checkedAll: this.hasCheckedAll(),
    selectNumber: selectNumber,
    totalPrice: totalPrice
  });
},
//得到选中的cart_id和num
returnId:function(){
  let cartGoods = this.data.cartGoods;
  let arrayId = new Array();
  cartGoods.map(function(v,i){
    if (v.checked){
      arrayId.push(v.cart_id);
    }
  })
  return arrayId;
},
returnNum: function () {
  let cartGoods = this.data.cartGoods;
  let arrayNum = new Array();
  cartGoods.map(function (v, i) {
    if (v.checked) {
      arrayNum.push(v.num);
    }
  })
  return arrayNum;
},
//全选
checkedAll:function(){
  let cartGoods = this.data.cartGoods;
  let selectNumber = this.data.selectNumber;
  let totalPrice = this.data.totalPrice;
  if (this.data.checkedAll){
    cartGoods.map(function (v, i) {
      v.checked = false;
    })
    selectNumber=0;
    totalPrice=0;  
  }else{
    cartGoods.map(function (v, i) {
      v.checked = true;
      selectNumber = i+1;
      totalPrice += v.num*parseInt(v.product_msg.at_price);
    })
  }
  if (this.data.isEditCart) {
    this.setData({
      isEditCart: this.isEditCart()
    })
  }
  this.setData({
    cartGoods: cartGoods,
    checkedAll: this.hasCheckedAll(),
    selectNumber: selectNumber,
    totalPrice: totalPrice,
  })
},
//判断是否有选择商品
isEditCart:function(){
  return this.data.cartGoods.some(function(v,i){
    if (v.checked){
      return true;
    }else{
      return false;
    }
  });

},
//判断是否全选
hasCheckedAll:function(){
  return this.data.cartGoods.every(function (v, i) {
    if (v.checked) {
      return true;
    } else {
      return false;
    }
  });
},
//数量减少
cutNumber:function(e){
  let index = e.currentTarget.dataset.index;
  let num = e.currentTarget.dataset.num;
  let cartGoods = this.data.cartGoods;
  let totalPrice = this.data.totalPrice;
  num-=1;
  if (num < 0){
    return;
  }
  cartGoods.map(function(v,i){
    if(index == i){
      v.num = num;
      totalPrice -= parseInt(v.product_msg.at_price);
    }
  })
  this.setData({ cartGoods: cartGoods, totalPrice: totalPrice})
},
//数量添加
addNumber:function(e){
  let index = e.currentTarget.dataset.index;
  let num = e.currentTarget.dataset.num;
  let cartGoods = this.data.cartGoods;
  let arrayNum = this.data.arrayNum;
  let totalPrice = this.data.totalPrice;
  num += 1;
  cartGoods.map(function (v, i) {
    if (index == i) {
      v.num = num;
      totalPrice += parseInt(v.product_msg.at_price);
    }
  })
  this.setData({ cartGoods: cartGoods, totalPrice: totalPrice})
},
//下单
checkoutOrder: function() {
  //获取已选择的商品
  if (this.isEditCart() === true) {
    //更新购物车
    this.updateCart();
    wx.navigateTo({
      url: '/pages/checkout/checkout?cartId=' + this.returnId()
    })
  } else {
    util.showToast('请选择商品');
    return;
  }
},
//登录
goLogin:function(){
  wx:wx.navigateTo({
    url: '/pages/auth/login/login',
  })
},
/**
 * 生命周期
 */
onLoad: function(options) {
// 页面初始化 options为页面跳转所带来的参数
},
onReady: function() {
// 页面渲染完成
},
onPullDownRefresh() {

},
onShow: function() {
// 页面显示
  this.setData({
    checkedAll: false,
    selectNumber: 0,
    totalPrice: 0,
    user_id: app.globalData.user_id,
    hasLogin: app.globalData.hasLogin
  })
  this.cartList();
},
onHide: function() {
// 页面隐藏
},
onUnload: function() {
// 页面关闭
},
 
})