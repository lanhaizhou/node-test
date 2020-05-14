const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const handleUserRouter = (req, res) => {
  const method = req.method; // GET? POST?

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    // const { username, password } = req.query;
    return login(username, password).then((result) => {
      if (result.username) {
        // 设置session
        req.session.username = result.username;
        req.session.realname = result.realname;
        console.log("session的值", req.session);
        return new SuccessModel("登录成功");
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登录验证的测试
  // if (method === "GET" && req.path === "/api/user/login-text") {
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel({ session: req.session }, "登录成功--测试")
  //     );
  //   }
  //   return Promise.resolve(new ErrorModel("尚未登录"));
  // }
};

module.exports = handleUserRouter;
