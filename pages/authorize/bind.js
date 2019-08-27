import Toast from '/vant-weapp/toast/toast';
import Notify from '/vant-weapp/notify/notify';
import { setValue, getValue } from '../../utils/common';
import md5 from '../../utils/md5';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    currentTime: 60,
    isSend: true,
    timing: false,
    againSend: false,
    verificationCode: '',
    phone: '',
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
  },
  login: function () {
    let that = this;
    if (!that.data.phone) {
      Notify('请输入手机号码！')
      return
    } else {
      if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
        Notify('手机号码输入错误！');
      } else {
        if (!that.data.verificationCode) {
          Notify('验证码不能为空！')
        } else {
          let userInfo = getValue('userInfo')
         //调后台绑定手机号
        }
      }
    }
  },
  //验证码倒计时函数
  getCode: function (options) {
    let that = this;
    if (!that.data.phone) {
      Notify('请输入手机号码!');
    } else {
      if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
        Notify('手机号码输入错误！');
      } else {
        let userInfo = getValue('userInfo');
        console.log(userInfo)
        if (!that.data.isLoading) {
          that.setData({ isLoading: true })
          let ts = new Date().getTime(),
            key = md5('Header-Agent' + ts);
          //调后台发送验证码
          //.then(res => {
            Notify({
              text: '验证码发送成功！',
              duration: 1000,
              selector: '#van-error',
              backgroundColor: 'rgba(144,195,31,1)'
            });
            that.setData({
              isSend: false,
              timing: true,
              againSend: false,
              isLoading: false
            })
            let currentTime = that.data.currentTime;
            that.setData({
              time: currentTime + '秒'
            })
            let interval = setInterval(function () {
              that.setData({
                time: (currentTime - 1) + '秒'
              })
              currentTime--;
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  timing: false,
                  againSend: true,
                  currentTime: 60,
                  disabled: false
                })
              }
            }, 1000)
          //})
        }
      }
    }
  },
  codeOnchange: function (e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },
  phoneOnchange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  }
})