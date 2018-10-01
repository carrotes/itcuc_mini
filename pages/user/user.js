const app = getApp();
var Config = require('../../config.js')

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
    signup:function(){
        var at;
        var that = this;
        var param = {username:this.data.itcucname,password:this.data.itcucps};
        var jsonParam = JSON.stringify(param);
        console.log(jsonParam)
        wx.request({
            url: Config.remote.token,
            method: 'POST',
            data:jsonParam,
            success: (res) => {
                at = res.data.token;
                if(at) {
                    console.log(at);
                }
            }
        })
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
