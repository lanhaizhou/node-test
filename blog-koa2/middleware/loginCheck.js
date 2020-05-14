const { ErrorModel } = require("../model/resModel");

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }
  console.log("当前用户未登录");
  ctx.body = new ErrorModel("未登录");
};
