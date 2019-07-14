from appdirs import user_config_dir

HOST = 'tcp://0.0.0.0:'
SVR_ADDR = HOST + '1234'
CLT_ADDR = HOST + '1235'

APPNAME = 'hitrans'
CONFIG_PATH = user_config_dir(APPNAME)
CONFIG_FILE = "{}/{}".format(CONFIG_PATH, 'config.json')
DEFAULT_CONF = {
  'configurations': {
    'trans_url': 'https://translation.googleapis.com/language/translate/',
    'source_lang': 'auto',
    'target_lang': 'en',
    'api_key': 'This is Google API Key',
    'model': 'nmt',
    'version': 'v2'
  },
  'settings': {
    'text_selection': {
      'double_click': True,
      'finished_selection': True
    },
    'shortcuts': ''
  }
}
