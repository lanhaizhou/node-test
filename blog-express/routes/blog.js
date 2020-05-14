var express = require("express");
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.get("/list", loginCheck, function (req, res, next) {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  if (req.query.isadmin) {
    console.log('管理员登入')
    // 强行查询自己的博客
    author = req.session.username;
  }

  return getList(author, keyword).then((listData) => {
    res.json(new SuccessModel(listData, "成功"));
  });
});

router.get("/detail", loginCheck, (req, res, next) => {
  const { id } = req.query;
  return getDetail(id).then((data) => {
    res.json(new SuccessModel(data, "成功"));
  });
});

router.post("/new", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  return newBlog(req.body).then((data) => {
    res.json(new SuccessModel(data, "新建成功"));
  });
});

router.post("/update", loginCheck, (req, res, next) => {
  const { id } = req.query;
  return updateBlog(id, req.body).then((result) => {
    if (result) {
      res.json(new SuccessModel(result, "更新成功"));
      return;
    }
    res.json(new ErrorModel("更新失败"));
  });
});

router.post("/del", loginCheck, (req, res, next) => {
  const { id } = req.query;
  const { username } = req.session;
  return delBlog(id, username).then((result) => {
    if (result) {
      res.json(new SuccessModel(result, "删除成功"));
      return;
    }
    res.json(new ErrorModel("删除失败"));
  });
});

module.exports = router;
