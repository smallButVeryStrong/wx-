//index.js
//获取应用实例
const app = getApp()

const commonObj = require('../static/common.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../test/test'
    })
  },
  //上传图片处理函数
  doUpload:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(333)
        console.log(res)
        setTimeout(function(){
          wx.showToast({
            title: '成功',
            icon: "success",
            duration: 2000
          })
        },300)
      },
      fail: function (e) {
        wx.showToast({
          title: '失败',
          icon: "",
          duration: 2000
        })
      }
    })
  },
  onLoad: function () {
    console.log(this.route)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo1: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login:function(){
    wx.login({
      success:function(res){
        console.log(res)
        if( res.code ){
          //调用后台接口 将code传递给后台 后台获取openid
        }
      }
    })
  },
  //下拉刷新
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();//显示下拉刷新动画
    setTimeout(function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },2000)
  },

  //转发处理函数 分享
  onShareAppMessage:function(){
    return{ 
      title: '标题',
      path: 'www.baidu.com'
    }
  },
  //抽离出公用的js
  common:function(){
    commonObj.commonFun()
  }


  
})
