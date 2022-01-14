var util = require('util.js')
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    color1: "gray",
    color2: "gray",
    color3: "gray",
    color4: "gray",
    color5: "gray",
    color6: "gray",
    color7: "gray",
    color9: "gray",
    color10: "gray",
    color11: "gray",
    color12: "gray",
    week: "",
    time: "",

    dateNow: "",
    activeNames: ['1'],
    name: "",
    stuNum: "",
    phone: "",
     
    messagelist:[],
    message:""
  },
  initindex: function () {
    this.setData({
      color1: "gray",
    color2: "gray",
    color3: "gray",
    color4: "gray",
    color5: "gray",
    color6: "gray",
    color7: "gray",
    color9: "gray",
    color10: "gray",
    color11: "gray",
    color12: "gray",
    week: "",
    time: "",

    dateNow: "",
    activeNames: ['1'],
    name: "",
    stuNum: "",
    phone: "",
    
    })
  },
  onChange1(event) {
    this.setData({
      name: event.detail
    });
  },
  onChange2(event) {
    this.setData({
      stuNum: event.detail
    });
  },
  onChange3(event) {
    this.setData({
      phone: event.detail
    });
  },
  getmessage(){
    db.collection("message").get()
      .then(res => {
        this.setData({
          messagelist:res.data
        })
        console.log(res)
        console.log(this.data.messagelist)
        var me=this.data.messagelist[0].message
        this.setData({
          message:me
        })
        console.log(this.data.message)
      })
  },
  inputPhoneNum: function () {
    if (this.data.phone.length === 11) {
      let checkedNum = this.checkPhoneNum(this.data.phone);
      return checkedNum;
    } else {
      wx.showToast({
        title: '手机号不正确,请输入正确格式',
        icon: 'none',
        duration: 1000
      })
      return false
    }
  },
  inputStuNum: function () {
    if (this.data.stuNum.length === 14) {
      let checkedNum = this.checkStuNum(this.data.stuNum);
      return checkedNum;
    } else {
      wx.showToast({
        title: '学号不正确,请输入正确格式',
        icon: 'none',
        duration: 1000
      })
      return false
    }
  },
  checkStuNum: function (stuNumber) {
    let str = /^\d{14}$/
    if (str.test(stuNumber)) {
      return true
    } else {
      wx.showToast({
        title: '学号不正确,请输入正确格式',
        icon: 'none',
        duration: 1000
      })
      return false
    }
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确,请输入正确格式',
        icon: 'none',
        duration: 1000
      })
      return false
    }
  },
  submit(event) {
    
    const app=getApp();
    var whichTime = this.data.message +'/'+this.data.week + '/' + this.data.time;
    if (this.data.name === "" || this.data.stuNum === "" || this.data.phone === "" || whichTime === "///") {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000
      })
    } else if (this.inputPhoneNum() === true && this.inputStuNum() === true) {
      wx.showLoading({
        title: '数据上传中',
        mask: true
      })
      db.collection("volunteer").add({
        data: {
          name: this.data.name,
          studentNumber: this.data.stuNum,
          phone: this.data.phone,
          whichTime: whichTime,
          date: db.serverDate(),
          whetherProcess: false,
          whetherGet: false
        }
      }).then(res => {
        console.log(res)
        wx.hideLoading();
        this.initindex();
      })
    }
  },
  searchVolunteerData() {
    var date = db.serverDate({
      offset: -24 * 60 * 60 * 1000
    })
    console.log(date);
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    db.collection("volunteer").where({
        date: _.gt(date)
      }).get()
      .then(res => {
        console.log(res)
        wx.hideLoading()
      })
  },

  searchBorrowData() {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    db.collection("borrow").get()
      .then(res => {
        console.log(res)
        wx.hideLoading()
      })
  },

  addVolunteerData(res) {
    wx.showLoading({
      title: '数据上传中',
      mask: true
    })
    var {
      name,
      studentNumber,
      phone,
      whichTime,
      place,
    } = res.detail.value;
    whichTime = this.data.dateNow + ' ' + this.data.time1 + '/' + this.data.time2 + '/' + this.data.time3 + '/' + this.data.time4;
    console.log(whichTime);
    var date = util.formatTime(new Date());
    db.collection("volunteer").add({
      data: {
        name: name,
        studentNumber: studentNumber,
        phone: phone,
        whichTime: whichTime,
        date: db.serverDate(),
        place: place,
        whetherProcess: false,
        whetherGet: false
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
    })
  },

  addBorrowData(res) {
    wx.showLoading({
      title: '数据上传中',
      mask: true
    })
    var {
      name,
      studentNumber,
      phone,
      whichTime,
      organization,
      reason,
      place
    } = res.detail.value;
    db.collection("borrow").add({
      data: {
        name: name,
        studentNumber: studentNumber,
        phone: phone,
        whichTime: whichTime,
        date: db.serverDate(),
        place: place,
        organization: organization,
        reason: reason,
        whetherProcess: false,
        whetherGet: false
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
    })
  },

  updateVolunteerData(doc) {
    db.collection("volunteer").doc(doc).update({
      data: {
        whetherGet: true
      }
    }).then(res => {
      console.log(res)
    })
  },

  updateBorrowData(doc) {
    db.collection("borrow").doc(doc).update({
      data: {
        whetherGet: true
      }
    }).then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmessage();
  },
  /**
   * 年月日选择器
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 时间选择
   */
  selectbutton: function (event) {
    var colorC = this;
    var id = event.currentTarget.dataset.value;
    console.log(id);
    if (id == 8) {
      colorC.setData({
        color9: "rgb(89,145,250)",
        color10: "rgb(220,220,220)",
        color11: "rgb(220,220,220)",
        color12: "rgb(220,220,220)",
        time: "8:00-10:00",
      })
    }
    if (id == 10) {
      colorC.setData({
        color9: "rgb(220,220,220)",
        color10: "rgb(89,145,250)",
        color11: "rgb(220,220,220)",
        color12: "rgb(220,220,220)",
        time: "10:00-12:00",
      })
    }
    if (id == 14) {
      colorC.setData({
        color9: "rgb(220,220,220)",
        color10: "rgb(220,220,220)",
        color11: "rgb(89,145,250)",
        color12: "rgb(220,220,220)",
        time: "14:00-16:00",
      })
    }
    if (id == 16) {
      colorC.setData({
        color9: "rgb(220,220,220)",
        color10: "rgb(220,220,220)",
        color11: "rgb(220,220,220)",
        color12: "rgb(89,145,250)",
        time: "16:00-18:00",
      })
    }
  },
  selectbutton1: function (event) {
    var colorC = this;
    var id = event.currentTarget.dataset.value;
    console.log(id);
    if (id == 1) {
      colorC.setData({
        color1: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        week: "周一",
      })
    }
    if (id == 2) {
      colorC.setData({
        color2: "rgb(89,145,250)",
        color1: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        week: "周二",
      })
    }
    if (id == 3) {
      colorC.setData({
        color3: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color1: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        week: "周三",
      })
    }
    if (id == 4) {
      colorC.setData({
        color4: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color1: "rgb(220,220,220)",
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        week: "周四",
      })
    }
    if (id == 5) {
      colorC.setData({
        color5: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        color1: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        week: "周五",
      })
    }
    if (id == 6) {
      colorC.setData({
        color6: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        color5: "rgb(220,220,220)",
        color1: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        week: "周六",
      })
    }
    if (id == 7) {
      colorC.setData({
        color7: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color1: "rgb(220,220,220)",
        week: "周日",
      })
    }
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().setData({
      active: 2
    });
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

  },

})