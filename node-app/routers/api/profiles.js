const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../modules/Profile");

/**
 * 添加信息
 *POST /api/profiles/add
 */
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then((profile) => {
      res.json(profile);
    });
  }
);

/**
 * 获取所有信息
 *GET /api/profiles/
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("没有任何内容!");
        }
        res.json(profile);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
  }
);

/**
 * 获取单个信息
 *GET /api/profiles/:id
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("没有任何内容!");
        }
        res.json(profile);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
  }
);

/**
 * 编辑信息
 *PUT /api/profiles/edit/:id
 */
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    ).then((profile) => {
      res.json(profile);
    });
  }
);

/**
 * 删除信息
 *DELETE /api/profiles/delete
 */
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then((profile) => res.json(profile))
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
