var util=require('util.js')
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  searchVolunteerData(){
      var date=db.serverDate({
        offset: -24* 60 * 60 * 1000
      })
      console.log(date);
      wx.showLoading({
        title: '数据加载中',
        mask:true
      })
      db.collection("volunteer").where(
        {
         date:_.gt(date)
        }
      ).get()
      .then(res=>{
        console.log(res)
        wx.hideLoading()
      })
    },

  searchBorrowData(){
      wx.showLoading({
        title: '数据加载中',
        mask:true
      })
      db.collection("borrow").get()
      .then(res=>{
        console.log(res)
        wx.hideLoading()
      })
    },

  addVolunteerData(res){
    wx.showLoading({
      title: '数据上传中',
      mask:true
    })
    var {name,studentNumber,phone,whichTime,place}=res.detail.value;
    var date = util.formatTime(new Date());
    db.collection("volunteer").add({
      data:{
        name:name,
        studentNumber:studentNumber,
        phone:phone,
        whichTime:whichTime,
        date:db.serverDate(),
        place:place,
        whetherProcess:false,
        whetherGet:false
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading()
    })
  },

  addBorrowData(res){
    wx.showLoading({
      title: '数据上传中',
      mask:true
    })
    var {name,studentNumber,phone,whichTime,organization,reason,place}=res.detail.value;
    db.collection("borrow").add({
      data:{
        name:name,
        studentNumber:studentNumber,
        phone:phone,
        whichTime:whichTime,
        date:db.serverDate(),
        place:place,
        organization:organization,
        reason:reason,
        whetherProcess:false,
        whetherGet:false
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading()
    })
  },

  updateVolunteerData(doc){
    db.collection("volunteer").doc(doc).update({
      data:{
        whetherGet:true
      }
    }).then(res=>{
      console.log(res)
    })
  },
    
  updateBorrowData(doc){
    db.collection("borrow").doc(doc).update({
      data:{
        whetherGet:true
      }
    }).then(res=>{
      console.log(res)
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