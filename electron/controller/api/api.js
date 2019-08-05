const fetch = require("node-fetch");

const makeRequest = (url, options) => {
  const newUrl = url;
  console.log(newUrl);
  options.headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  return fetch(newUrl, options)
    .then(response => {
      // DELETE and 204 do not return data by default
      // Using json will report error
      if (/*options.method === "DELETE" || */ response.status === 204) {
        return response.text();
      } else if (options.method === "HEAD") {
        return response.status;
      }
      return response.json();
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = makeRequest;
