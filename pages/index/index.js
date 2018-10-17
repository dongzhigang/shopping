const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    path: app.globalData.path,
    newGoods: [],     //新品首发
    hotGoods: [],     //人气推荐
    brands: [],       //品牌制造商直供
    banner: [],       //首页轮播
    channel: [],      //分类数组
    productList:[],   //商品列表
  },
  /**
   * 事件
   */
  //首页轮播
  banner:function(){
    let _that = this;
    let url = api.IndexUrl;
    util.showLoading(function () {
      util.request(url).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            banner: res.data.Advertis,
            brands: res.data.brandList,
            hotGoods: res.data.hotSale,
            channel: res.data.cateList,
            productList: res.data.productList,
            newGoods: res.data.newProduct,
          })
          console.log(_that.data.brands)
          wx.hideLoading();
        }else{
          wx.hideLoading();
          util.showToast(res.msg)
        }
      }).catch(function(err){
        console.log(err)
      });
    })
  },
  onLoad: function(options) {
    this.banner();  //首页轮播
  },
  onReady: function() {
  // 页面渲染完成
  },
  onShow: function() {
    this.banner();  //首页轮播
  // 页面显示
  },
  onHide: function() {
  // 页面隐藏
  },
  onUnload: function() {
  // 页面关闭
  },
})