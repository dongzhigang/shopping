// 上传组件 基于https://github.com/Tencent/weui-wxss/tree/master/src/example/uploader
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    goodsDetail:'',
    stars: [0, 1, 2, 3, 4],
    grade:5,
    files:[],
    picUrls:[],
    timeStart:0,
    timeEnd:0,
    space:350,

  },
  /**
   * 事件函数
   */
  //商品信息
  goodsDetail:function(){
    let url = api.GoodsDetail;
    let data = {'product_id':this.data.product_id}
    util.request(url,data,'POST').then(function(res){
      console.log(res)
      if(res.code == 0){
        this.setData({
          goodsDetail: res.data.productInfo
        })
      }
    }.bind(this))
  },
  //选择评分
  selectRater:function(e){
    let grade = e.currentTarget.dataset.grade + 1;
    this.setData({
      grade: grade
    })
  },
  //从本地相册选择图片或使用相机拍照。
  chooseImage:function(){
    if (this.data.files.length >= 5) {
      util.showErrorToast('只能上传五张图片')
      return false;
    }
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        that.upload(res);
      }
    })
  },
  //上传图片
  upload: function (res) {
    var that = this;
    wx.uploadFile({
      url: api.StorageUpload,
      filePath: res.tempFilePaths[0],
      name: 'file',
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.code === 0) {
          var url = app.globalData.path + data.data
          that.data.picUrls.push(url)
          that.setData({
            picUrls: that.data.picUrls
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '错误',
          content: '上传失败',
          showCancel: false
        })
      },
    })
  },
  //触摸开始，图片删除
  startImage:function(e){
    console.log(e)
    let timeStart = e.timeStamp
    this.setData({ timeStart: timeStart})
  },
  //触摸结束
  endImage: function (e) {
    let timeEnd = e.timeStamp;
    let index = e.currentTarget.dataset.index;
    if ((timeEnd - this.data.timeStart) > this.data.space){
      wx.showModal({
        title:'确定要删除',
        success:function(res){
          if (res.confirm){
            this.data.files.splice(index,1)
            this.data.picUrls.splice(index, 1)
            console.log(this.data.files)
            console.log(this.data.picUrls)
            this.setData({
              files: this.data.files,
              picUrls: this.data.picUrls
            })
          }
        }.bind(this)
      })
    }
  },
  //留言内容
  bindInputValue:function(e){
    this.setData({ content: e.detail.value})
  },
  //提交评论
  submitComment:function(){
    let content = this.data.content;
    let picUrls = this.data.picUrls;
    let grade = this.data.grade;
    let product_id = this.data.product_id;
    let user_id = wx.getStorageSync('userInfo').user_id;
    let order_id = this.data.order_id;
    let data = {
      content: content,
      picUrls: picUrls,
      grade: grade,
      product_id: product_id,
      user_id: user_id,
      order_id: order_id
    }
    let url = api.CommentAdd
    console.log(data)
    util.request(url,data,'POST').then(function(res){
      console.log(res)
      if(res.code == 0){
        util.showToast(res.msg)
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
      }
    })
  },
  /**
   * 生命周期
   */
  onLoad: function (options) {
    this.setData({
      product_id: options.product_id,
      order_id: options.order_id
    });
    console.log(options)
    //商品信息
    this.goodsDetail();
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})