const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const port = 8888;

const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");

//mongodb config
const db = require("./config/db").mongodbURL;
//connect mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//配置跨域请求cors中间件
app.use(function (req, res, next) {
  //设置允许跨域的域名
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "*");
  //跨域请求的方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else next();
});

//使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

//注册users接口
app.use("/api/users", users);
//注册profiles接口
app.use("/api/profiles", profiles);

//监听端口号
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
