// pages/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submit_btn_dis: false,
    // 表单数据
    date: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var _date = that.getNowFormatDate();

    console.log(_date);
    that.setData({
      date: _date,
    });

  },
  /**
   * 表单提交
   */
  addWork: function (e) {
    var that = this;
    var detail = e.detail.value;

    // 检查是否有空数据
    if (that.checkEmpty(detail)) {

      that.msgBox('警告', '数据不能为空');
      return false;
    }

    // 格式化数据
    var _url = 'https://work.shiguopeng.cn/ctl/add.php';
    var _data = { desc: detail.desc, qq: detail.phon, user: detail.user, date: detail.date, price: detail.pric };

    // 发送数据请求
    wx.request({
      url: _url,
      data: _data,
      header: { 'Content-Type': 'application/x-www-form-urlencoded ' },
      method: 'POST',
      success: function (res) {
        var msg = res.data.errmsg;

        that.msgBox('提示', msg);
      }
    });

  },
  msgBox: function (_title, _msg) {
    wx.showModal({
      title: _title,
      content: _msg,
    });
  },
  /**
   * 检查数据是不是空
   */
  checkEmpty: function (object) {
    for (var i in object) {
      if (object[i] == "") {
        return true;
      }

    }

    return false;
  },
  /**
   * 日期改变
   */
  changeDate: function (e) {
    // 获取修改的日期
    var _date = e.detail.value;
    // 修改数据
    this.setData({
      date: _date
    });
  },
  //获取当前时间，格式YYYY-MM-DD
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

})