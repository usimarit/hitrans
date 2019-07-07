const client = require("./rpc_client");

const create_config_file = callback => {
  client.CreateConfigFile(null, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(response);
    }
  });
};

const get_config = callback => {
  client.GetConfigFile(null, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(response);
    }
  });
};

const write_config = (data, callback) => {
  client.WriteConfigFile(data, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(response);
    }
  });
};

module.exports = { create_config_file, get_config, write_config };
