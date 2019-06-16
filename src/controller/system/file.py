# pylint: disable=missing-docstring, wrong-import-order, line-too-long
import os
import sys
import json

FILE = '/config.json'

DEFAULT_CONF = os.path.dirname(os.path.realpath(__file__)) + '/../../config/default.json'

LINUX_CONFIG_PATH = '/home/' + os.environ['USER'] + '/.config/hitrans'
WINDOWS_CONFIG_PATH = ''
MACOS_CONFIG_PATH = ''


def get_default_data():
    with open(DEFAULT_CONF) as default_conf:
        data = json.load(default_conf)
    return data

def get_path(plat):
    return LINUX_CONFIG_PATH if plat == 'linux' else WINDOWS_CONFIG_PATH if plat == 'windows' else MACOS_CONFIG_PATH

def check_file(path):
    return os.path.isfile(path)

def check_path(plat):
    return os.path.exists(get_path(plat))

def create_file():
    plat = sys.platform
    path = get_path(plat)
    #if not check_path(plat):
    #    os.makedirs(path)
    if not check_file(path + FILE):
        data = get_default_data()
        path += FILE
        with open(path, 'w') as json_config_file:
            json.dump(data, json_config_file)
            print(path)

def get_config():
    plat = sys.platform
    path = get_path(plat)
    with open(path + FILE, 'r') as json_config_file:
        data = json.load(json_config_file)
    return data

def write_config(data):
    plat = sys.platform
    path = get_path(plat)
    with open(path + FILE, 'w') as json_config_file:
        json.dump(data, json_config_file)
        print(path + FILE)
