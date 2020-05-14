const { ErrorModel } = require("../model/resModel");

module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  console.log('当前用户未登录')
  res.json(new ErrorModel("未登录"));
};
