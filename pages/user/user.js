const app = getApp();
var Config = require('../../config.js')
var util = require('../../utils/util.js');

Page({
    data:{
        userInfo: {},
        logined:false,
        currentPage:'signin',
        itcucname:'wxminifheuqo23(@#hu@$#hj',
        itcucps:'IB998f7n8$pa6I8*Vph%4s&W'
    },
    onLoad: function () {
        var token = wx.getStorageSync("token");
        if(token) {
            this.setData({logined:true,currentPage:''})
        } else {
            this.setData({ logined: false, currentPage: 'signin'})
        }
    },
    signin:function(){
        
    },
    signup:function(e){
        var Base64 = util.Base64;
        var that = this;
        var token = this.data.itcucname+":"+this.data.itcucps;
        console.log(Base64.encode(token));
        wx.request({
          url: Config.remote.users,
          header:'',
        })        
        var newUser = e.detail.value.uname;
        var newPass = e.detail.value.upwd;
        var newEmail = e.detail.value.uemail;
    },
    toSignin:function() {
        this.setData({
            currentPage:'signin'
        })
    },
    toSignup:function() {
        this.setData({
            currentPage: 'signup'
        })
    }
})
