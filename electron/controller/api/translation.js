const makeRequest = require("./api");

const translate = (q, config) => {
  let url =
    config.trans_url +
    config.version +
    "?q=" +
    q +
    "&target=" +
    config.target_lang +
    "&format=text" +
    "&model=" +
    config.model +
    "&key=" +
    config.api_key;
  if (config.source_lang !== "auto") {
    url += "&source=" + config.source_lang;
  }
  return makeRequest(url, {
    method: "POST"
  })
    .then(res => {
      if (res.data) {
        return res.data.translations[0].translatedText;
      } else return res;
    })
    .catch(e => {
      console.error(e);
    });
};

module.exports = translate;
