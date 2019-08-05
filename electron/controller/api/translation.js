const makeRequest = require("./api");

const preprocess_text = text => {
  return encodeURIComponent(text);
};

const translate = (q, config) => {
  q = preprocess_text(q);
  console.log(q);
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
