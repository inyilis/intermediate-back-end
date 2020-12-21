const jwt = require('jsonwebtoken');
const respon = require('../Helpers/respon');

const checkToken = (role) => (req, res, next) => {
  const { authtoken } = req.headers;
  let isAcc = false;

  if (!authtoken) {
    return respon(res, 401, { msg: 'Login dulu!' });
  }

  jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
    if (err) {
      return respon(res, 401, err);
    }
    role.map((value) => {
      if (value === decode.role) {
        isAcc = true;
      }
    });
    if (isAcc) {
      return next();
    }
    return respon(res, 404, { msg: 'Not Found' });
  });
};

module.exports = checkToken;
