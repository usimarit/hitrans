# pylint: disable=missing-docstring, wrong-import-order, line-too-long
import json

from enum import Enum
from os import path
from config.config import (
    DEFAULT_CONF,
    CONFIG_FILE,
)


class FileError(Enum):
    DEFAULT = -1
    FILE_EXIST = 0
    FILE_NOT_FOUND = 1
    FILE_IS_DIR = 2


def validatePath(f):
    if not path.exists(f):
        return FileError.FILE_NOT_FOUND
    if path.isdir(f):
        return FileError.FILE_IS_DIR
    if path.isfile(f):
        return FileError.FILE_EXIST
    return FileError.DEFAULT


def create_config_file():
    if validatePath(CONFIG_FILE) != FileError.FILE_NOT_FOUND:
        return
    write_config(DEFAULT_CONF)


def get_config():
    if validatePath(CONFIG_FILE) != FileError.FILE_EXIST:
        return None
    file_config = json.load(open(CONFIG_FILE, 'r'))
    current_config = {**DEFAULT_CONF, **file_config}
    return current_config


def write_config(data):
    json.dump(data, open(CONFIG_FILE, 'w'))
