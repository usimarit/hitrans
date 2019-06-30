const client = require("./zerorpc_client");

const create_config_file = callback => {
  client.invoke("create_file", error => {
    if (callback) {
      callback(error);
    }
  });
};

const get_default_config = callback => {
  client.invoke("get_default_conf", (error, res) => {
    if (error) {
      console.error(error);
      callback({});
    } else {
      callback(res);
    }
  });
};

const get_config = callback => {
  client.invoke("get_config", (error, res) => {
    if (error) {
      console.error(error);
      get_default_config(callback);
    } else {
      callback(res);
    }
  });
};

const write_config = (data, callback) => {
  client.invoke("write_config", data, error => {
    if (error) {
      console.error(error);
      callback(error);
    } else {
      if (callback) {
        callback("Successfully");
      }
    }
  });
};

module.exports = { create_config_file, get_config, write_config };
