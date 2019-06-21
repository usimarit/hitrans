const URL = 'https://translation.googleapis.com';

const TRANS_URL = URL + '/language/translate/';

export const lang = [
  {
    name: 'Auto detect language',
    value: 'auto',
  },
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Vietnamese',
    value: 'vi',
  },
];

export const lookup_lang = {
  auto: 'Auto detect language',
  en: 'English',
  vi: 'Tiếng Việt',
  fr: 'French',
  kr: '한국어',
};

export const engine = [
  {
    name: 'Neural Machine Translation',
    value: 'nmt',
  },
  {
    name: 'Phrase-Based Machine Translation ',
    value: 'pbmt',
  },
];

export const version = [
  {
    name: 'Version  1',
    value: 'v1',
  },
  {
    name: 'Version 2',
    value: 'v2',
  },
];

export default { URL, TRANS_URL };
