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
   totalPrice:0,               //总价
   checkedAll:false,            //全选
   selectNumber:0,              //选择个数              
 },
 /**
  * 事件
  */
//列表
cartList:function(){
  let _that = this;
  let url = api.CartList;
  let data = { 'user_id': this.data.user_id};
  util.request(url,data).then(function(res){
    console.log(res)
    if(res.code == 0){
      _that.setData({
        cartGoods:res.data,
        cartStatus: res.data,           //状态数据
      })
    }
  })
},
//保存购物车
addCarts:function(){

},
//编辑
editCart:function(){
  this.setData({ 
    isEditCart: !this.data.isEditCart,
    hasSele: !this.data.hasSele    
  })
},
//选择
checkedItem:function(e){
  let index = e.currentTarget.dataset.index;
  let cartGoods = this.data.cartGoods;
  cartGoods.map(function (v, i) {
    if (i == index) {
      if (v.checked){
        v.checked = false;
        return;
      }
      v.checked = true;
    } 

  })
  this.setData({
    cartGoods: cartGoods,
    isEditCart: this.isEditCart(),
    checkedAll: this.hasCheckedAll()
  });
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
    totalPrice=0

  }else{
    cartGoods.map(function (v, i) {
      v.checked = true;
      selectNumber = i+1;
      totalPrice += parseInt(v.product_msg.at_price);
    })
  }
  this.setData({
    cartGoods: cartGoods,
    checkedAll: this.hasCheckedAll(),
    selectNumber: selectNumber,
    totalPrice: totalPrice
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
  console.log(e)
  let index = e.currentTarget.dataset.index;
  let num = e.currentTarget.dataset.num;
  let cartStatus = this.data.cartStatus;
  num-=1;
  if (num < 0){
    return;
  }
  cartStatus.map(function(v,i){
    if(index == i){
      v.num = num
    }
  })
  this.setData({ cartStatus: cartStatus})
},



onLoad: function(options) {
// 页面初始化 options为页面跳转所带来的参数
  let user_id = options.user_id;
  this.setData({ 'user_id': user_id})
  this.cartList();
},
onReady: function() {
// 页面渲染完成
},
onPullDownRefresh() {

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