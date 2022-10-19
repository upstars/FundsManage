const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创建数据结构
const ProfileSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    default: "",
  },
  income: {
    type: String,
    required: true,
  },
  expend: {
    type: String,
    required: true,
  },
  cash: {
    type: String,
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//mongodb创建集合
const Profile = mongoose.model("profiles", ProfileSchema);

module.exports = Profile;
