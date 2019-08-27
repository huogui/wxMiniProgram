import { config } from '../../utils/config';
import { getUserId, setValue, getValue } from '../../utils/common';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId: '',
    bannerList: [],
    config: ''
  },
  onLoad: function (options) {
    this.setData({
      config: config
    })
    var t = this;
    if (getUserId() == '') {
      wx.getUserInfo({
        success: function (res) {
          let user = res;
          let userInfo = res.userInfo;
          wx.login({
            success: function (res) {
              if (res.code) {
                //后台需要对是否绑定手机号做判断，调后台接口执行之后得逻辑（是否跳绑定手机号页，或者其他页面）
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          });
        },
        fail: function (res) {
          console.log(res)
          wx.redirectTo({
            url: '/pages/authorize/index',
          })
        }
      })
    }
    wx.getLocation({
      success(res) {
        setValue('currentAddress', res)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '定位失败'
        })
      }
    })
  },
  onShow: function () {
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})