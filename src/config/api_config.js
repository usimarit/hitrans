const URL = 'https://translation.googleapis.com';

const TRANS_URL = URL + '/language/translate/';

export const lang = [
  {
    name: 'Auto detect languages',
    value: 'auto',
  },
  {
    name: 'English',
    value: 'en',
  },
];

export const engine = [
  {
    name: 'Neural Network',
    value: 'nmt',
  },
  {
    name: 'Base Line',
    value: 'bl',
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
