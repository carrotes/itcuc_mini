var remote_url = "https://www.itcuc.cc/wp-json/wp/v2/";
var remote_tkn = "https://www.itcuc.cc/wp-json/jwt-auth/v1/";
var remote = {
    posts: remote_url + "posts",
    users: remote_url + "users",
    token: remote_tkn + "token"
}

module.exports = {
    remote:remote
}