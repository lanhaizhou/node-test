const fs = require("fs");
const path = require("path");

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + "\n"); // 关键代码
}

// 生成 write Stream
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a", // 累加
  });
  return writeStream;
}

// 写访问日志
const accessWriteSrteam = createWriteStream("access.log");
function access(log) {
  writeLog(accessWriteSrteam, log);
}

module.exports = {
  access,
};
