# pylint: disable=missing-docstring, wrong-import-order, global-statement, invalid-name
import time
from server import Server
from client import Client
from handler.event_provider import EventCode, provider
from keyboard.shortcut import shortcut_listener
from mouse.double_click import double_click_listener
from mouse.drag_and_drop import drag_and_drop_listener


def main():
    c = Client()
    c.start()

    s = Server()
    s.start()

    double_click_listener.start()
    shortcut_listener.start()
    drag_and_drop_listener.start()

    provider.attach(c)

    try:
        while True:
            time.sleep(100)
    except KeyboardInterrupt:
        s.stop()
        c.stop()
        double_click_listener.stop()
        shortcut_listener.stop()
        drag_and_drop_listener.stop()


if __name__ == "__main__":
    main()
