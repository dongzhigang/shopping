var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    path:app.globalData.path,
    user_id:'',                                     //用户id
    addressId: 0,                                   //地址id
    product_id:0,                                   //商品id
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00,    //快递费
    couponPrice: 0.00,     //优惠券的价格
    PropertyVal:'',        //属性值
    goodsNum:0,            //商品数量
    checkedGoodsList: [],
    checkedAddress: {},
  },
  /**
   * 事件函数
   */
  //获取checkou信息
  getCheckoutInfo: function () {
    let that = this;
    let url = api.CartCheckout;
    let data = { 
      'user_id': this.data.user_id
    }
    if (this.data.product_id){
      data.product_id = this.data.product_id
    }
    if (this.data.cart_id) {
      data.cart_id = this.data.cart_id
    }
    if (this.data.addressId) {
      data.addressId = this.data.addressId
    }
    util.request(url, data).then(function (res) {
      console.log(res);
      if (res.code === 0) {
        that.setData({
          checkedGoodsList: res.data.goodsList,
          checkedAddress: res.data.AddressData
        });
        if (res.data.AddressData){
          that.setData({
            addressId: res.data.AddressData.address_id
          });
        }
        //从商品详情下单
        if (that.data.num){
          let goodsTotalPrice = (that.data.num * res.data.goodsList[0].product_msg.at_price).toFixed(2);
          that.setData({
            goodsNum: that.data.num,
            actualPrice: goodsTotalPrice,
            goodsTotalPrice: goodsTotalPrice
          });
        }else{
          let talPrice = 0;
          res.data.goodsList.forEach(function (v, i) {
            talPrice += (v.num * v.product_msg.at_price);
            that.setData({
              goodsTotalPrice: talPrice.toFixed(2),
              actualPrice: talPrice.toFixed(2),
            });
          });
        }
      }
      wx.hideLoading();
    });
  },
  //重新选择地址
  selectAddress() {
    wx.navigateTo({
      url: '/pages/ucenter/address/address',
    })
  },
  //添加地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/ucenter/addressAdd/addressAdd',
    })
  },
  //付款生成订单
  submitOrder:function(){
    if (!this.data.addressId) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    let url = api.OrderSubmit;
    let data = {
      user_id :app.globalData.user_id,
      address_id: this.data.addressId,
      goodsPrice: this.data.goodsTotalPrice,
      actualPrice: this.data.actualPrice
    }
    if(this.data.num){
      data.num = this.data.num
    }
    if (this.data.product_id){
      data.product_id = this.data.product_id
    }
    if (this.data.PropertyVal){
      data.property_val = this.data.PropertyVal
    }
    if (this.data.cart_id){
      data.cart_id = this.data.cart_id
    }
    util.request(url,data,'POST').then(function(res){
      console.log(res)
      if(res.code===0){
        wx.redirectTo({
          url: '/pages/ucenter/orderDetail/orderDetail?orderId=' + res.data.order_id
        })
      }else{
        util.showToast(res.msg)
      }
    })
  },
  // submitOrder: function () {
  //   if (this.data.addressId <= 0) {
  //     util.showErrorToast('请选择收货地址');
  //     return false;
  //   }
  //   util.request(api.OrderSubmit, {
  //     cartId: this.data.cartId,
  //     addressId: this.data.addressId,
  //     couponId: this.data.couponId,
  //     grouponRulesId: this.data.grouponRulesId,
  //     grouponLinkId: this.data.grouponLinkId
  //   }, 'POST').then(res => {
  //     if (res.errno === 0) {
  //       const orderId = res.data.orderId;
  //       util.request(api.OrderPrepay, {
  //         orderId: orderId
  //       }, 'POST').then(function (res) {
  //         if (res.errno === 0) {
  //           const payParam = res.data;
  //           console.log("支付过程开始");
  //           wx.requestPayment({
  //             'timeStamp': payParam.timeStamp,
  //             'nonceStr': payParam.nonceStr,
  //             'package': payParam.packageValue,
  //             'signType': payParam.signType,
  //             'paySign': payParam.paySign,
  //             'success': function (res) {
  //               console.log("支付过程成功");
  //               wx.redirectTo({
  //                 url: '/pages/payResult/payResult?status=1&orderId=' + orderId
  //               });
  //             },
  //             'fail': function (res) {
  //               console.log("支付过程失败");
  //               wx.redirectTo({
  //                 url: '/pages/payResult/payResult?status=0&orderId=' + orderId
  //               });
  //             },
  //             'complete': function (res) {
  //               console.log("支付过程结束")
  //             }
  //           });
  //         } else {
  //           wx.redirectTo({
  //             url: '/pages/payResult/payResult?status=0&orderId=' + orderId
  //           });
  //         }
  //       });

  //     } else {
  //       wx.redirectTo({
  //         url: '/pages/payResult/payResult?status=0&orderId=' + orderId
  //       });
  //     }
  //   });
  // },

/**
 * 生命周期
 */

onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数\
  if (options.id){
    this.setData({
      product_id: options.id,
    })
  }
  if (options.num){
    this.setData({
      num: options.num
    })
  }
  if (options.PropertyVal) {
    this.setData({
      PropertyVal: options.PropertyVal
    })
  }
  if (options.cartId){
    this.setData({
      cart_id: options.cartId
    })
  }
  this.setData({
    user_id:app.globalData.user_id
  })
},
onReady: function () {
  // 页面渲染完成
},
onShow: function () {
  // 页面显示
  try {
    var addressId = wx.getStorageSync('addressId');
    if (addressId) {
      this.setData({
        'addressId': addressId
      });
    }
  } catch (e) {
  }

  this.getCheckoutInfo();
},
onHide: function () {
  // 页面隐藏

},
onUnload: function () {
  // 页面关闭
},
});