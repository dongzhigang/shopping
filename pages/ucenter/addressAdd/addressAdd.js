var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    address: {
      id:0,                                 //用户id
      provinceName: '',                     //省份名称
      cityName: '',                         //城市名称
      areaName: '',                         //区/县名称
      address: '',                          //详细
      name: '',                             //姓名                             
      mobile: '',                           //手机号码
      phone:'',                             //座机号码
      isDefault: 0,                         //判断是否默认，0、1
    },
    region: ['省', '市', '区/县'],          //地区数据


    addressId: 0,
    openSelectRegion: false,
    selectRegionList: [
      { id: 0, name: '省份', pid: 1, type: 1 },
      { id: 0, name: '城市', pid: 1, type: 2 },
      { id: 0, name: '区县', pid: 1, type: 3 }
    ],
    regionType: 1,
    regionList: [],
    selectRegionDone: false
  },
  /**
   * 事件函数
   */
  //获取手机数据
  bindinputMobile:function(e) {
    let address = this.data.address;
    address.mobile = e.detail.value;
    this.setData({
      address: address
    });
  },
  //获取座机数据
  bindinputPhone:function(e) {
    let address = this.data.address;
    address.phone = e.detail.value;
    this.setData({
      address: address
    });
  },
  //获取姓名数据
  bindinputName(e) {
    let address = this.data.address;
    address.name = e.detail.value;
    this.setData({
      address: address
    });
  },
  bindRegionChange: function (e){
    let area = e.detail.value;
    let provinceName = area[0];
    let cityName = area[1];
    let areaName = area[2];
    let address = this.data.address;
    address.provinceName = provinceName;
    address.cityName = cityName;
    address.areaName = areaName;
    this.setData({
      address: address
    });
    console.log(address)
  },
  //获取详细地址数据
  bindinputAddress:function(e){
    let address = this.data.address;
    address.address = e.detail.value;
    this.setData({
      address: address
    });
  },
  //获取是否默认数据
  bindIsDefault(){
    let address = this.data.address;
    address.isDefault = !address.isDefault;
    this.setData({
      address: address
    });
  },
  //保存地址
  saveAddress:function() {
    console.log(this.data.address)
    let address = this.data.address;
    if (address.name == '') {
      util.showErrorToast('请输入姓名');
      return false;
    }
    if (address.mobile == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }
    if (address.phone == '') {
      util.showErrorToast('请输入座机号码');
      return false;
    }
    if (address.address == '') {
      util.showErrorToast('请输入详细地址');
      return false;
    }
    return;
    let that = this;
    util.request(api.AddressSave, {
      id: address.id,
      name: address.name,
      mobile: address.mobile,
      provinceId: address.provinceId,
      cityId: address.cityId,
      areaId: address.areaId,
      address: address.address,
      isDefault: address.isDefault,
      provinceName: address.provinceName,
      cityName: address.cityName,
      countyName: address.areaName
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        //返回之前，先取出上一页对象，并设置addressId
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        console.log(prevPage);
        if (prevPage.route == "pages/checkout/checkout") {
          prevPage.setData({
            addressId: res.data
          })

          try {
            wx.setStorageSync('addressId', res.data);
          } catch (e) {

          }
          console.log("set address");
        }
        wx.navigateBack();
      }
    });

  },
  //取消
  cancelAddress() {
    wx.navigateBack();
  },

  getAddressDetail() {
    let that = this;
    util.request(api.AddressDetail, { id: that.data.addressId }).then(function (res) {
      if (res.errno === 0) {
        if(res.data){
            that.setData({
                address: res.data
            });
        }
      }
    });
  },
  setRegionDoneStatus() {
    let that = this;
    let doneStatus = that.data.selectRegionList.every(item => {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    })

  },
  chooseRegion() {
    let that = this;
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });

    //设置区域选择数据
    let address = this.data.address;
    if (address.provinceId > 0 && address.cityId > 0 && address.areaId > 0) {
      let selectRegionList = this.data.selectRegionList;
      selectRegionList[0].id = address.provinceId;
      selectRegionList[0].name = address.provinceName;
      selectRegionList[0].pid = 0;

      selectRegionList[1].id = address.cityId;
      selectRegionList[1].name = address.cityName;
      selectRegionList[1].pid = address.provinceId;

      selectRegionList[2].id = address.areaId;
      selectRegionList[2].name = address.areaName;
      selectRegionList[2].pid = address.cityId;

      this.setData({
        selectRegionList: selectRegionList,
        regionType: 3
      });

      this.getRegionList(address.cityId);
    } else {
      this.setData({
        selectRegionList: [
          { id: 0, name: '省份', pid: 0, type: 1 },
          { id: 0, name: '城市', pid: 0, type: 2 },
          { id: 0, name: '区县', pid: 0, type: 3 }
        ],
        regionType: 1
      })
      this.getRegionList(0);
    }

    this.setRegionDoneStatus();

  },
  selectRegionType(event) {
    let that = this;
    let regionTypeIndex = event.target.dataset.regionTypeIndex;
    let selectRegionList = that.data.selectRegionList;

    //判断是否可点击
    if (regionTypeIndex + 1 == this.data.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex-1].id <= 0)) {
      return false;
    }

    this.setData({
      regionType: regionTypeIndex + 1
    })
    
    let selectRegionItem = selectRegionList[regionTypeIndex];

    this.getRegionList(selectRegionItem.pid);

    this.setRegionDoneStatus();

  },
  selectRegion(event) {
    let that = this;
    let regionIndex = event.target.dataset.regionIndex;
    let regionItem = this.data.regionList[regionIndex];
    let regionType = regionItem.type;
    let selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 1] = regionItem;


    if (regionType != 3) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      })
      this.getRegionList(regionItem.id);
    } else {
      this.setData({
        selectRegionList: selectRegionList
      })
    }

    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 1) {
        item.id = 0;
        item.name = index == 1 ? '城市' : '区县';
        item.pid = 0;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList
    })


    that.setData({
      regionList: that.data.regionList.map(item => {

        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    });

    this.setRegionDoneStatus();

  },
  doneSelectRegion() {
    if (this.data.selectRegionDone === false) {
      return false;
    }

    let address = this.data.address;
    let selectRegionList = this.data.selectRegionList;
    address.provinceId = selectRegionList[0].id;
    address.cityId = selectRegionList[1].id;
    address.areaId = selectRegionList[2].id;
    address.provinceName = selectRegionList[0].name;
    address.cityName = selectRegionList[1].name;
    address.areaName = selectRegionList[2].name;

    this.setData({
      address: address,
      openSelectRegion: false
    });

  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });

  },
  getRegionList(regionId) {
    let that = this;
    let regionType = that.data.regionType;
    util.request(api.RegionList, { pid: regionId }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          regionList: res.data.map(item => {

            //标记已选择的
            if (regionType == item.type && that.data.selectRegionList[regionType - 1].id == item.id) {
              item.selected = true;
            } else {
              item.selected = false;
            }

            return item;
          })
        });
      }
    });
  },

  /**
   * 生命周期
   */
  //页面加载中
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }
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