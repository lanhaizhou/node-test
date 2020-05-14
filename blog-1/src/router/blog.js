const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method; // GET? POST?
  const id = req.query.id;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";

    if (req.query.isadmin) {
      // 管理员登录界面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        return loginCheck(req);
      }
      // 强行查询自己的博客
      author = req.session.username
    }

    return getList(author, keyword).then((listData) => {
      return new SuccessModel(listData, "成功");
    });
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    return getDetail(id).then((data) => {
      return new SuccessModel(data, "成功");
    });
  }

  // 新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck(req);
    }

    req.body.author = req.session.username;
    return newBlog(req.body).then((data) => {
      return new SuccessModel(data, "新建成功");
    });
  }

  // 更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck(req);
    }
    return updateBlog(id, req.body).then((result) => {
      if (result) return new SuccessModel(result, "更新成功");
      return new ErrorModel("更新失败");
    });
  }

  // 删除一篇博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck(req);
    }
    return delBlog(id, req.session.username).then((result) => {
      if (result) return new SuccessModel(result, "删除成功");
      return new ErrorModel("删除失败");
    });
  }
};

module.exports = handleBlogRouter;
