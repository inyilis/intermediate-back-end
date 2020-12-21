const bcr = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../Models/users');
const respon = require('../Helpers/respon');
const logger = require('../Helpers/logger');

const Auth = {};

const setToken = async (mail, roles) => {
  try {
    const payload = {
      email: mail,
      role: roles,
    };

    const tokens = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '180s' });

    const result = {
      msg: 'Token Created',
      token: tokens,
    };

    return result;
  } catch (error) {
    // throw error
    logger.error(error);
    return error;
  }
};

Auth.login = async (req, res) => {
  try {
    const userDB = await model.getByEmail(req.body.email);
    const passUser = req.body.pswd;

    if (userDB.length === undefined) {
      logger.error('Email belum terdaftar');
      return respon(res, 200, { msg: 'Email belum terdaftar' });
    }

    const cek = await bcr.compare(passUser, userDB[0].pswd);
    if (cek) {
      const result = await setToken(req.body.email, userDB[0].role);
      return respon(res, 200, result);
    }
    logger.error('Anda gagal Login, password salah');
    return respon(res, 200, { msg: 'Anda gagal Login, password salah' });
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

module.exports = Auth;
