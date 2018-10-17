var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp()
Page({
  data: {
    path:app.globalData.path,
    keywrod: '',                      //关键词
    defaultKeyword: {},               //默认关键词
    hotKeyword: [],                   //热门关键词
    goodsList: [],                    //商品列表
    filterCategory: [],               //分类列表
    page: 1,
    rows: 20,
    id:'',                            //子分类id
    order:'',                         //排序
    searchStatus: false,              //判断是否有数据
    categoryFilter: false,            //显示隐藏分类
    currentSortType: 'default',       //默认商品
  },
  /**
   * 事件处理函数
   */
  //取消搜索
  closeSearch: function () {
    wx.navigateBack()
  },
  //删除搜索词
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  //出现删除键
  inputChange: function (e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false,
      id:'',
      order:''
    });

    if (e.detail.value) {
      // this.getHelpKeyword();
    }
  },
  //热门关键词
  getSearchKeyword() {
    let that = this;
    let url = api.SearchIndex;
    util.request(url).then(function (res) {
      console.log(res)
      if (res.code === 0) {
        that.setData({
          defaultKeyword: res.data.defaultKeyword,
          hotKeyword: res.data.hotKeywordList,
        });
      }
    });
  },
  //搜索结果
  getGoodsList: function () {
    let that = this;
    let url = api.SearchResult;
    let data = {
      keyword: that.data.keyword,
      page: that.data.page,
      rows: that.data.rows,
    };
    //分类
    if (that.data.id){
      data.Sort_id = that.data.id;
    }
    //排序
    if (that.data.order) {
      data.order = that.data.order;
    }
    util.request(url,data).then(function (res) {
      if (res.code === 0) {
        console.log(res)
        that.setData({
          searchStatus: true,
          categoryFilter: false,
          goodsList: res.data.productList,
          filterCategory: res.data.fieldSortList
        });
      }
    });
  },
  //确认搜索
  onKeywordConfirm(e) {
    this.getSearchResult(e.detail.value);
  },
  //获取关键词
  getSearchResult(keyword) {
    if (keyword === '') {
      keyword = this.data.defaultKeyword.keyword;
    }
    this.setData({
      keyword: keyword,
      page: 1,
    })
    //商品列表
    this.getGoodsList();
  },
  //获取焦点
  inputFocus: function () {
    this.setData({
      searchStatus: false,
      id: '',
      order: '',
      goodsList: []
    });
    if(this.data.keyword) {
      // this.getHelpKeyword();
    }
  },
  //分类展开
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        //分类
        this.setData({
          categoryFilter: !this.data.categoryFilter,
          currentSortType: 'category',
          order: '',
        });
        break;
      case 'priceSort':
        //排序
        let tmpSortOrder = this.data.order;
        if (tmpSortOrder== 'asc') {
          tmpSortOrder = 'desc';
        }else{
          tmpSortOrder = 'asc';
        }
        this.setData({
          currentSortType: 'price',
          categoryFilter: false,
          order: tmpSortOrder
        });
        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          categoryFilter: false,
          order:'',
          id:''
        });
        this.getGoodsList();
    }
  },
  //选择分类
  selectCategory: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let keyIndex = e.currentTarget.dataset.index;
    this.setData({
      id: id,
      categoryFilter: false,
      page: 1,
      goodsList: []
    });
    this.getGoodsList();
  },
  //热门搜索
  onKeywordTap: function (e) {
    let keyword = e.currentTarget.dataset.keyword;
    this.getSearchResult(keyword);
  },
  //搜索帮助
  // getHelpKeyword: function () {
  //   let that = this;
  //   util.request(api.SearchHelper, {
  //     keyword: that.data.keyword
  //   }).then(function (res) {
  //     if (res.errno === 0) {
  //       that.setData({
  //         helpKeyword: res.data
  //       });
  //     }
  //   });
  // },
  // clearHistory: function () {
  //   this.setData({
  //     historyKeyword: []
  //   })

  //   util.request(api.SearchClearHistory, {}, 'POST')
  //     .then(function (res) {
  //       console.log('清除成功');
  //     });
  // },
 

  //     //重新获取关键词
  //     that.getSearchKeyword();
  //   });
  // },
  
  



  onLoad: function () {
    this.getSearchKeyword();
  },
 
})