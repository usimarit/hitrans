import api_config from '../../config/api_config';
import makeRequest from './api';

export const translate = (q, target, source, format) => {
  let url =
    api_config.TRANS_URL +
    '?q=' +
    q +
    '&target=' +
    target +
    '&source=' +
    source +
    '&format=' +
    format +
    '&model=' +
    api_config.MODEL +
    '&key=' +
    api_config.API_KEY;
  return makeRequest(url, {
    method: 'POST',
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
