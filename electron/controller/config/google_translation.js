const lang = [
  {
    name: "Auto detect language",
    value: "auto"
  },
  {
    name: "English",
    value: "en"
  },
  {
    name: "Vietnamese",
    value: "vi"
  }
];

const lookup_lang = {
  auto: "Auto detect language",
  en: "English",
  vi: "Tiếng Việt",
  fr: "French",
  kr: "한국어"
};

const engine = [
  {
    name: "Neural Machine Translation",
    value: "nmt"
  },
  {
    name: "Phrase-Based Machine Translation ",
    value: "pbmt"
  }
];

const version = [
  {
    name: "Version  1",
    value: "v1"
  },
  {
    name: "Version 2",
    value: "v2"
  }
];

module.exports = { lang, version, engine, lookup_lang };
