const router = require("koa-router")();
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { login } = require("../controller/user");
router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  if (result.username) {
    // 设置session
    ctx.session.username = result.username;
    ctx.session.realname = result.realname;
    ctx.body = new SuccessModel("登录成功");
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});


// 测试
router.get("/session-test", async (ctx, next) => {
  if (ctx.session.viewNum == null) {
    ctx.session.viewNum = 0;
  }
  ctx.session.viewNum++;
  ctx.body = {
    data: { errno: "1", viewNum: ctx.session.viewNum },
  };
});

module.exports = router;
