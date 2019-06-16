# pylint: disable=missing-docstring, wrong-import-order
import zerorpc
import gevent
import signal
from mouse import get_mouse_coordinates_xorg
from text_selection import get_selected_text
from file import get_default_data, create_file, get_config, write_config

class HitransPythonApi():
    def get_mouse_position(self):
        return get_mouse_coordinates_xorg()

    def get_selected_text(self):
        return get_selected_text()

    def get_default_conf(self):
        return get_default_data()

    def create_file(self):
        create_file()

    def get_config(self):
        return get_config()

    def write_config(self, data):
        write_config(data)


PORT = 1234
ADDR = 'tcp://127.0.0.1:' + str(PORT)
S = zerorpc.Server(HitransPythonApi())
S.bind(ADDR)

print("Server running on port 1234")
gevent.signal(signal.SIGTERM, S.stop)
gevent.signal(signal.SIGINT, S.stop)  # ^C

S.run()
