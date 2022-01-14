var util = require('util.js')
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time1: "",
    time2: "",
    time3: "",
    time4: "",
    pl1: "true",
    color1: "gray",
    color2: "gray",
    color3: "gray",
    color4: "gray",

    color5: "gray",
    color6: "gray",
    color7: "gray",
    color8: "gray",

    color9: "gray",
    color10: "gray",
    color11: "gray",
    color12: "gray",

    day: "xxxx-xx-xx",
    pop: "x",
    time: "xx:xx-xx:xx",
    activeNames: ['1'],

    dis: "false",

    name: "",
    stuNum: "",
    phone: "",
    organ: "",
    reason: "",
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
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
  onChange4(event) {
    this.setData({
      organ: event.detail
    });
  },
  onChange5(event) {
    this.setData({
      reason: event.detail
    });
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
    if (this.data.name === "" || this.data.stuNum === "" || this.data.phone === "" || this.data.organ === "" || this.data.reason === "" || this.data.time === "" || this.data.pop === "" || this.data.day === "") {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000
      })
    } else if (this.inputPhoneNum() === true&&this.inputStuNum() === true) {
      wx.showLoading({
        title: '数据上传中',
        mask: true
      })
      var whichTime = this.data.day + "/" + this.data.time;
      db.collection("borrow").add({
        data: {
          name: this.data.name,
          studentNumber: this.data.stuNum,
          phone: this.data.phone,
          whichTime: whichTime,
          date: db.serverDate(),
          place: this.data.pop,
          organization: this.data.organ,
          reason: this.data.reason,
          whetherProcess: false,
          whetherGet: false
        }
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        this.initindex();
      })
    }
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
      color8: "gray",

      color9: "gray",
      color10: "gray",
      color11: "gray",
      color12: "gray",

      day: "xxxx-xx-xx",
      pop: "x",
      time: "xx:xx-xx:xx",
      activeNames: ['1'],

      dis: "false",

      name: "",
      stuNum: "",
      phone: "",
      organ: "",
      reason: "",
    })
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
      place
    } = res.detail.value;
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
      stuNum,
      phone,
      whichTime,
      organ,
      reason,
      pop,
    } = res.detail.value;
    place = this.data.pop;
    whichTime = this.data.day + "/" + this.data.time;
    db.collection("borrow").add({
      data: {
        name: name,
        studentNumber: stuNum,
        phone: phone,
        whichTime: whichTime,
        date: db.serverDate(),
        place: pop,
        organization: organ,
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
    var time = this;
    this.setData({
      time1: this.getDateStr(null, 1),
      time2: this.getDateStr(null, 2),
      time3: this.getDateStr(null, 3),
      time4: this.getDateStr(null, 4),
    });
  },
  /**
   * 获取特定时间
   */
  getDateStr: function (today, addDayCount) {
    var date;
    if (today) {
      date = new Date(today);
    } else {
      date = new Date();
    }
    date.setDate(date.getDate() + addDayCount); //获取AddDayCount天后的日期 
    var m = date.getMonth() + 1; //获取当前月份的日期 
    var d = date.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    console.log(m + "-" + d)
    return m + "-" + d;
  },
  /**
   * 选择按钮
   */
  selectbutton: function (event) {
    var colorC = this;
    var id = event.currentTarget.dataset.value;
    var year = new Date().getFullYear();
    console.log(id);
    if (id == 1) {
      let day = year + '-' + this.getDateStr(null, 1);
      colorC.setData({
        color1: "rgb(89,145,250)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        day: day,
      })
    };
    if (id == 2) {
      let day = year + '-' + this.getDateStr(null, 2);
      colorC.setData({
        color1: "rgb(220,220,220)",
        color2: "rgb(89,145,250)",
        color3: "rgb(220,220,220)",
        color4: "rgb(220,220,220)",
        day: day,
      })
    };
    if (id == 3) {
      let day = year + '-' + this.getDateStr(null, 3);
      colorC.setData({
        color1: "rgb(220,220,220)",
        color2: "rgb(220,220,220)",
        color3: "rgb(89,145,250)",
        color4: "rgb(220,220,220)",
        day: day,
      })
    };
    if (id == 4) {
      let day = year + '-' + this.getDateStr(null, 4);
      colorC.setData({
        color1: "rgb(220,220,220)",
        color2: "rgb(220,220,220)",
        color3: "rgb(220,220,220)",
        color4: "rgb(89,145,250)",
        day: day,
      })
    };
  },

  selectbutton1: function (event) {
    var colorC = this;
    var id = event.currentTarget.dataset.value;
    console.log(id);
    if (id == 2) {
      colorC.setData({
        color5: "rgb(89,145,250)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        color8: "rgb(220,220,220)",
        pop: "2人座",
      })
    }
    if (id == 4) {
      colorC.setData({
        color5: "rgb(220,220,220)",
        color6: "rgb(89,145,250)",
        color7: "rgb(220,220,220)",
        color8: "rgb(220,220,220)",
        pop: "4人座",
      })
    }
    if (id == 8) {
      colorC.setData({
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(89,145,250)",
        color8: "rgb(220,220,220)",
        pop: "8人座",
      })
    }
    if (id == 10) {
      colorC.setData({
        color5: "rgb(220,220,220)",
        color6: "rgb(220,220,220)",
        color7: "rgb(220,220,220)",
        color8: "rgb(89,145,250)",
        pop: "10人以上",
      })
    }
  },

  selectbutton2: function (event) {
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
      active: 1
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