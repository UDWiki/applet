// 加载提示
wx.showLoading({
  title: '获取天气数据中',
})

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  // 加载事件
  onLoad: function () {
    var that = this;

    // 关闭加载中的提示框
    wx.hideLoading();

    // 获取地理位置
    wx.getLocation({
      type: 'gcj02',  // 坐标类型
      success: function (res) {
        // 	纬度，浮点数，范围为-90~90，负数表示南纬
        var lat = res.latitude;
        // 经度，浮点数，范围为-180~180，负数表示西经
        var lon = res.longitude;
        // 速度，浮点数，单位m/s
        var speed = res.speed;
        // 位置的精确度
        var accuracy = res.accuracy;

        // 根据经纬度获取城市
        that.getNameByLocation(lat, lon);
        // 获取实时状态
        that.getRealTimeStatus(lat, lon);
        // 根据经纬度获取七天城市天气
        that.getWeatherByLocation(lat, lon);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },


  /**
   * 获取实时的状况
   */
  getRealTimeStatus: function (lat, lon) {
    var that = this;
    var city = lat + ',' + lon;
    var url = 'https://api.yytianqi.com/observe?city=' + city + '&key=sfbu6g88n1u9j5n9';
    // 请求
    wx.request({
      url: url,
      success: function (res) {
        var data = res.data.data;

        var icon_num = data.numtq;
        // 是早上还是晚上
        if (that.isNight()) {
          icon_num += "_1";
        }
        else {
          icon_num += "_0";
        }

        that.setData({
          real_time: data,
          real_tq_icon: '/asset/images/icon/' + icon_num + '.png'
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },


  /**
   * 获取地理位置
   */
  getNameByLocation: function (lat, lon) {
    var that = this;
    var city = lat + ',' + lon;
    var url = 'https://api.map.baidu.com/geocoder/v2/?location=' + city + '&output=json&ak=ZE4ORURwbsleaBVyeh1MyvGD7sZm9QGg';

    // 请求
    wx.request({
      url: url,
      success: function (res) {
        var data = res.data.result;
console.log(res);
        that.setData({
          address: data.addressComponent
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }, // 获取地理位置 结束


  /**
   * 通过地理位置获取七天天气
   */
  getWeatherByLocation: function (lat, lon) {
    var that = this;
    var city = lat + ',' + lon;
    var url = 'https://api.yytianqi.com/forecast7d?city=' + city + '&key=sfbu6g88n1u9j5n9';

    // 请求
    wx.request({
      url: url,
      success: function (res) {
        var data = res.data.data;

        // 设置数据
        that.setData({
          // 城市名
          city: data.cityName,
          // 时间
          time: data.sj,
          // 列表
          list: data.list
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }, // getWeatherByLocation 结束


  /**
   * 改变地理位置
   */
  changeMap: function () {
    var that = this;

    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        // 根据经纬度获取城市
        that.getNameByLocation(res.latitude, res.longitude);
        // 获取实时状态
        that.getRealTimeStatus(res.latitude, res.longitude);
        // 根据经纬度获取七天城市天气
        that.getWeatherByLocation(res.latitude, res.longitude);
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

/**
 * 下拉刷新
 */
  onPullDownRefresh: function () {
    // 根据经纬度获取城市
    that.getNameByLocation(res.latitude, res.longitude);
    // 获取实时状态
    that.getRealTimeStatus(res.latitude, res.longitude);
    // 根据经纬度获取七天城市天气
    that.getWeatherByLocation(res.latitude, res.longitude);

    // 停止刷新
    wx.stopPullDownRefresh();
  },


  /**
   * 判断是早上还是晚上
   */
  isNight: function () {
    var now = new Date(), hour = now.getHours()
    if (hour > 18) {
      return true;
    }
    else {
      return false;
    }
  }


})
