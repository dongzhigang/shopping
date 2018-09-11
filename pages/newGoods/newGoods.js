var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    path:app.globalData.path,
    goodsList: [],                    //商品列表
    currentSortType: 'default',       //当前选中
    categoryFilter:false,             //子分类显示隐藏
    fieldSortList:[],                 //子分类列表
    order: '',                        //排序，desc下降，asc上升，null为综合 
    id:'',                            //子分类id
    page: 1,
    rows: 100,
    newIndex:'',

    bannerInfo: {                     //新品海报
      'imgUrl': '',
      'name': ''
    },
  },

  getBanner: function () {
    let that = this;
    util.request(api.GoodsNew).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          bannerInfo: res.data.bannerInfo,
        });
      }
    });
  },
  //商品列表
  getGoodsList: function() {
    let that = this;
    let url = api.GoodsList;
    let data={
      'page' : this.data.page,
      'rows' : this.data.rows, 
      'new_product':1
    };
    //排序
    if (this.data.order){
      data.order = this.data.order
    }
    //分类
    if(this.data.id){
      data.Sort_id = this.data.id
    }
    util.request(url, data).then(function (res) {
        console.log(res)
        if (res.code === 0) {
          that.setData({
            goodsList: res.data.productList,
            fieldSortList: res.data.fieldSortList
          });
        }
      });
  },
  //展示分类
  openSortFilter: function (e) {
    let currentId = e.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({         
          currentSortType: 'category',
          categoryFilter: !this.data.categoryFilter,
          order: '',
        });
        break;
      case 'priceSort':
        let tmpSortOrder = this.data.order;
        console.log(tmpSortOrder)
        if (tmpSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        } else if (!tmpSortOrder){
          tmpSortOrder = 'desc';
        }else{
          tmpSortOrder = 'asc';
        }
        this.setData({
          currentSortType: 'price',
          order: tmpSortOrder,
          categoryFilter: false,
        });
        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          categoryFilter: false,
          order:'',
          id:'',
          newIndex: '',
        });
        this.getGoodsList();
    }
  },
  //选择分类
  selectCategory: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.setData({
      id: id,
      newIndex:index,
      categoryFilter: !this.data.categoryFilter
    });
    this.getGoodsList();
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.getBanner();
    this.getGoodsList();
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