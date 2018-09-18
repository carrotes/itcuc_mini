//index.js
//获取应用实例
const app = getApp()
var Config = require('../../config.js')
var ImageUtil = require('../../utils/imageUtil.js')
var util = require('../../utils/util.js')
Page({
    data: {
        list: [],
        page: 1,
        per_page: 10,
        url: Config.remote.posts,
        img: "",
        inputShowed: false,
        inputVal: "",
        loadMore: false,
        hasMore: true
    },
    onLoad: function () {
        var that = this;
        var page = that.data.page;
        var per_page = that.data.per_page;
        var search = that.data.inputVal;
        var param = {page: page, per_page: per_page, search: search};
        wx.request({
            url: Config.remote.posts,
            method: "GET",
            data: param,
            success: function (res) {
                var list = res.data;
                if (list.length < 10) {
                    that.setData({
                        hasMore: false
                    })
                }
                for (var i = 0, size = list.length; i < size; i++) {
                    var html = list[i].content.rendered;
                    var excerpt = list[i].excerpt.rendered;
                    var img = ImageUtil.image.getFirstImage(html);
                    res.data[i].img = img;
                    res.data[i].summary = util.delHtmlTag(excerpt);
                }
                that.setData({
                    list: res.data
                });
            }
        })
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
            page: 1
        });
        var that = this;
        var page = that.data.page;
        var per_page = that.data.per_page;
        var search = that.data.inputVal;
        var param = {page: page, per_page: per_page, search: search};
        wx.request({
            url: Config.remote.posts,
            method: "GET",
            data: param,
            success: function (res) {
                var list = res.data;
                if (list.length < 10) {
                    that.setData({
                        hasMore: false
                    })
                }
                for (var i = 0, size = list.length; i < size; i++) {
                    var html = list[i].content.rendered;
                    var excerpt = list[i].excerpt.rendered;
                    var img = ImageUtil.image.getFirstImage(html);
                    res.data[i].img = img;
                    res.data[i].summary = util.delHtmlTag(excerpt);
                }
                that.setData({
                    list: res.data
                });
            }
        })
    },
    onReachBottom: function () {
        var that = this;
        var hasMore = that.data.hasMore;
        if (!hasMore) {
            return;
        }
        that.setData({
            loadMore: true
        })
        var page = that.data.page + 1;
        var per_page = that.data.per_page;
        var search = that.data.inputVal;
        var param = {page: page, per_page: per_page, search: search};
        wx.request({
            url: Config.remote.posts,
            method: "GET",
            data: param,
            success: function (res) {
                var list = res.data;
                if (list.length < 10) {
                    that.setData({
                        hasMore: false
                    })
                }
                for (var i = 0, size = list.length; i < size; i++) {
                    var html = list[i].content.rendered;
                    var excerpt = list[i].excerpt.rendered;
                    var img = ImageUtil.image.getFirstImage(html);
                    res.data[i].img = img;
                    res.data[i].summary = util.delHtmlTag(excerpt);
                }
                var old = that.data.list;
                var newList = old.concat(list);
                that.setData({
                    list: newList,
                    page: page,
                    loadMore: false
                });
            }
        })

    }
})
