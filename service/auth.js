const jwt = require("jsonwebtoken");
const secret = "anand";

//JWT Token
// function setUser(user) {
//   return jwt.sign(user, secret);
// }
// function getUser(token) {
//   return jwt.verify(token, secret);
// }

// Work Good Login
const sessionIdToUserMap = new Map();
function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}
function getUser(id) {
  return sessionIdToUserMap.get(id);
}
module.exports = {
  setUser,
  getUser,
};
