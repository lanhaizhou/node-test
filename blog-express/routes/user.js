var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  return login(username, password).then((result) => {
    if (result.username) {
      // 设置session
      req.session.username = result.username;
      req.session.realname = result.realname;
      console.log("session的值", req.session);
      res.json(new SuccessModel("登录成功"));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
});

// 根据session记录访问量
router.get("/session-test", (req, res, next) => {
  const session = req.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;

  res.json({
    viewNum: session.viewNum,
  });
});

module.exports = router;
