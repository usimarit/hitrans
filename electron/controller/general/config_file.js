const client = require('./rpc_client');

const create_config_file = callback => {
  client.CreateConfigFile((err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(response.message);
    }
  });
};

const get_config = callback => {
  client.GetConfigFile((err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(response.message);
    }
  });
};

const write_config = (data, callback) => {
  client.WriteConfigFile(data, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(response.message);
    }
  });
};

module.exports = { create_config_file, get_config, write_config };
