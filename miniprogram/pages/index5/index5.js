var util=require('util.js')
const db = wx.cloud.database();
const _ = db.command;
let id = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    color:"red",
    volunteerdata:[],
    activeNames: ['1'],
    borrowdata:[],
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    message:"",
  },
  onChange1(event) {
    this.setData({
      message: event.detail
    });
    console.log(this.data.message)
  },
  submit:function(){
    wx.showLoading({
      title: '数据上传中',
      mask: true
    })
    db.collection("message").add({
      data: {
        message: this.data.message,
        date: db.serverDate(),
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading();
      this.setData({
        message:"",
      })
    })
  },
  addVolunteerTime(){
    
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':      
          instance.close();
        break;
    }
  },
  searchVolunteerData(){
    let that=this

      wx.showLoading({
        title: '数据加载中',
        mask:true
      })
      db.collection("volunteer").orderBy('date', 'desc').get({
        success(res){
          console.log("查询成功",res)
          wx.hideLoading()
          that.setData({
            volunteerdata:res.data
          })
        }
      })
    },

  searchBorrowData(){
    let that=this
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    db.collection("borrow").orderBy('date', 'desc').get({
      success(res){
        console.log("查询成功",res)
        wx.hideLoading()
        that.setData({
          borrowdata:res.data
        })
      }
    })
    },
    
    delVolunteerData(event){
      id = event.target.dataset.jujue
      console.log(id)
      wx.cloud.callFunction({
        name:'delvolunteerdata',
        data:{
          _id:id,
          whetherGet:true,
        },
        success:function(res){
          console.log("chenggong",res)
        },
        fail:console.error
    })
    this.jumpindex();
   // this.onShow();
    },

    delBorrowData(event){
      id = event.target.dataset.jujue
      console.log(id)
      wx.cloud.callFunction({
        name:'delborrowdata',
        data:{
          _id:id,
          whetherGet:true,
        },
        success:function(res){
          console.log("chenggong",res)
        },
        fail:console.error
    })
    this.jumpindex();
   // this.onShow();
},

  updateVolunteerData(event){
    console.log(event.target.dataset.luyong)
    id = event.target.dataset.luyong
    console.log(id)
    wx.cloud.callFunction({
      name:'updvolunteerdata',
      data:{
        _id:id,
        whetherGet:true,
        whetherProcess:true
      },
      success:function(res){
        console.log("chenggong",res)
      },
      fail:console.error
    })
    this.jumpindex();
   // this.onShow();
  },

  updateBorrowData(event){
    console.log(event.target.dataset.luyong)
    id = event.target.dataset.luyong
    console.log(id)
    wx.cloud.callFunction({
      name:'updborrowdata',
      data:{
        _id:id,
        whetherGet:true,
        whetherProcess:true
      },
      success:function(res){
        console.log("chenggong",res)
      },
      fail:console.error
    })
    this.jumpindex();
   // this.onShow();
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  
  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },
  
  onShow(){
    let that=this

    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    db.collection("volunteer").orderBy('date', 'desc').get({
      success(res){
        console.log("查询成功",res)
        wx.hideLoading()
        that.setData({
          volunteerdata:res.data
        })
      }
    });

    db.collection("borrow").orderBy('date', 'desc').get({
      success(res){
        console.log("查询成功",res)
        wx.hideLoading()
        that.setData({
          borrowdata:res.data
        })
      }
    })

  },

  
jumpindex:function(){
  wx.navigateTo({
    url:'../index5/index5'
  })
}

})
