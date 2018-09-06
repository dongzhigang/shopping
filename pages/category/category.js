const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();


Page({
  data: {
    atId:0,                         //当前id
    path:app.globalData.path,
    height: app.globalData.Height,
    currentList:[],                 //当前分类列表
    productList:[],                 //当前分类商品             
    page:1,
    rows:10,
  },
  /**
   * 事件
   */
  //当前分类
  categoryList:function(){
    let _that = this;
    let url = api.CatalogCurrent;
    let data = {
      id:this.data.id,
      page: this.data.page,
      rows:this.data.rows
    }
    util.showLoading(function () {
      util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            atId: res.data.currentList[0].id,
            currenName: res.data.currentList[0].Sort_name,
            currenDocs: res.data.currentList[0].docs,
            currentList: res.data.currentList,
            productList: res.data.productList
          })
          wx.hideLoading();
        }
      })
    })
  },

  // 页面渲染
  onLoad: function (options) {
    let id = options.id;
    let title = options.title;
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      id:id
    })
    this.categoryList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})