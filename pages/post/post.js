//index.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
var Config = require('../../config.js');
var util = require('../../utils/util.js');
Page({
    data: {
        id:'',
        title:'',
        post:{},
        repliesUrl:'',
        replies:[],
        authorUrl:'',
        author:[]
    },
    onLoad: function (option) {
        var that = this;
        var id = option.id;
        that.setData({
            id:id
        })

        wx.request({
            url: Config.remote.posts + "/" + id,
            method: "GET",
            success: function (res) {
                that.setData({
                    post: res.data,
                    repliesUrl: res.data._links.replies,
                    authorUrl: res.data._links.author,
                    title: res.data.title.rendered
                });
                wx.setNavigationBarTitle({
                  title: res.data.title.rendered
                })
                var article = res.data.content.rendered;
                WxParse.wxParse('article', 'html', article, that,5);
                var urls = that.data.authorUrl;
                if(urls) {
                    for(var i in urls) {
                        var authors = that.data.author;
                        wx.request({
                            url:urls[i].href,
                            success:res=>{
                                authors.push(res.data.name);
                                that.setData({
                                    author:authors
                                })
                            }
                        })
                    }
                }
                var repliesUrls = that.data.repliesUrl;
                if(repliesUrls) {
                    for(var i in repliesUrls) {
                        var replies = that.data.replies;
                        wx.request({
                            url: repliesUrls[i].href,
                            success:res=>{
                                var repliyList = res.data;
                                for(var j in repliyList) {
                                    var text = util.delHtmlTag(repliyList[j].content.rendered);
                                    repliyList[j].text = text;
                                    replies.push(repliyList[j])
                                    that.setData({
                                        replies: replies
                                    })
                                }
                            }
                        })
                    }
                }
            }
        })
    },
    reply:function (e) {
        var replyText = e.detail.value.reply;
        var msgAlert = '请登陆后再操作';
        if(!replyText) {
            msgAlert = '请输入回复内容';
        }
        wx.showModal({
            title: '回复失败',
            content: msgAlert,
            confirmText: "继续",
            cancelText: "取消",
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击主操作')
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });
    }
})
