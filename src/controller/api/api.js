const makeRequest = (url, options) => {
  const newUrl = url;
  console.log(newUrl);
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  console.log(options);
  return fetch(newUrl, options)
    .then(response => {
      // DELETE and 204 do not return data by default
      // Using json will report error
      console.log(response);
      if (/*options.method === "DELETE" || */ response.status === 204) {
        return response.text();
      } else if (options.method === 'HEAD') {
        return response.status;
      }
      return response.json();
    })
    .catch(e => {
      console.log(e);
    });
};

export const makeFormDataRequest = (url, options) => {
  const newUrl = url;
  console.log(newUrl);
  //options.headers = {
  //  'Content-Type': 'multipart/form-data',
  //};
  console.log(options);
  return fetch(newUrl, options)
    .then(response => {
      // DELETE and 204 do not return data by default
      // Using json will report error
      console.log(response);
      if (/*options.method === "DELETE" || */ response.status === 204) {
        return response.text();
      } else if (options.method === 'HEAD') {
        return response.status;
      }
      return response.json();
    })
    .catch(e => {
      console.log(e);
    });
};

export default makeRequest;
