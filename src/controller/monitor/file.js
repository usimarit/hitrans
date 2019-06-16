import client from './py_connection';

export const create_config_file = callback => {
  client.invoke('create_file', error => {
    if (error) {
      console.error(error);
      return;
    } else {
      if (callback) {
        callback();
      }
    }
  });
};

export const get_default_config = callback => {
  client.invoke('get_default_conf', (error, res) => {
    if (error) {
      console.error(error);
      callback({});
    } else {
      callback(res);
    }
  });
};

export const get_config = callback => {
  client.invoke('get_config', (error, res) => {
    if (error) {
      console.error(error);
      get_default_config(callback);
    } else {
      callback(res);
    }
  });
};

export const write_config = (data, callback) => {
  client.invoke('write_config', data, error => {
    if (error) {
      console.error(error);
      return;
    } else {
      if (callback) {
        callback();
      }
    }
  });
};
