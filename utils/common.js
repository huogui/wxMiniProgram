import { env } from '../utils/config';

// 获取用户信息
export function getUserInfo(key = '') {
  const userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    if (key) {
      return userInfo[key];
    } else {
      return userInfo;
    }
  } else {
    return ''
  }
}

// 获取token
export function getToken() {
  let res = wx.getStorageSync(env + '_userInfo');
  if (res) {
    return res.token;
  }
  return undefined;
}

// 获取userId
export function getUserId() {
  let timestamp = wx.getStorageSync( env + '_userInfoTimestamp');
  if (!timestamp) {
    return '';
  } else {
    let diff = ((Date.parse(new Date()) / 1000) - timestamp) / (60 * 60);
    if (diff > 10) {
      console.log(diff, ' token过期');
      return '';
    }
  }

  let res = wx.getStorageSync(env + '_userInfo');
  if (res.id) {
    return res.id;
  }
  return '';
}

// 设置key、value
export function setValue(key, value) {
  wx.setStorageSync(
    env + '_' + key, value
  );
}

// 根据key获取value
export function getValue(key) {
  let res = wx.getStorageSync(env + '_' + key);
  if (res || res == 0) {
    return res;
  }
  return '';
}

export function formatDateTime(time, format) {
  var t = new Date(time);
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'YYYY':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'DD':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}