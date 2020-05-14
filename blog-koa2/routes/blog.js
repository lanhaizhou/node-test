const router = require("koa-router")();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");
router.prefix("/api/blog");

router.get("/list", async (ctx, next) => {
  let author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";
  if (ctx.query.isadmin) {
    console.log("管理员登入");
    // 管理员界面
    if (ctx.session.username == null) {
      // 未登录
      ctx.body = new ErrorModel("未登录");
      return;
    }
    // 强行查询自己的博客
    author = ctx.session.username;
  }
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData, "成功");
});

router.get("/detail", async (ctx, next) => {
  const { id } = ctx.query;
  const data = await getDetail(id);
  ctx.body = new SuccessModel(data, "成功");
});

router.post("/new", async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body = new SuccessModel(data, "新建成功");
});

router.post("/update", async (ctx, next) => {
  const { id } = ctx.query;
  const body = ctx.request.body
  const result = await updateBlog(id, body);
  if (result) {
    ctx.body = new SuccessModel(result, "更新成功");
    return;
  }
  ctx.body = new ErrorModel("更新失败");
});

router.post("/del", async (ctx, next) => {
  const { id } = ctx.query;
  const { username } = ctx.session;
  const result = await delBlog(id, username);
  if (result) {
    ctx.body = new SuccessModel(result, "删除成功");
    return;
  }
  ctx.body = new ErrorModel("删除失败");
});

module.exports = router;
