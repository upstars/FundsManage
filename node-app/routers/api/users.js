const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//密码加密
const bcrypt = require("bcrypt");
const { secretOrKey } = require("../../config/db");

const User = require("../../modules/User");

/**
 * 注册
 * POST /api/users/register
 */
router.post("/register", (req, res) => {
  //查询数据库中是否已经存在该邮箱
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("邮箱已被注册!");
    } else {
      //用户头像
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //创建新用户
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity,
      });

      //密码加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //将用户数据存到mongodb
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

/**
 * 登录
 * POST /api/users/login
 */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.send({
        code: 500,
        msg: "用户不存在",
      });
    } else {
      //匹配密码是否正确
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const rule = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity,
          };
          //jwt.sign("规则", "加密名字", "过期时间", "箭头函数");
          jwt.sign(rule, secretOrKey, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.send({
              code: 200,
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          return res.status(400).json("密码错误!");
        }
      });
    }
  });
});

/**
 * 请求数据
 * GET /api/users/current
 * @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //passport验证token
    const data = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity,
    };
    res.send({
      code: 200,
      data,
    });
  }
);

module.exports = router;
