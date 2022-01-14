// miniprogram/pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist:["zwh","ll"],
    password:["123","520"],
    user:"",
    passw:""
  },
  onJudge:function(){
    if(this.data.user==this.data.userlist[0]||this.data.user==this.data.userlist[1]){
      if(this.data.passw==this.data.password[0]||this.data.passw==this.data.password[1]){
        this.jumpindex();
      } else {
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 1000//持续的时间
        })
      } 
    }else {
      wx.showToast({
        title: '账号错误',
        icon: 'none',
        duration: 1000//持续的时间
      })
    }
  },
  onChange1(event) {
    this.setData({
      user: event.detail
    });
  },
  onChange2(event) {
    this.setData({
      passw: event.detail
    });
  },
  jumpindex:function(){
    wx.navigateTo({
      url:'../index5/index5'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})