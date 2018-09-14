// 以下是业务服务器API地址
// 本机开发时使用
// var WxApiRoot = 'http://127.0.0.1/';
// 局域网测试使用
let WxApiRoot = 'http://192.168.1.22/';
// 云平台部署时使用
// 云平台上线时使用

module.exports = {
  WxApiRoot: WxApiRoot,
  IndexUrl: WxApiRoot + 'shoppingAdmin/index/Home/index', //首页数据接口
  CatalogList: WxApiRoot + 'shoppingAdmin/index/Cassification/catalogList', //分类目录全部分类数据接口
  CatalogCurrent: WxApiRoot + 'shoppingAdmin/index/Cassification/current', //分类目录当前分类数据接口

  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthRegister: WxApiRoot + 'auth/register', //账号注册
  AuthReset: WxApiRoot + 'auth/reset', //账号密码重置
  AuthRegisterCaptcha: WxApiRoot + 'auth/regCaptcha', //验证码
  AuthBindPhone: WxApiRoot + 'auth/bindPhone', //绑定微信手机号

  GoodsCount: WxApiRoot + 'shoppingAdmin/index/Product/productCount', //统计商品总数
  GoodsList: WxApiRoot + 'shoppingAdmin/index/Product/productList', //获得商品列表
  GoodsCategory: WxApiRoot + 'shoppingAdmin/index/Product/currentList', //获得分类数据
  GoodsDetail: WxApiRoot + 'shoppingAdmin/index/product/getProductInfo', //获得商品的详情
  GoodsNew: WxApiRoot + 'shoppingAdmin/index/Goods/newGoods', //新品
  GoodsHot: WxApiRoot + 'goods/hot', //热门
  GoodsRelated: WxApiRoot + 'goods/related', //商品详情页的关联商品（大家都在看）

  BrandList: WxApiRoot + 'shoppingAdmin/index/Brands/brandList', //品牌列表
  BrandDetail: WxApiRoot + 'shoppingAdmin/index/Brands/brandInfo', //品牌详情

  CartList: WxApiRoot + 'shoppingAdmin/index/Shopcar/carList', //获取购物车的数据
  CartAdd: WxApiRoot + 'shoppingAdmin/index/Shopcar/addCart', // 添加商品到购物车
  CartFastAdd: WxApiRoot + 'cart/fastadd', // 立即购买商品
  CartUpdate: WxApiRoot + 'shoppingAdmin/index/Shopcar/updateCar', // 更新购物车的商品
  CartDelete: WxApiRoot + 'shoppingAdmin/index/Shopcar/deleteCar', // 删除购物车的商品
  CartChecked: WxApiRoot + '', // 选择或取消选择商品
  CartGoodsCount: WxApiRoot + 'shoppingAdmin/index/Shopcar/cartCount', // 获取购物车商品件数
  CartCheckout: WxApiRoot + 'shoppingAdmin/index/Shopcar/cartCheckout', // 下单前信息确认

  CollectList: WxApiRoot + 'collect/list', //收藏列表
  CollectAddOrDelete: WxApiRoot + 'collect/addordelete', //添加或取消收藏

  CommentList: WxApiRoot + 'shoppingAdmin/index/Comments/commentList', //评论列表
  CommentCount: WxApiRoot + 'shoppingAdmin/index/Comments/commentCount', //评论总数
  CommentPost: WxApiRoot + 'comment/post', //发表评论

  TopicList: WxApiRoot + 'topic/list', //专题列表
  TopicDetail: WxApiRoot + 'topic/detail', //专题详情
  TopicRelated: WxApiRoot + 'topic/related', //相关专题

  SearchIndex: WxApiRoot + 'shoppingAdmin/index/Keyword/hotKeyword', //搜索关键字
  SearchResult: WxApiRoot + 'search/result', //搜索结果
  SearchHelper: WxApiRoot + 'search/helper', //搜索帮助
  SearchClearHistory: WxApiRoot + 'search/clearhistory', //搜索历史清楚

  AddressList: WxApiRoot + 'shoppingAdmin/index/Addresss/addressList', //收货地址列表
  AddressDetail: WxApiRoot + 'shoppingAdmin/index/Addresss/detailAddress', //收货地址详情
  AddressSave: WxApiRoot + 'shoppingAdmin/index/Addresss/addAddress', //保存收货地址
  AddressDelete: WxApiRoot + 'shoppingAdmin/index/Addresss/delAddress', //删除收货地址

  ExpressQuery: WxApiRoot + 'express/query', //物流查询

  RegionList: WxApiRoot + 'region/list', //获取区域列表

  OrderSubmit: WxApiRoot + 'order/submit', // 提交订单
  OrderPrepay: WxApiRoot + 'order/prepay', // 订单的预支付会话
  OrderList: WxApiRoot + 'order/list', //订单列表
  OrderDetail: WxApiRoot + 'order/detail', //订单详情
  OrderCancel: WxApiRoot + 'order/cancel', //取消订单
  OrderRefund: WxApiRoot + 'order/refund', //退款取消订单
  OrderDelete: WxApiRoot + 'order/delete', //删除订单
  OrderConfirm: WxApiRoot + 'order/confirm', //确认收货
  OrderComment: WxApiRoot + 'order/comment', // 代评价商品信息

  FeedbackAdd: WxApiRoot + 'feedback/submit', //添加反馈
  FootprintList: WxApiRoot + 'footprint/list', //足迹列表
  FootprintDelete: WxApiRoot + 'footprint/delete', //删除足迹

  UserFormIdCreate: WxApiRoot + 'formid/create', //用户FromId，用于发送模版消息

  GroupOn: WxApiRoot + 'groupon/query', //团购API-查询
  GroupOnMy: WxApiRoot + 'groupon/my', //团购API-我的团购
  GroupOnDetail: WxApiRoot + 'groupon/detail', //团购API-详情
  GroupOnJoin: WxApiRoot + 'groupon/join', //团购API-详情
  StorageUpload: WxApiRoot + 'storage/upload' //图片上传
};