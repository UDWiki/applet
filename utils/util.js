function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

/**
 * 获取位置
 */
function getLocation(callback) 
{
  wx.getLocation({
    success: function (res) {
      callback(true, res.latitude, res.longitude);
    },
    fail: function () {
      callback(false);
    }
  })
}

/**
 * 获取天气预报
 */
function getWether(city="南宁")
{
    // 发起一个天气请求
    wx.request({
      url: 'http://www.sojson.com/open/api/weather/json.shtml?city=' + city,
      success: function (res) {
        console.log(res);
      }
    });
}