const bcr = require('bcrypt');

const hashPswd = async (pswd) => {
  try {
    const salt = await bcr.genSalt(9);
    const result = await bcr.hash(pswd, salt);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = hashPswd;
