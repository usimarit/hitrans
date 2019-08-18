# pylint:disable=missing-docstring

from appdirs import user_config_dir
import platform

HOST = 'tcp://0.0.0.0:'
SVR_ADDR = HOST + '1234'
CLT_ADDR = HOST + '1235'
SHORTCUT = 'b'

APPNAME = 'hitrans'
PLAT = "\\" if platform.system() == 'Windows' else '/'
CONFIG_PATH = user_config_dir(APPNAME)
CONFIG_FILE = "{}{}{}".format(CONFIG_PATH, PLAT, 'config.json')
DEFAULT_CONF = {
    'configurations': {
        'trans_url': 'https://translation.googleapis.com/language/translate/',
        'source_lang': 'auto',
        'target_lang': 'en',
        'api_key': '',
        'model': 'nmt',
        'version': 'v2'
    },
    'settings': {
        'text_selection': {
            'double_click': False,
            'finished_selection': True
        },
        'shortcut': {
            'alt': True,
            'shift': False,
            'ctrl': False
        }
    }
}
