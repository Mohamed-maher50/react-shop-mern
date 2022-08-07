const bcrypt = require("bcrypt");
module.exports.hashPasswrod = async (password) => {
  const genSalt = await bcrypt.genSalt();
  return bcrypt.hash(password, genSalt);
};
module.exports.comparePassword = (password, hashPasswrod) => {
  return bcrypt.compare(password, hashPasswrod);
};
