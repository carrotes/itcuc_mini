//index.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
var Config = require('../../config.js')
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
            }
        })
    },
})
