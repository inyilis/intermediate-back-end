const db = require('../Configs/db');
const logger = require('../Helpers/logger');

const history = {};

history.get = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM public.history ORDER BY id DESC')
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({ msg: 'Data Kosong' });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

history.addHistory = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.history(nama, total, kasir) VALUES ('${data.nama}', ${data.total}, '${data.kasir}')`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

history.delHistory = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.history WHERE id = ${id}`)
    .then(() => {
      resolve('Deleted');
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

module.exports = history;
