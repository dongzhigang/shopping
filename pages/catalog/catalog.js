var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp();

Page({
 data: {
   path:app.globalData.path,
   Cate_id:0,                    //一级分类id
   cateList:[],             //一级分类列表
   sortList:[]              //当前分类列表
 },
 /**
  * 事件
  */
  //获取数据
  catalogList:function(){
    let _that = this;
    let url = api.CatalogList;
    util.showLoading(function () {
      util.request(url).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            cateList: res.data.cateList,
            Cate_id: res.data.findCate.Cate_id,
            cateImg: res.data.findCate.img,
            cateName: res.data.findCate.Cate_name,
            cateDocs: res.data.findCate.docs,
            sortList: res.data.sortList
          })
          wx.hideLoading();
        }
      }).catch(function (err) {
        console.log(err)
      });
    })
  },
  //选择分类
  switchCate:function(e){
    let id = e.currentTarget.dataset.id;
    let _that = this;
    let url = api.CatalogCurrent;
    let data = { Cate_id: id};
    util.showLoading(function () {
      util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            Cate_id: res.data.findCate.Cate_id,
            cateImg: res.data.findCate.img,
            cateName: res.data.findCate.Cate_name,
            cateDocs: res.data.findCate.docs,
            sortList: res.data.sortList
          })
          wx.hideLoading();
        }
      }).catch(function (err) {
        console.log(err)
      });
    })
  },
  //商品总数
  productCount:function(){
    let _that = this;
    let url = api.GoodsCount;
    util.request(url).then(function (res) {
      console.log(res)
      if (res.code == 0) {
        _that.setData({
          Count:res.data
        })
      }
    }).catch(function (err) {
      console.log(err)
    });
  },
  /**
   * 生命周期
   */
 onLoad: function(options) {
   this.catalogList();
   this.productCount();
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