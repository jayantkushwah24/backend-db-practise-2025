// 6.
export const consoleLog = function (req, res, next) {
  console.log(req.method + "  " + req.url);
  next();
};
