const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();


Page({
  data: {
    id:0,                         //当前id
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
    let url = api.GoodsCategory;
    let data = {
      id:this.data.id,                    //一级分类id
    }
    util.showLoading(function () {
      util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            currentList: res.data.currentList,
            currenName: res.data.sortFind.Sort_name,
            currenDocs: res.data.sortFind.docs
          })
          //当id是分类id时，这里需要重新设置成分类的一个子分类的id
          if (_that.data.id == res.data.cateFind.Cate_id){
            _that.setData({ id: res.data.sortFind.Sort_id})
          }
          _that.productList();
          wx.hideLoading();
        }
      })
    })
  },
  //获得商品列表数据
  productList:function(){
    let _that = this;
    let url = api.GoodsList;
    let data = {
      id: this.data.id,                    //一级分类id
      page: this.data.page,
      rows: this.data.rows
    }
    if (this.data.sortId){
      data.sortId = this.data.sortId
    }
    util.showLoading(function () {
      util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code == 0) {
          _that.setData({
            productList: res.data.productList,
          })
        }
        wx.hideLoading();
      })
    })
  },
  //选择分类
  switchCate:function(e){
    let id = e.currentTarget.dataset.id;
    if (id == this.data.id) {
      return;
    }
    this.setData({
      id: id,
    });
    this.categoryList();
  },

  // 页面渲染
  onLoad: function (options) {
    let id = options.id;
    let sortId = options.sortId || '';
    let title = options.title;
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      id: id,
      sortId: sortId
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