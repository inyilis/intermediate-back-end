const db = require('../Configs/db');
const logger = require('../Helpers/logger');

const products = {};

products.get = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM public.products ORDER BY id DESC')
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

products.addProduct = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.products(nama, harga, url_img, kategori_id)
                    VALUES ('${data.nama}', ${data.harga}, '${data.url_img}', ${data.kategori_id})`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

products.updateProduct = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.products SET nama='${data.nama}', harga=${data.harga}, url_img='${data.url_img}', kategori_id=${data.kategori_id} WHERE id = ${data.id}`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

products.delProduct = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.products WHERE id = ${id}`)
    .then(() => {
      resolve('Deleted');
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

module.exports = products;
