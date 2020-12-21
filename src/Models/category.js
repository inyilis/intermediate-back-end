const db = require('../Configs/db');
const logger = require('../Helpers/logger');

const category = {};

category.get = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM public.category ORDER BY id ASC')
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

category.addCategory = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.category(tipe) VALUES ('${data.tipe}')`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

category.updateCategory = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.category SET tipe='${data.tipe}' WHERE id = ${data.id}`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

category.delCategory = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.category WHERE id = ${id}`)
    .then(() => {
      resolve('Deleted');
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

module.exports = category;
