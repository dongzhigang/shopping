var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    path:app.globalData.path,
    user_id: 1,
    collectList: [],            //收藏列表
    page: 1,
    rows: 10,
    maxTime:350
  },
  //获取收藏列表
  getCollectList() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    let url = api.CollectList;
    let data = { user_id: that.data.user_id, page: that.data.page, rows: that.data.rows };
    util.request(url, data,'POST').then(function (res) {
      if (res.code === 0) {
        console.log(res.data)
        that.setData({
          collectList: that.data.collectList.concat(res.data),
          // totalPages: res.data.totalPages
        });
      }
      wx.hideLoading();
    });
  },
  // onReachBottom() {
  //   if (this.data.totalPages > this.data.page) {
  //     this.setData({
  //       page: this.data.page + 1
  //     });
  //     this.getCollectList();
  //   } else {
  //     wx.showToast({
  //       title: '没有更多用户收藏了',
  //       icon: 'none',
  //       duration: 2000
  //     });
  //     return false;
  //   }
  // }, 
  //按下删除或跳转 
  openGoods(e) {
    let that = this;
    let goodsId = e.currentTarget.dataset.productid;
    let collectId = e.currentTarget.dataset.collectid;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touchEnd - that.data.touchStart;
    console.log(touchTime);
    //如果按下时间大于350为长按  
    if (touchTime > this.data.maxTime) {
      wx.showModal({
        title: '',
        content: '确定删除吗？',
        success: function (res) {
          if (res.confirm) {
            let url = api.DeleteCollect;
            let data = { collect_id: collectId}
            util.request(url, data, 'POST').then(function (res) {
              if (res.code === 0) {
                console.log(res.data);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                that.data.collectList.splice(index, 1)
                that.setData({
                  collectList: that.data.collectList
                });
              }
            });
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/goods/goods?id=' + goodsId,
      });
    }
  },
  //按下事件开始  
  touchStart: function (e) {
    let that = this;
    that.setData({
      touchStart: e.timeStamp
    })
  },
  //按下事件结束  
  touchEnd: function (e) {
    let that = this;
    that.setData({
      touchEnd: e.timeStamp
    })
  }, 

  /**
   * 生命周期
   */
  onLoad: function (options) {
    this.getCollectList();
  },
  onReady: function () {

  },
  onShow: function () {
    this.getCollectList();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
})