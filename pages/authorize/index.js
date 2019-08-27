import { setValue, getValue } from '../../utils/common';

Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  getUserInfo() {
    wx.getUserInfo({
      success: function (res) {
        let user = res;
        let userInfo = res.userInfo;
        wx.login({
          success: function (res) {
            if (res.code) {
             //拿到userInfo和code传给后台登录
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      },
      fail: function (res) {
        wx.showToast({
          icon: 'fail',
          title: '授权失败'
        })
      }
    })
  }
})