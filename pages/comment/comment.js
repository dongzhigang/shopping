var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    path:app.globalData.path,
    index:0,
    commentlist:[],             //全部评论
  },
  /**
   * 事件
   */
  //全部评论
  commentList:function(){
    let _that = this;
    let url = api.CommentList;
    let data = {
      'product_id':this.data.id
    }
    if(this.data.stats){
      data.stats=this.data.stats
    }
    util.request(url,data).then(function(res){
      console.log(res)
      _that.setData({
        commentlist: res.data.commentlist,
        count: res.data.count
      })
    })
  },
  //切换
  switchTab:function(e){
    let index = e.currentTarget.dataset.index;
    if (index==0){
      this.setData({ index: index, stats:0})
    }else{
      this.setData({ index: index, stats: 1 })
    }
    //评论列表
    this.commentList();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let id = options.id;
    this.setData({
      id:id
    })
    //评论列表
    this.commentList();

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
  onReachBottom: function(){
  }
})