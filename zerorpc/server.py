# pylint: disable=missing-docstring, wrong-import-order

import zerorpc
from file import get_default_data, create_file, get_config, write_config
from config import SVR_ADDR


class HitransPythonApi():
    def get_default_conf(self):
        return get_default_data()

    def create_file(self):
        create_file()

    def get_config(self):
        return get_config()

    def write_config(self, data):
        write_config(data)


def server():
    svr = zerorpc.Server(HitransPythonApi())
    svr.bind(SVR_ADDR)
    print("Server running on port 1234")
    svr.run()
