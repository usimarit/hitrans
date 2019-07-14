# pylint: disable=missing-docstring, wrong-import-order, global-statement, invalid-name
import time

from datetime import datetime
from pynput import mouse

from server import Server
from client import Client
from event_provider import EventProvider, EventCode


def on_click(x, y, button, pressed):
    global lasttime
    global provider
    if pressed or button != mouse.Button.left:
        return
    now = datetime.now()
    deltatime = now - lasttime
    if deltatime.microseconds / 1000 >= 300:
        lasttime = now
        return
    lasttime = now
    provider.notify(EventCode.DOUBLE_CLICK, (x, y))


_ONE_DAY_IN_SECONDS = 60 * 60 * 24
lasttime = datetime.min
provider = EventProvider()
listener = mouse.Listener(on_click=on_click)


def main():
    c = Client()
    c.start()
    s = Server()
    s.start()
    listener.start()

    provider.subsribe(EventCode.DOUBLE_CLICK, c)
    try:
        while True:
            time.sleep(100)
    except KeyboardInterrupt:
        s.stop()
        c.stop()
        listener.stop()
        provider.unsubscribe(EventCode.DOUBLE_CLICK, c)


if __name__ == "__main__":
    main()
