const { getUser } = require("../service/auth");

async function restritToLoggedUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();

  // const userUid = req.headers["authorization"];
  // if (!userUid) return res.redirect("/login");
  // const token = userUid.split("Bearer ")[1];
  // const user = getUser(token);
}
// Login Work good
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();

  
  //Authorization
  // const userUid = req.headers["authorization"];
  // const token = userUid.split("Bearer ")[1];
  // const user = getUser(token);
  // req.user = user;
  // next();

  // function restricTo(roles = []) {
  //   return function (req, res, next) {
  //     if (!req.user) return res.redirect("./login");
  //     if (!roles.includes(req.user.roles)) return res.end("Unauthorized");
  //     next();
  //   };
}

module.exports = {
  // checkForAuthentication,
  restritToLoggedUserOnly,
  checkAuth,
  // restricTo,
};
