const elasticsearch = require('../services/elasticsearch');

module.exports = {
  postInstance(config) {
    return new Promise((resolve, reject) => {
      const { index, type, data } = config;

      const uri = '/' + index + '/' + type;
      elasticsearch
        .post(uri, {
          data,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
