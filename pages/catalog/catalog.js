var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp();

Page({
 data: {
   path:app.globalData.path,
   id:0,                    //一级分类id
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
            id: res.data.findCate.id,
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
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    let _that = this;
    let url = api.CatalogCurrent;
    let data = {id:id};
    util.showLoading(function () {
      util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            id: res.data.findCate.id,
            cateImg: res.data.findCate.img,
            cateName: res.data.findCate.cate_name,
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
  /**
   * 生命周期
   */
 onLoad: function(options) {
   this.catalogList();
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