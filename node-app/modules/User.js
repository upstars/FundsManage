const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创建用户数据结构
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    //头像
    type: String,
  },
  date: {
    //日期·
    type: Date,
    default: Date.now,
  },
  identity: {
    //身份-管理员/员工
    type: String,
    required: true,
  },
});

//mongodb创建集合
const User = mongoose.model("users", UserSchema);

module.exports = User;
